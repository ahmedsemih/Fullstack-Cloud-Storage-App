"use client";

import { Folder } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import ActionMenu from "../dataView/ActionMenu";

type Props = {
  folder: FileType;
};

const FolderCard = ({ folder }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(pathname + "/" + folder.name);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-lg p-4 border flex flex-col gap-4 hover:bg-secondary transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4 truncate">
          <Folder fill="white" />
          <p className="truncate">{folder.name}</p>
        </div>
        <ActionMenu row={folder} direction="vertical" />
      </div>
    </div>
  );
};

export default FolderCard;
