"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    const router = useRouter();
    const [search, setSearch] = React.useState<string>("");

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      router.push(`?q=${search}`);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[30%] min-w-[200px] md:min-w-[360px] lg:min-w-[500px] relative"
      >
        {StartIcon && (
          <Button
            variant="ghost"
            type="submit"
            className="absolute left-1 top-1/2 transform -translate-y-1/2"
          >
            <StartIcon size={18} className="text-muted-foreground" />
          </Button>
        )}
        <input
          type={type}
          onChange={handleInputChange}
          placeholder="Search a file or folder"
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-8" : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          name="search"
          {...props}
        />
        {EndIcon && (
          <Button
            variant="ghost"
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            <EndIcon className="text-muted-foreground" size={18} />
          </Button>
        )}
      </form>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
