"use client";

import { format } from "date-fns";
import { File } from "lucide-react";

import StarButton from "../dataView/StarButton";
import ActionMenu from "../dataView/ActionMenu";
import formatFileSize from "@/utils/formatFileSize";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

type Props = {
  file: FileType;
};

const ListItem = ({ file }: Props) => {
  const { selectedFile, setSelectedFile } = useOptionContext() as OptionContextType;

  return (
    <div
      onClick={() => setSelectedFile(file)}
      className={`flex gap-2 items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-secondary transition-all duration-200 ${
        selectedFile?.path === file.path && "bg-secondary border-foreground"
      }`}
    >
      <File />
      <p className="truncate w-1/3">{file.name}</p>
      <p className="truncate w-1/4">{file.type}</p>
      <p className="truncate w-1/6">{formatFileSize(file.size)}</p>
      <p className="truncate w-1/8">
        {file.lastModification
          ? format(file.lastModification, "dd MMM yyyy")
          : "-----"}
      </p>
      <div className="w-1/8">
        <StarButton path={file.path} />
        <ActionMenu direction="horizontal" row={file} />
      </div>
    </div>
  );
};

export default ListItem;
