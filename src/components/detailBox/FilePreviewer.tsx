import Image from "next/image";
import { Archive, FileText } from "lucide-react";

type Props = {
  url: string;
  name: string;
  type: string;
};

const FilePreviewer = ({ url, name, type }: Props) => {
  const isCompressed =
    type.includes("zip") ||
    type.includes("tar") ||
    type.includes("rar") ||
    type.includes("arc") ||
    type.includes("compress");

  if (type.includes("image"))
    return (
      <div className="w-full max-h-48 h-48 min-h-48 rounded-lg bg-foreground object-center object-contain flex items-center">
        <Image
          src={url}
          alt={name}
          width={500}
          height={275}
          className="m-auto w-full my-auto"
        />
      </div>
    );

  return (
    <div className="w-full max-h-48 h-48 min-h-48 rounded-lg bg-foreground flex flex-col items-center justify-center text-background">
      {isCompressed ? <Archive size={64} /> : <FileText size={64} />}
      <p
        className={`text-xl font-semibold ${
          name.includes(".") ? "visible" : "invisible"
        }`}
      >
        {name.split(".")[1] || "file"}
      </p>
    </div>
  );
};
export default FilePreviewer;
