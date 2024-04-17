"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "../ui/use-toast";
import { deleteFile } from "@/services/fileService";
import { Button, buttonVariants } from "../ui/button";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";

type Props = {
  rowSelection: any;
  setRowSelection: Dispatch<SetStateAction<any>>;
  data: any[];
};

const StorageButtons = ({ rowSelection, setRowSelection, data }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const selectedRows = useMemo(
    () => data.filter((f, index) => rowSelection[index.toString()] === true),
    [rowSelection, data]
  );

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDeleteFiles = async (files: FileType[]) => {
    if (files.length === 0) return;

    let successCount = 0;

    for (const file of files) {
      const { error } = await deleteFile(file.path);

      if (error)
        return toast({
          variant: "destructive",
          title: "Somethings went wrong.",
          description: `An error occurred when deleting "${file.name}".`,
        });

      successCount++;
    }

    setRowSelection({});
    toast({ title: `${successCount} file(s) deleted successfully.` });
    router.refresh();
  };

  return (
    <div className="mb-8 flex sm:flex-row flex-col items-center gap-4">
      <Link
        href="/plans"
        className={buttonVariants({
          className: "capitalize",
        })}
      >
        buy more storage space
      </Link>
      {data.length > 0 && (
        <ConfirmationDialog
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          confirmFunction={() => handleDeleteFiles(data)}
          description="All files will be deleted"
        >
          <Button variant="secondary" className="capitalize">
            delete all
          </Button>
        </ConfirmationDialog>
      )}
      {selectedRows.length > 0 && (
        <ConfirmationDialog
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          confirmFunction={() => handleDeleteFiles(selectedRows)}
          description={`Selected ${selectedRows.length} file(s) will be deleted.`}
        >
          <Button variant="secondary">
            Delete Selected {selectedRows.length} File(s)
          </Button>
        </ConfirmationDialog>
      )}
    </div>
  );
};

export default StorageButtons;
