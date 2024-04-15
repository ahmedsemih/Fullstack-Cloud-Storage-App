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
    if (file.type === "folder") return file;

    if (file.lastModification) {
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
      start: startOfWeek(new Date(), { weekStartsOn: 1 }),
      end: endOfWeek(new Date(), { weekStartsOn: 1 }),
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

export const groupByDate = (data: FileType[]) => {
  const { start: todayStart, end: todayEnd } = getBoundariesOfDate("today");
  const { start: weekStart, end: weekEnd } = getBoundariesOfDate("this week");
  const { start: monthStart, end: monthEnd } =
    getBoundariesOfDate("this month");
  const { start: yearStart, end: yearEnd } = getBoundariesOfDate("this year");

  const groups: GroupByDateType = {
    today: [],
    "this week": [],
    "this month": [],
    "this year": [],
    older: [],
    never: [],
  };

  data.forEach((file) => {
    if (!file.lastModification) return groups["never"].push(file);

    const parsedDate = parseISO(file.lastModification);

    if (parsedDate >= todayStart && parsedDate <= todayEnd) {
      groups["today"].push(file);
    } else if (parsedDate >= weekStart && parsedDate <= weekEnd) {
      groups["this week"].push(file);
    } else if (parsedDate >= monthStart && parsedDate <= monthEnd) {
      groups["this month"].push(file);
    } else if (parsedDate >= yearStart && parsedDate <= yearEnd) {
      groups["this year"].push(file);
    } else {
      groups["older"].push(file);
    }
  });

  return groups;
};
