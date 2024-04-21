"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import { useToast } from "../ui/use-toast";
import { deleteFile } from "@/services/fileService";
import { Button, buttonVariants } from "../ui/button";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";
import { fetchUserPlanAndLimit } from "@/services/userService";

type Props = {
  rowSelection: any;
  setRowSelection: Dispatch<SetStateAction<any>>;
  data: any[];
};

const StorageButtons = ({ rowSelection, setRowSelection, data }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { userId } = useAuth();

  const selectedRows = useMemo(
    () => data.filter((f, index) => rowSelection[index.toString()] === true),
    [rowSelection, data]
  );

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<PlanType | null>(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      const { data } = await fetchUserPlanAndLimit(userId!);

      //@ts-expect-error
      if (data) setCurrentPlan(data);
    };

    userId && fetchUserPlan();
  }, [userId]);

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
      {currentPlan?.plan === "free" ? (
        <Link
          href="/plans"
          className={buttonVariants({
            variant: "default",
            className: "capitalize",
          })}
        >
          buy more storage space
        </Link>
      ) : (
        <Link
          href={{
            pathname: "/api/create-customer-portal",
            query: { customer: currentPlan?.customer },
          }}
          className={buttonVariants({
            variant: "default",
            className: "capitalize",
          })}
        >
          manage your subscription
        </Link>
      )}

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
