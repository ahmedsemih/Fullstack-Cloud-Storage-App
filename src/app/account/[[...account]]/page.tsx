"use client";

import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { UserProfile } from "@clerk/nextjs";

const AccountPage = () => {
  const { resolvedTheme: theme } = useTheme();

  return (
    <div className="flex items-center w-full justify-center py-8">
      <UserProfile
        path="/account"
        routing="path"
        appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
      />
    </div>
  );
};

export default AccountPage;
