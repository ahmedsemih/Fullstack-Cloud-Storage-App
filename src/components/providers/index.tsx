import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider appearance={{ elements: { footer: "hidden" } }}>
        {children}
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default Providers;
