import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider appearance={{ elements: { footer: "hidden" } }}>
      {children}
    </ClerkProvider>
  );
};

export default Providers;
