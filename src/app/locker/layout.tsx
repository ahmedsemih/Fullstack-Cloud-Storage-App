import { ReactNode } from "react";

import Options from "@/components/options";
import DetailBox from "@/components/detailBox";

type Props = {
  children: ReactNode;
};

const LockerLayout = ({ children }: Props) => {
  return (
    <div className="w-full xl:h-[calc(100vh-218px)] relative">
      <Options />
      <div className="flex flex-row gap-4 h-full">
        <div className="w-full">{children}</div>
        <DetailBox />
      </div>
    </div>
  );
};

export default LockerLayout;
