"use client";

import {
    filterByDate,
    filterByType,
    groupByDate,
} from "@/services/filterService";
import ListItem from "./ListItem";
import FileCard from "../cards/FileCard";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

type Props = {
  data: FileType[];
  error?: unknown;
};

const GroupedView = ({ data, error }: Props) => {
    const { layout, showDetails, filters } = useOptionContext() as OptionContextType;
    const filteredData = filterByType(
        filterByDate(data, filters.date),
        filters.type
    );
    const groupedData: GroupByDateType = groupByDate(filteredData);

  if (error)
    return (
      <p className="text-xl mt-4">
        Whoops! An error occurred. Please try again later.
      </p>
    );

  if (layout === "grid")
    return (
      <div className="flex w-full flex-col gap-8 h-full">
        {Object.keys(groupedData).map((group) => {
          return (
            //@ts-ignore
            groupedData[group].length > 0 && (
              <div key={group}>
                <h4 className="capitalize text-xl mb-2">{group}</h4>
                <div
                  className={`w-full grid grid-cols-1 gap-4 ${
                    showDetails
                      ? "lg:grid-cols-2 xl:grid-cols-3"
                      : "lg:grid-cols-3 xl:grid-cols-4"
                  }`}
                >
                  {
                    //@ts-ignore
                    groupedData[group].map((file, index) => (
                      <FileCard file={file} key={index} />
                    ))
                  }
                </div>
              </div>
            )
          );
        })}
      </div>
    );

  return (
    <div className="flex flex-col gap-8 w-full h-full overflow-x-auto">
      {Object.keys(groupedData).map((group) => {
        return (
          //@ts-ignore
          groupedData[group].length > 0 && (
            <div key={group}>
              <h4 className="capitalize text-xl mb-2">{group}</h4>
              <div className="flex flex-col gap-2">
                {
                  //@ts-ignore
                  groupedData[group].map((file, index) => (
                    <ListItem file={file} key={index} />
                  ))
                }
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default GroupedView;
