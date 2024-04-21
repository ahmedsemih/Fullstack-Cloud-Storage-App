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
      <div className="w-full h-60 sm:h-80 lg:h-48 rounded-lg max-h-80">
        <Image
          src={url}
          alt={name}
          width={500}
          height={300}
          className="w-full h-full object-cover content-center rounded-lg"
        />
      </div>
    );

  return (
    <div className="w-full h-60 sm:h-80 lg:h-48 rounded-lg bg-foreground flex flex-col items-center justify-center text-background">
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
