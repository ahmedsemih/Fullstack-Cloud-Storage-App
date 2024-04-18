import { FileSearch } from "lucide-react";

const EmptyMessage = () => {
  return (
    <div className="flex items-center flex-col justify-center mt-16 gap-4">
      <FileSearch size={124} strokeWidth={1} />
      <p className="text-xl text-foreground">Select a file to see details</p>
    </div>
  );
};

export default EmptyMessage;
