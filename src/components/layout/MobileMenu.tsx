import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { LogOut, Menu } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import AuthButton from "./AuthButton";
import { NAV_LINKS } from "@/utils/constants";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button, buttonVariants } from "../ui/button";

const MobileMenu = () => {
  return (
    <Menubar className="md:hidden flex items-center">
      <MenubarMenu>
        <MenubarTrigger>
          <Menu />
        </MenubarTrigger>
        <MenubarContent className="mr-6">
          <MenubarItem>
            <AuthButton showName />
            <ThemeToggle />
          </MenubarItem>
          <MenubarSeparator />
          {NAV_LINKS.map((nav) => (
            <MenubarItem key={nav.name}>
              <Link
                className={twMerge(
                  buttonVariants({ variant: "ghost" }),
                  "capitalize flex justify-start items-center gap-4 text-lg w-full"
                )}
                href={nav.link}
              >
                <nav.icon />
                {nav.name}
              </Link>
            </MenubarItem>
          ))}
          <MenubarSeparator />
          <MenubarItem>
            <SignOutButton>
              <Button
                variant="ghost"
                className="capitalize flex justify-start items-center gap-4 text-lg w-full"
              >
                <LogOut />
                Sign Out
              </Button>
            </SignOutButton>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MobileMenu;
