"use client";

import { useMemo } from "react";

import GridView from "./GridView";
import { TableView } from "./TableView";
import { filterByDate, filterByType } from "@/services/filterService";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

type Props = {
  data: FileType[];
  error: unknown;
};

const DataView = ({ data, error }: Props) => {
  const { layout, filters } = useOptionContext() as OptionContextType;
  const filteredData = useMemo(() => {
    return filterByDate(filterByType(data, filters.type), filters.date);
  }, [filters.date, filters.type, data]);

  if (error)
    return (
      <p className="text-xl mt-4">
        Whoops! An error occurred. Please try again later.
      </p>
    );

  if (layout === "grid") return <GridView data={filteredData} />;

  return <TableView data={filteredData} />;
};

export default DataView;
