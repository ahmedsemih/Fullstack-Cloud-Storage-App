"use client";

import {
  UploadTask,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { Plus } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { ChangeEvent, useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import UploadDialog from "./UploadDialog";
import { useToast } from "../ui/use-toast";
import { rootStorage } from "@/lib/firebase";
import formatFileSize from "@/utils/formatFileSize";
import DialogWithInput from "../dialogs/DialogWithInput";
import calculateTotalSize from "@/utils/calculateTotalSize";
import calculateUserLeftSize from "@/utils/calculateUserLeftSize";

const NewButton = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fileNames, setFileNames] = useState<string[]>([]);
  const [uploadTasks, setUploadTasks] = useState<UploadTask[]>([]);
  const [isNamingDialogOpen, setIsNamingDialogOpen] = useState<boolean>(false);

  const handleCreateFolder = async (folderName: string) => {
    const newDir = ref(rootStorage, `${userId}/${folderName}`);
    const ghostFile = ref(newDir, ".ghostfile");
    await uploadString(ghostFile, "");
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !userId) return;

    try {
      const userRoot = ref(rootStorage, userId?.toString());

      const files = event.target.files;
      const totalSize = calculateTotalSize(files);
      const userLeftSize = await calculateUserLeftSize(userId);

      if (userLeftSize < totalSize)
        return toast({
          variant: "destructive",
          title: "Not enough space on your storage!",
          description: `You must increase your storage limit or upload files less than ${formatFileSize(
            userLeftSize
          )}`,
        });

      for (let i = 0; i < files.length; i++) {
        setFileNames((prev) => [...prev, files[i].name]);

        if (files[i].webkitRelativePath === "") {
          const fileRef = ref(userRoot, files[i].name);
          const uploadTask = uploadBytesResumable(fileRef, files[i]);
          return setUploadTasks(prev => [...prev,uploadTask]);
        }

        const fileRef = ref(userRoot, files[i].webkitRelativePath);

        const uploadTask = uploadBytesResumable(fileRef, files[i]);
        setUploadTasks(prev => [...prev,uploadTask]);
      }

      return toast({
        title:
          files.length === 1
            ? "File is uploading..."
            : `${files.length} files are uploading...`,
      });
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Somethings went wrong!",
        description: "Whoops! An error occurred. Please try again later.",
      });
    }
  };

  const handleClickUploadFolder = () => {
    if (fileInputRef.current === null) return;

    fileInputRef.current.setAttribute("directory", "");
    fileInputRef.current.setAttribute("webkitdirectory", "");
    fileInputRef.current?.click();
  };

  const handleClickUploadFile = () => {
    if (fileInputRef.current === null) return;

    fileInputRef.current.removeAttribute("directory");
    fileInputRef.current.removeAttribute("webkitdirectory");
    fileInputRef.current?.click();
  };

  if(uploadTasks.length > 0)
  return <UploadDialog uploadTasks={uploadTasks} setUploadTasks={setUploadTasks} fileNames={fileNames} />

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Plus size={20} />
            <span className="sm:block hidden">Add New</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsNamingDialogOpen(true)}
          >
            Create Folder
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleClickUploadFolder}
          >
            Upload Folder
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleClickUploadFile}
          >
            Upload File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogWithInput
        actionText="Create"
        title="New Folder"
        action={handleCreateFolder}
        setOpen={setIsNamingDialogOpen}
        open={isNamingDialogOpen}
      />

      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={handleUpload}
        multiple
      />
    </>
  );
};

export default NewButton;
