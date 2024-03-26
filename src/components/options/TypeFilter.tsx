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
      type: TYPE_FILTER_OPTIONS[Number(value)] as TypeFilterType,
    });
  };

  return (
    <Select onValueChange={handleChangeFilter}>
      <SelectTrigger className="capitalize lg:w-48 md:w-32 w-full sm:w-48">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        {typeFilterOptions.map((option, index) => (
          <SelectItem
            key={option}
            value={index.toString()}
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
