"use client";

import { Info } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { OptionContextType, useOptionContext } from "@/contexts/OptionContext";

const DetailToggle = () => {
  const { showDetails, toggleShowDetails } = useOptionContext() as OptionContextType;

  return (
    <ToggleGroup
      value={showDetails.toString()}
      type="single"
      onValueChange={toggleShowDetails}
    >
      <ToggleGroupItem value="true" variant="outline" title="Show Details">
        <Info />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default DetailToggle;
