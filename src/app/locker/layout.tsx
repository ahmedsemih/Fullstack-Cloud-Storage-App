import { ReactNode } from "react";

import Options from "@/components/options";

type Props = {
  children: ReactNode;
};

const LockerLayout = ({ children }: Props) => {
  return (
    <div className="w-full">
      <Options />
      {children}
    </div>
  );
};

export default LockerLayout;
