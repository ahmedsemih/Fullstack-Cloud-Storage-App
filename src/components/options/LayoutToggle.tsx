"use client";

import { AlignJustify, LayoutGrid } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

const LayoutToggle = () => {
  const { layout, changeLayout } = useOptionContext() as OptionContextType;

  return (
    <ToggleGroup
      value={layout}
      onValueChange={changeLayout}
      type="single"
      className="rounded-full border"
    >
      <ToggleGroupItem value="list" className="rounded-l-full px-4">
        <AlignJustify />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" className="rounded-r-full px-4">
        <LayoutGrid />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default LayoutToggle;
