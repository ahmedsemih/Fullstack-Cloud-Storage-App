"use client";

import { SearchX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import TypeFilter from "./TypeFilter";
import DateFilter from "./DateFilter";
import { Button } from "../ui/button";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilters } = useOptionContext() as OptionContextType;

  const handleClearFilters = () => {
    setFilters({ type: "", date: "" });

    if (searchParams.has("q")) router.push("/");
  };

  return (
    <div className="flex items-center gap-4 sm:flex-row flex-col w-full sm:w-auto">
      <TypeFilter />
      <DateFilter />
      {(filters.date || filters.type || searchParams.has("q")) && (
        <Button
          className="ml-auto"
          onClick={handleClearFilters}
          variant="outline"
        >
          <span className="lg:block sm:hidden block">Clear Filters</span>
          <SearchX className="lg:hidden sm:block hidden" />
        </Button>
      )}
    </div>
  );
};

export default Filters;
