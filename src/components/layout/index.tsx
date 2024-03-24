import { ReactNode } from "react";

import Topbar from "./Topbar";
import SideMenu from "./SideMenu";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <SideMenu />
      <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5 px-2 sm:px-4">
        <Topbar />
        {children}
      </div>
    </main>
  );
};

export default Layout;
