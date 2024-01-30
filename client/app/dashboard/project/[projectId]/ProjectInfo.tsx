"use client";
import AvatarGroupHandler from "@/components/nextui-handles/AvatarGroup";
import BreadcrumbsHandler from "@/components/nextui-handles/Breadcrumbs";
import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { PiUsersThree } from "react-icons/pi";
import { PiNotePencilBold } from "react-icons/pi";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { PiStarFill } from "react-icons/pi";
import { PiListBulletsBold } from "react-icons/pi";
import { PiKanbanBold } from "react-icons/pi";
import { PiFunnelBold } from "react-icons/pi";
export default function ProjectInfo() {
  return (
    <div className="sticky top-[65px] stickyPos  w-full flex flex-col border-b gap-[0.6rem] blurBackground  px-4 pt-3">
      <div className="flex justify-between">
        <div className="flex flex-col  gap-[0.6rem]">
          <BreadcrumbsHandler />
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-2xl">Test Project</h1>
            <PiNotePencilBold className="text-gray-400" size={20} />
          </div>
          <div className="flex gap-3 items-center">
            <PiUsersThree className="text-gray-400" size={20} />
            <h1 className="text-sm font-medium">Assign to project</h1>
            <AvatarGroupHandler />
            <Tooltip content="Add new user">
              <Button size="sm" isIconOnly radius="full" color="primary">
                <FaPlus />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="light" isIconOnly aria-label="Like">
            <PiStarFill size={20} className="text-yellow-400" />
          </Button>
          <Button startContent={<FaPlus />} color="primary">
            Add Task
          </Button>
        </div>
      </div>
      <div className="flex items-center w-full justify-between">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full  relative rounded-none p-0  border-divider",
            cursor: "w-full bg-[#338EF7]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#006FEE]",
          }}
        >
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <span>Tasks</span>
                <Chip size="sm" variant="shadow">
                  1
                </Chip>
              </div>
            }
          />
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <span>Music</span>
              </div>
            }
          />
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <span>Videos</span>
              </div>
            }
          />
        </Tabs>
        <div>
          <div className="flex gap-1 ">
            <Button
              startContent={<PiListBulletsBold size={15} />}
              size="sm"
              color="default"
              variant="ghost"
            >
              List View
            </Button>
            <Button
              startContent={<PiKanbanBold size={15} />}
              color="default"
              size="sm"
              variant="ghost"
            >
              Kanban View
            </Button>
            <Button
              startContent={<PiFunnelBold size={15} />}
              color="default"
              size="sm"
              variant="ghost"
            >
              Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
