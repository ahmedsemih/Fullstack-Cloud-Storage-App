import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "./ThemeProvider";
import { OptionProvider } from "@/contexts/OptionContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider appearance={{ elements: { footer: "hidden" } }}>
        <OptionProvider>{children}</OptionProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default Providers;
