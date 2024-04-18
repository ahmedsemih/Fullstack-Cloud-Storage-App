import { format, formatDistance } from "date-fns";

import StarButton from "../dataView/StarButton";
import formatFileSize from "@/utils/formatFileSize";

type Props = {
    file: FileType;
}

const Details = ({ file }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
      <h2 className="font-semibold text-lg my-4">File Details</h2>
      <StarButton path={file.path} />
      </div>
      <div className="flex flex-col gap-4 ">
        <div>
          <h6 className="font-semibold">Name:</h6>
          <p>{file.name}</p>
        </div>
        <div>
          <h6 className="font-semibold">Type:</h6>
          <p>{file.type}</p>
        </div>
        <div>
          <h6 className="font-semibold">Size:</h6>
          <p>{formatFileSize(file.size)}</p>
        </div>
        <div>
          <h6 className="font-semibold">Last Modification:</h6>
          <p>
            {file.lastModification
              ? `${format(
                  file.lastModification,
                  "dd MMM yyyy"
                )} - ${formatDistance(
                  file.lastModification,
                  new Date(),
                  { addSuffix: true }
                )}`
              : "-----"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Details