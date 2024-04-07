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
  OptionContextType,
  TypeFilterType,
  useOptionContext,
} from "@/contexts/OptionContext";
import { TYPE_FILTER_OPTIONS } from "@/utils/constants";

const TypeFilter = () => {
  const { filters, setFilters } = useOptionContext() as OptionContextType;

  const typeFilterOptions = useMemo(() => {
    return Object.values(TYPE_FILTER_OPTIONS).filter(
      (value) => typeof value === "string"
    );
  }, []);

  const handleChangeFilter = (value: string) => {
    setFilters({
      ...filters,
      type: value as TypeFilterType,
    });
  };

  return (
    <Select value={filters.type} onValueChange={handleChangeFilter}>
      <SelectTrigger className="capitalize lg:w-48 md:w-24 w-full sm:w-32">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        {typeFilterOptions.map((option) => (
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

export default TypeFilter;
