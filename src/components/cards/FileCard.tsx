"use client";

import { File } from "lucide-react";
import { format, formatDistance } from "date-fns";

import ActionMenu from "../dataView/ActionMenu";
import StarButton from "../dataView/StarButton";
import FilePreviewer from "../detailBox/FilePreviewer";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

type Props = {
  file: FileType;
};

const FileCard = ({ file }: Props) => {
  const { selectedFile, setSelectedFile } = useOptionContext() as OptionContextType;

  const handleClick = () => {
    setSelectedFile(file);
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-lg p-4 border flex flex-col gap-4 hover:bg-secondary transition-all duration-200 cursor-pointer ${
        selectedFile?.path === file.path &&
        "border-secondary-foreground bg-secondary"
      }`}
    >
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4 truncate">
          <File />
          <p className="truncate">{file.name}</p>
        </div>
        <ActionMenu row={file} direction="vertical" />
      </div>
      <FilePreviewer
        url={file.downloadUrl!}
        type={file.type}
        name={file.name}
      />
      <div className="truncate flex items-center">
        <StarButton path={file.path} />
        <p className="truncate">
          {file.lastModification
            ? `${format(
                file.lastModification,
                "dd MMM yyyy"
              )} - ${formatDistance(file.lastModification, new Date(), {
                addSuffix: true,
              })}`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default FileCard;
