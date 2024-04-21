"use client";

import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading)
    return (
      <div className="w-full h-[80%] flex items-center justify-center">
        <LoaderCircle className="animate-spin" size={64} />
      </div>
    );

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
