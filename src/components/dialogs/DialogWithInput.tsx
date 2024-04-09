"use client";

import { useState } from "react";

import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  actionText: string;
  title: string;
  action: (folderName: string) => void;
};

const DialogWithInput = ({
  open,
  setOpen,
  title,
  actionText,
  action,
}: Props) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = () => {
    action(value.trimStart().trimEnd());
    setValue("");
  };

  const handleCancel = () => {
    setValue('');
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent onSubmit={handleSubmit}>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription className="py-4">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Give a name to your folder..."
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={!value.trimStart()}
              onClick={handleSubmit}
            >
              {actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogWithInput;
