"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((path) => path !== "");
  let currentPath = "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathParts.map((part, index) => {
          currentPath += "/" + part;

          if (index === pathParts.length - 1)
            return (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage
                    className="capitalize text-xl"
                  >
                    {part.replace(/%20/, ' ')}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            );

          return (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  className="capitalize text-xl"
                  href={currentPath}
                >
                  {part.replace(/%20/, ' ')}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
