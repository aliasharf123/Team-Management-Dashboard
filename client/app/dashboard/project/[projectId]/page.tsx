import React, { Suspense } from "react";
import ProjectInfo from "./ProjectInfo";
import TaskCard from "@/components/TaskCard";
import TaskCardContainer from "@/components/TaskCardContainer";
import Kanban from "@/components/TasksView/kanban";
import ListView from "@/components/TasksView/listView";
import TaskDetailModel from "@/components/TaskDetalModel";

export default function Page({
  params: { projectId },
  searchParams,
}: {
  params: { projectId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className=" ">
      <ProjectInfo />
      <div>
        {!searchParams["v"] || searchParams["v"] == "1" ? (
          <Kanban />
        ) : (
          <ListView />
        )}
      </div>
      <TaskDetailModel />
    </div>
  );
}
