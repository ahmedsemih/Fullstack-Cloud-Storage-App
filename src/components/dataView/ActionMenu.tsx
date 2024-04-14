"use client";

import {
  ArrowDownToLine,
  MoreHorizontal,
  MoreVertical,
  Trash2,
} from "lucide-react";
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
import DeleteDialog from "../dialogs/DeleteDialog";

type Props = {
  row: FileType;
  direction: "vertical" | "horizontal";
};

const ActionMenu = ({ row, direction }: Props) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleDownload = () => {
    if (!row.downloadUrl) return;

    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";

    xhr.onload = () => {
      const blob = xhr.response;

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = row.name;
      link.click();
      window.URL.revokeObjectURL(link.href);
    };

    xhr.open("GET", row.downloadUrl);
    xhr.send();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            {direction === "vertical" ? (
              <MoreVertical className="h-4 w-4" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
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
