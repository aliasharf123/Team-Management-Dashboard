import React from "react";
import ProjectInfo from "./ProjectInfo";

export default function Page({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  return (
    <div className=" ">
      <ProjectInfo />
      <div className="bg-slate-100 h-[10000px]">asdklasjlkdjsa</div>
    </div>
  );
}
