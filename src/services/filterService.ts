import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subYears,
} from "date-fns";
import { DateFilterType, TypeFilterType } from "@/contexts/OptionContext";

export const filterBySearch = (data: FileType[], search?: string) => {
  if (!search) return data;

  return data.filter((file) =>
    file.name.toLowerCase().trim().includes(search.toLowerCase().trim())
  );
};

export const filterByType = (data: FileType[], type: TypeFilterType) => {
  if (!type) return data;

  return data.filter((file) => file.type.includes(type));
};

export const filterByDate = (data: FileType[], date: DateFilterType) => {
  if (!date) return data;

  return data.filter((file) => {
    if(file.type === 'folder') return file;

    if(file.lastModification) {
      const { start, end } = getBoundariesOfDate(date);
      const parsedDate = parseISO(file.lastModification);
  
      return parsedDate >= start && parsedDate <= end;
    }
  });
};

const getBoundariesOfDate = (filter: DateFilterType) => {
  if (filter === "today")
    return {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
    };

  if (filter === "this week")
    return {
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    };

  if (filter === "this month")
    return {
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
    };

  if (filter === "this year")
    return {
      start: startOfYear(new Date()),
      end: endOfYear(new Date()),
    };

  return {
    start: startOfYear(subYears(new Date(), 1)),
    end: endOfYear(subYears(new Date(), 1)),
  };
};
