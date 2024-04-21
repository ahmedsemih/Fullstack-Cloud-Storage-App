"use client";

import { useRouter } from "next/navigation";
import { TaskState, UploadTask } from "firebase/storage";
import { CirclePause, CirclePlay, CircleX } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "../ui/progress";
import { Button } from "@/components/ui/button";

type DialogProps = {
  uploadTasks: UploadTask[];
  setUploadTasks: Dispatch<SetStateAction<UploadTask[]>>;
  fileNames: string[];
};

type ItemProps = {
  uploadTask: UploadTask;
  uploadStatus: TaskState;
  fileName: string;
};

const UploadDialog = ({
  uploadTasks,
  fileNames,
  setUploadTasks,
}: DialogProps) => {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState<TaskState[]>(() =>
    uploadTasks.map(() => "running")
  );

  useEffect(() => {
    for (let i = 0; i < uploadTasks.length; i++) {
      uploadTasks[i]!.on(
        "state_changed",
        (snapshot) => {
          let statusArray = uploadStatus;
          statusArray[i] = snapshot.state;
          setUploadStatus(statusArray);
        },
        (error) => {
          let statusArray = uploadStatus;
          statusArray[i] = "error";
          setUploadStatus(statusArray);
        },
        () => {
          let statusArray = uploadStatus;
          statusArray[i] = "success";
          setUploadStatus(statusArray);
          router.refresh();

          setTimeout(() => {
            setUploadTasks((prev: UploadTask[]) =>
              prev.filter((task) => task !== uploadTasks[i])
            );
          }, 1000);
        }
      );
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Click to see upload status">
          Uploading...
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Tasks</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="flex flex-col gap-4 py-4">
          {uploadTasks.map((uploadTask, index) => (
            <UploadItem
              key={index}
              uploadTask={uploadTask}
              uploadStatus={uploadStatus[index]}
              fileName={fileNames[index]}
            />
          ))}
        </div>
        <DialogFooter className="flex justify-end w-full">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Go Back
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const UploadItem = ({ uploadTask, fileName, uploadStatus }: ItemProps) => {
  return (
    <div className="p-2 border rounded-lg flex flex-col gap-4">
      <div className="flex gap-2 items-center justify-between">
        <div>
          <p>{fileName}</p>
          <p>
            {uploadTask.snapshot.bytesTransferred} /{" "}
            {uploadTask.snapshot.totalBytes}
          </p>
        </div>
        {uploadStatus === "running" ? (
          <div className="flex items-center gap-4">
            <Button onClick={() => uploadTask.pause()}>
              <CirclePause />
              <span className="sr-only">Pause</span>
            </Button>
            <Button onClick={() => uploadTask.cancel()}>
              <CircleX />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
        ) : uploadStatus === "paused" ? (
          <Button onClick={() => uploadTask.resume()}>
            <CirclePlay />
            <span className="sr-only">Resume</span>
          </Button>
        ) : uploadStatus === "canceled" ? (
          <p>Canceled</p>
        ) : uploadStatus === "error" ? (
          <p className="text-destructive-foreground">Error!</p>
        ) : (
          <p className="text-green-500">Completed!</p>
        )}
      </div>
      <Progress
        className="w-full"
        value={
          (uploadTask.snapshot.bytesTransferred /
            uploadTask.snapshot.totalBytes) *
          100
        }
      />
    </div>
  );
};

export default UploadDialog;
