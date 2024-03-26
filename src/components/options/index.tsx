import TypeFilter from "./TypeFilter";
import DateFilter from "./DateFilter";
import LayoutToggle from "./LayoutToggle";
import DetailToggle from "./DetailToggle";

type Props = {
  title: string;
};

const Options = ({ title }: Props) => {
    return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="capitalize text-xl font-semibold">{title}</h1>
        <DetailToggle />
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
        <div className="flex items-center gap-4 sm:flex-row flex-col w-full sm:w-auto">
          <TypeFilter/>
          <DateFilter />
        </div>
        <LayoutToggle />
      </div>
    </div>
  );
};

export default Options;
