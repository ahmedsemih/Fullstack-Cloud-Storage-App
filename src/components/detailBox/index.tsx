"use client";

import Link from "next/link";

import Details from "./Details";
import EmptyMessage from "./EmptyMessage";
import ActionButtons from "./ActionButtons";
import FilePreviewer from "./FilePreviewer";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

const DetailBox = () => {
  const { showDetails, selectedFile } = useOptionContext() as OptionContextType;

  return (
    <div
      className={`border bg-background w-80 xl:w-96 z-50 rounded-lg p-4 max-h-[700px] min-h-[638px] transition-all duration-500 right-0 shadow-md fill-mode-forwards ${
        showDetails
          ? "lg:sticky lg:top-8 sm:top-40 top-72 absolute animate-[openDetails]"
          : "absolute animate-[closeDetails] h-0"
      } `}
    >
      {selectedFile ? (
        <div className="h-full flex flex-col justify-between gap-4">
          <div className="mb-8 relative">
            <Link href={selectedFile.downloadUrl!} target="_blank" className="cursor-pointer">
              <FilePreviewer
                url={selectedFile.downloadUrl!}
                type={selectedFile.type}
                name={selectedFile.name}
              />
            </Link>
            <Details file={selectedFile} />
          </div>
          <ActionButtons file={selectedFile} />
        </div>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
};

export default DetailBox;
