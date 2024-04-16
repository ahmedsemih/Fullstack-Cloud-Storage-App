"use client";

import { useMemo } from "react";

import FileCard from "../cards/FileCard";
import FolderCard from "../cards/FolderCard";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

type Props = {
  data: FileType[];
};

const GridView = ({ data }: Props) => {
  const { showDetails } = useOptionContext() as OptionContextType;
  const files = useMemo(() => data.filter((d) => d.type !== "folder"), [data]);
  const folders = useMemo(
    () => data.filter((d) => d.type === "folder"),
    [data]
  );

  if (data.length === 0) return <p className="text-xl mt-4">This place is empty.</p>;

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`w-full grid grid-cols-1 gap-4 ${
          showDetails
            ? "lg:grid-cols-2 xl:grid-cols-3"
            : "lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {folders.map((folder, index) => (
          <FolderCard key={index} folder={folder} />
        ))}
      </div>
      <div
        className={`w-full grid grid-cols-1 gap-4 ${
          showDetails
            ? "lg:grid-cols-2 xl:grid-cols-3"
            : "lg:grid-cols-3 xl:grid-cols-4"
        }`}
      >
        {files.map((file, index) => (
          <FileCard key={index} file={file} />
        ))}
      </div>
    </div>
  );
};

export default GridView;
