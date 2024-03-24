import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { Button, buttonVariants } from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  showName?: boolean;
};

const AuthButton = ({ showName }: Props) => {
  const { resolvedTheme: theme } = useTheme();

  return (
    <div className="flex items-center justify-center w-full md:w-auto">
      <SignedIn>
        <div className="md:block hidden w-full">
          <UserButton
            showName={showName || false}
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                userButtonBox: { flexDirection: "row-reverse" },
                userButtonOuterIdentifier: {
                  fontWeight: 500,
                  fontSize: "1.2rem",
                },
              },
            }}
            userProfileProps={{
              appearance: { baseTheme: theme === "dark" ? dark : undefined },
            }}
          />
        </div>
        <Link
          href="/account"
          className={twMerge(
            buttonVariants({
              variant: "ghost",
            }),
            "capitalize md:hidden flex justify-start items-center gap-4 text-lg w-full"
          )}
        >
          <User />
          Account
        </Link>
      </SignedIn>
      <SignedOut>
        <Button>
          <SignInButton />
        </Button>
      </SignedOut>
    </div>
  );
};

export default AuthButton;
