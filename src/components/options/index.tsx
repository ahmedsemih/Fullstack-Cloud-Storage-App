import Filters from "./Filters";
import Breadcrumbs from "./Breadcrumbs";
import LayoutToggle from "./LayoutToggle";
import DetailToggle from "./DetailToggle";

const Options = () => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <Breadcrumbs />
        <div className="flex items-center gap-4">
          <DetailToggle />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-row flex-col">
        <Filters/>
        <LayoutToggle />
      </div>
    </div>
  );
};

export default Options;
