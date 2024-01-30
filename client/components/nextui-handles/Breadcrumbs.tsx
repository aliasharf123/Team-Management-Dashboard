"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
export default function BreadcrumbsHandler() {
  const pathname = usePathname();
  const navigation = pathname.split("/").slice(1);
  return (
    <Breadcrumbs separator="/">
      {navigation.map((value, index) => (
        <BreadcrumbItem
          href={`${pathname.slice(0, pathname.indexOf(value) + value.length)}`}
          key={index}
        >
          {value}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
