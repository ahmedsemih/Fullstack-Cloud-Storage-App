"use client";

import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DateFilterType,
  OptionContextType,
  useOptionContext,
} from "@/contexts/OptionContext";
import { DATE_FILTER_OPTIONS } from "@/utils/constants";

const DateFilter = () => {
  const { filters, setFilters } = useOptionContext() as OptionContextType;

  const datefilterOptionArray = useMemo(() => {
    return Object.values(DATE_FILTER_OPTIONS).filter(
      (value) => typeof value === "string"
    );
  }, []);

  const handleChangeFilter = (value: string) => {
    setFilters({
      ...filters,
      date: value as DateFilterType,
    });
  };

  return (
    <Select value={filters.date} onValueChange={handleChangeFilter}>
      <SelectTrigger className="capitalize w-full sm:w-48 md:w-24 lg:w-48">
        <SelectValue placeholder="Last Modification" />
      </SelectTrigger>
      <SelectContent>
        {datefilterOptionArray.map((option) => (
          <SelectItem
            key={option}
            value={option.toString()}
            className="capitalize"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DateFilter;
