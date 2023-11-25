import { NavbarSearch } from "@/components/NavabarSearch/NavbarSearch";
import React from "react";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed overflow-x-hidden left-0 top-0 z-10 h-full">
        <NavbarSearch />
      </div>
      <div className=" ml-[250px]">{children}</div>
    </>
  );
}
