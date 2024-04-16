"use client";

import {
  ArrowDownToLine,
  CircleArrowDown,
  MoreHorizontal,
  MoreVertical,
  Trash2,
} from "lucide-react";
import JSZIP from "jszip";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import DeleteDialog from "../dialogs/DeleteDialog";
import { fetchFilesWithSubfolders } from "@/services/fileService";

type Props = {
  row: FileType;
  direction: "vertical" | "horizontal";
};

const ActionMenu = ({ row, direction }: Props) => {
  const { toast } = useToast();

  const [isDownloading, setIsDownloading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    if (row.type === "folder") return downloadFolder();

    if (!row.downloadUrl) return setIsDownloading(false);

    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";

    xhr.onload = () => {
      const blob = xhr.response;
      createAndClickDownloadLink(blob);
    };

    xhr.open("GET", row.downloadUrl);
    xhr.send();
  };

  const downloadFolder = async () => {
    const zip = new JSZIP();
    const { data, error } = await fetchFilesWithSubfolders(row.path);

    if (error)
      return toast({
        title: "Failed to download files.",
        description: "Whoops! An error occurred when downloading files.",
        variant: "destructive",
      });

    data.forEach(async (file, index) => {
      if (!file.downloadUrl) return;

      const fileBlob: any = await downloadFile(file.downloadUrl);
      zip.file(file.name, fileBlob);

      if (index === data.length - 1) {
        if (!JSZIP.support.blob) return;

        const zipBlob = await zip.generateAsync({ type: "blob" });
        createAndClickDownloadLink(zipBlob);
      }
    });
  };

  const downloadFile = (downloadUrl: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";

      xhr.onload = () => {
        if (xhr.status === 200) {
          const fileBlob = xhr.response;
          resolve(fileBlob);
        } else {
          reject(new Error(`HTTP status ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error"));
      };

      xhr.open("GET", downloadUrl);
      xhr.send();
    });
  };

  const createAndClickDownloadLink = (blob: Blob) => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = row.name;
    link.click();
    window.URL.revokeObjectURL(link.href);

    setIsDownloading(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className={`${
            isDownloading ? "pointer-events-none " : "pointer-events-auto"
          }`}
        >
          {isDownloading ? (
            <Button variant="ghost" className="w-8 h-8 p-0 pointer-events-none">
              <CircleArrowDown className="h-5 w-5 animate-bounce" />
            </Button>
          ) : (
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              {direction === "vertical" ? (
                <MoreVertical className="h-4 w-4" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <ArrowDownToLine strokeWidth={1} size={20} /> <span>Download</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={handleDelete}
          >
            <Trash2 strokeWidth={1} size={20} /> <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        file={row}
      />
    </>
  );
};

export default ActionMenu;
