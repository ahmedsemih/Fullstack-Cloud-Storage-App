import Filters from "./Filters";
import NewButton from "./NewButton";
import Breadcrumbs from "./Breadcrumbs";
import LayoutToggle from "./LayoutToggle";
import DetailToggle from "./DetailToggle";

type Props = {
  hideUploadButton?: boolean;
}

const Options = ({ hideUploadButton }: Props) => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <Breadcrumbs />
        <div className="flex items-center gap-4">
          {
            !hideUploadButton && <NewButton />
          }
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
