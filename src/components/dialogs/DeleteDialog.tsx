"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "../ui/use-toast";
import { deleteFile, deleteFolder } from "@/services/fileService";

type Props = {
  children?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  file: FileType;
};

const DeleteDialog = ({ children, open, setOpen, file }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!file) return;

    let err: unknown, result: { message: string } | null;

    setIsLoading(true);

    if (file.type === "folder") {
      const { data, error } = await deleteFolder(file.path);
      err = error;
      result = data;
    } else {
      const { data, error } = await deleteFile(file.path);
      err = error;
      result = data;
    }

    router.refresh();

    if (!err) toast({ title: result?.message });
    else
      toast({
        title: "Somethings went wrong!",
        description: "Whoops! This file could not be deleted.",
        variant: "destructive",
      });

    setIsLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && (
        <AlertDialogTrigger className="w-full">{children}</AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            &quot;{file?.name}&quot; file.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
