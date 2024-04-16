"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage
                    className="capitalize text-xl"
                  >
                    {part.replace(/%20/, ' ')}
                  </BreadcrumbPage>
                </BreadcrumbItem>
            );

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="capitalize text-xl"
                  href={currentPath}
                >
                  {part.replace(/%20/, ' ')}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
