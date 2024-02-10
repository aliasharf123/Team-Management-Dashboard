import FullPageTask from "@/components/Task/TaskEditor";
import Options from "@/components/Task/TaskEditor/options";
import BreadcrumbsHandler from "@/components/nextui-handles/Breadcrumbs";
import React from "react";

export default function Page() {
  return (
    <div className=" ">
      <div className="sticky z-50 flex p-2 justify-between   top-0 w-full">
        <BreadcrumbsHandler />
        <Options />
      </div>
      <div className="flex justify-center">
        <div className="max-w-3xl mt-24">
          <FullPageTask />
        </div>
      </div>
    </div>
  );
}
