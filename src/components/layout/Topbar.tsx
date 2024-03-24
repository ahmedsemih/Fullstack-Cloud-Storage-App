"use client";

import React from "react";
import Link from "next/link";
import { Cloud, Search } from "lucide-react";

import MobileMenu from "./MobileMenu";
import AuthButton from "./AuthButton";
import { ThemeToggle } from "../ui/theme-toggle";
import { SearchInput } from "../ui/search-input";

const Navbar = () => {
  return (
    <header className="flex items-center sm:flex-row flex-col justify-between gap-4 py-4 px-2 md:px-4 w-full">
      <Link
        href="/"
        className="flex items-center text-2xl gap-2 font-semibold md:hidden mx-auto sm:w-full"
      >
        <Cloud size={40} />
        Cloud Locker
      </Link>
      <div className="flex items-center gap-2 w-full justify-between">
        <SearchInput endIcon={Search} />
        <MobileMenu />
        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
