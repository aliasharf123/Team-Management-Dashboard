import React from "react";
import ProjectInfo from "./ProjectInfo";
import TaskCard from "@/components/TaskCard";
import TaskCardContainer from "@/components/TaskCardContainer";
import Kanban from "@/components/TasksView/kanban";
import ListView from "@/components/TasksView/listView";

export default function Page({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  return (
    <div className=" ">
      <ProjectInfo />
      <div className="bg-[#F9F9FB] pt-2 h-[4000px] ">
        <ListView />
      </div>
    </div>
  );
}
