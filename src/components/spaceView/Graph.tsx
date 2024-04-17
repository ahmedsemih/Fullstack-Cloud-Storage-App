import { Progress } from "../ui/progress";
import formatFileSize from "@/utils/formatFileSize";

type Props = {
  userLimit: number;
  remainingSpace: number;
};

const Graph = ({ remainingSpace, userLimit }: Props) => {
  return (
    <div className="py-4">
      <p className="py-3">
        <span className="text-3xl mr-1">
          {formatFileSize(userLimit - remainingSpace)}
        </span>
        /
        <span className="text-muted-foreground ml-1">
          {formatFileSize(userLimit)} using
        </span>{" "}
      </p>
      <Progress value={((userLimit - remainingSpace) / userLimit) * 100} />
    </div>
  );
};

export default Graph;
