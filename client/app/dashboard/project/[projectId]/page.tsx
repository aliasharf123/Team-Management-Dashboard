import React, { Suspense } from "react";
import ProjectInfo from "./ProjectInfo";
import TaskCard from "@/components/Task/TaskCard";
import TaskCardContainer from "@/components/Task/TaskCardContainer";
import Kanban from "@/components/Task/TasksView/kanban";
import ListView from "@/components/Task/TasksView/listView";
import TaskDetailModel from "@/components/Task/TaskDetalModel";

export default function Page({
  params: { projectId },
  searchParams,
}: {
  params: { projectId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="">
      <ProjectInfo />
      {!searchParams["v"] || searchParams["v"] == "1" ? (
        <Kanban />
      ) : (
        <ListView />
      )}
      <TaskDetailModel />
    </div>
  );
}
