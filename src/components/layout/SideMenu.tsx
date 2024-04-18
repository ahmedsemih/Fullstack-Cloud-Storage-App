import React from "react";
import Link from "next/link";
import { Cloud } from "lucide-react";
import { twMerge } from "tailwind-merge";

import { buttonVariants } from "../ui/button";
import { NAV_LINKS } from "@/utils/constants";

const SideMenu = () => {
  return (
    <aside className="bg-card h-screen sticky top-0 left-0 px-2 sm:px-4 py-4 w-full overflow-hidden border-r border-foreground-muted hidden md:block">
      <Link
        href="/"
        className="flex items-center text-2xl gap-2 font-semibold px-2"
      >
        <Cloud size={40} />
        Cloud Locker
      </Link>
      <nav className="flex flex-col gap-6 mt-10 text-xl">
        {NAV_LINKS.map((nav) => (
          <Link
            className={twMerge(
              buttonVariants({ variant: "ghost" }),
              "capitalize flex justify-start items-center gap-4 text-lg w-full"
            )}
            href={nav.link}
            key={nav.name}
          >
            <nav.icon />
            {nav.name}
          </Link>
        ))}
        <Link
          href="/plans"
          className={buttonVariants({
            className:
              "capitalize flex justify-start items-center gap-4 text-lg w-full rounded-3xl",
          })}
        >
          Buy More Storage Space
        </Link>
      </nav>
    </aside>
  );
};

export default SideMenu;
