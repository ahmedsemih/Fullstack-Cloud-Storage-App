"use client";

import { useState } from "react";
import { ArrowDownToLine, LoaderCircle, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import DeleteDialog from "../dialogs/DeleteDialog";

type Props = {
  file: FileType;
};

const ActionButtons = ({ file }: Props) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!file.downloadUrl)
      return toast({
        title: "Unable to download this file",
        variant: "destructive",
      });

    setIsDownloading(true);

    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";

    xhr.onload = () => {
      const blob = xhr.response;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = file.name;
      link.click();
      window.URL.revokeObjectURL(link.href);

      setIsDownloading(false);
    };

    xhr.open("GET", file.downloadUrl);
    xhr.send();
  };

  return (
    <div className="flex justify-between gap-4">
      <Button
        onClick={handleDownload}
        variant="outline"
        className="w-full flex items-center gap-2"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <LoaderCircle className="animate-spin" size={20} />
        ) : (
          <>
            <ArrowDownToLine strokeWidth={2} size={20} /> <span>Download</span>
          </>
        )}
      </Button>
      <DeleteDialog file={file}>
        <Button
          disabled={isDownloading}
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <Trash2 strokeWidth={2} size={20} /> <span>Delete</span>
        </Button>
      </DeleteDialog>
    </div>
  );
};

export default ActionButtons;
