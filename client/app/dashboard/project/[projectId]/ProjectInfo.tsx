"use client";
import AvatarGroupHandler from "@/components/nextui-handles/AvatarGroup";
import { Divider } from "@nextui-org/react";
import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { PiUsersThree } from "react-icons/pi";
import { PiNotePencilBold } from "react-icons/pi";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { PiStarFill } from "react-icons/pi";
import { BsKanbanFill as PiKanbanBold } from "react-icons/bs";
import { IoMdListBox } from "react-icons/io";
import { PiFunnelBold } from "react-icons/pi";
import { MdFilterList as CgSortAz } from "react-icons/md";
import AddButton from "@/components/Button/AddButton";

export default function ProjectInfo() {
  return (
    <div className="sticky top-[65px] z-50 stickyPos  w-full flex flex-col border-b gap-[0.6rem] blurBackground  px-4 pt-3">
      <div className="flex justify-between">
        <div className="flex flex-col  gap-[0.6rem]">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-2xl">Test Project</h1>
            <PiNotePencilBold className="text-gray-400" size={20} />
          </div>
          <div className="flex gap-3 items-center">
            <PiUsersThree className="text-gray-400" size={20} />
            <h1 className="text-sm font-medium">Assign to project</h1>
            <AvatarGroupHandler />
            <AddButton buttonSize="sm" content="Add new user" />
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <Button variant="bordered" isIconOnly aria-label="Like">
            <PiStarFill size={20} className="text-yellow-400" />
          </Button>
          <Button startContent={<FaPlus />} color="primary">
            Add List
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
          <div className="flex gap-3  ">
            <div className="flex items-center">
              <Tooltip content="List view">
                <Button size="sm" isIconOnly color="default" variant="light">
                  <IoMdListBox size={20} />{" "}
                </Button>
              </Tooltip>
              <Divider className="h-4 " orientation="vertical" />
              <Tooltip content="Kanban view">
                <Button color="default" size="sm" isIconOnly variant="light">
                  <PiKanbanBold size={15} />
                </Button>
              </Tooltip>
            </div>
            <div className="flex items-center">
              <Button
                endContent={<PiFunnelBold size={20} />}
                color="default"
                size="sm"
                className="font-medium"
                variant="light"
              >
                Filter
              </Button>
              <Divider className="h-4 " orientation="vertical" />
              <Button
                endContent={<CgSortAz size={20} />}
                color="default"
                size="sm"
                variant="light"
                className="font-medium "
              >
                Sort by
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
