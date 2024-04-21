"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";

import { DATE_FILTER_OPTIONS, TYPE_FILTER_OPTIONS } from "@/utils/constants";

export type OptionContextType = {
  layout: LayoutType;
  changeLayout: (value: LayoutType) => void;
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
  showDetails: boolean;
  toggleShowDetails: () => void;
  selectedFile: FileType | null;
  setSelectedFile: (file: FileType) => void;
};

type LayoutType = "list" | "grid";

export type DateFilterType = keyof typeof DATE_FILTER_OPTIONS | "";
export type TypeFilterType = keyof typeof TYPE_FILTER_OPTIONS | "";

type FiltersType = {
  date: DateFilterType;
  type: TypeFilterType;
};

const OptionContext = createContext<OptionContextType | null>(null);

export const OptionProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const [layout, setLayout] = useState<LayoutType>("list");
  const [filters, setFilters] = useState<FiltersType>({
    date: "",
    type: "",
  });
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  useEffect(() => {
    const layoutCookie = getCookie("layout") as LayoutType;
    const showDetailsCookie = getCookie("showDetails") != "false";

    layoutCookie && setLayout(layoutCookie);
    setShowDetails(showDetailsCookie);
  }, []);

  useEffect(() => {
    setSelectedFile(null);
    setFilters({ date: "", type: "" });
  }, [pathname])

  const changeLayout = (value: LayoutType) => {
    const layoutSelection = value ? value : layout;
    setLayout(layoutSelection);
    setCookie("layout", layoutSelection);
  };

  const toggleShowDetails = () => {
    setShowDetails((prev) => {
      setCookie("showDetails", !prev);
      return !prev;
    });
  };

  const values = {
    layout,
    changeLayout,
    filters,
    setFilters,
    showDetails,
    toggleShowDetails,
    selectedFile,
    setSelectedFile,
  };

  return (
    <OptionContext.Provider value={values}>{children}</OptionContext.Provider>
  );
};

export const useOptionContext = () => useContext(OptionContext);
