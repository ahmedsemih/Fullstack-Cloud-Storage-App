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
    <div className="flex justify-between items-center gap-4 border rounded-lg hover:bg-secondary transition-all duration-200 cursor-pointer">
      <div onClick={handleClick} className="rounded-lg p-4 w-full">
        <div className="flex items-center gap-4 rounded-lg truncate w-full">
          <Folder fill="white" />
          <p className="truncate">{folder.name}</p>
        </div>
      </div>
      <div className="p-4 rounded-lg">
        <ActionMenu row={folder} direction="vertical" />
      </div>
    </div>
  );
};

export default FolderCard;
