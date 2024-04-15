import { Cloud, LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Cloud size={164} strokeWidth={1} />
        <div className="flex gap-2 items-center text-xl">
          Loading
          <LoaderCircle className="animate-spin" size={24} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
