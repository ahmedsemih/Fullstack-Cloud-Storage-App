import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <LoaderCircle className="animate-spin" size={64} />
    </div>
  );
};

export default Loading;
