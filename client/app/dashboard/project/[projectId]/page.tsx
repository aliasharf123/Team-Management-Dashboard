import React from "react";
import ProjectInfo from "./ProjectInfo";
import TaskCard from "@/components/TaskCard";

export default function Page({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  return (
    <div className=" ">
      <ProjectInfo />
      <div className="bg-slate-100 p-2 h-[10000px]">
        <TaskCard />
      </div>
    </div>
  );
}
