"use client";

import { useMemo } from "react";

import Graph from "./Graph";
import StorageTable from "./StorageTable";
import { filterByDate, filterByType } from "@/services/filterService";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

type Props = {
  data: FileType[];
  userPlan: PlanType;
  remainingSpace: number;
  error: unknown;
};

const SpaceView = ({ data, userPlan, remainingSpace, error }: Props) => {
  const { filters } = useOptionContext() as OptionContextType;

  const filteredData = useMemo(() => {
    return filterByDate(filterByType(data, filters.type), filters.date);
  }, [filters.date, filters.type, data]);

  if (error)
    return (
      <p className="text-xl mt-4">
        Whoops! An error occurred. Please try again later.
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      <Graph remainingSpace={remainingSpace} userLimit={userPlan.limit} />
      <StorageTable data={filteredData} />
    </div>
  );
};

export default SpaceView;
