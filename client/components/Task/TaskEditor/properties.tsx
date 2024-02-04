"use client";
import { useListState } from "@mantine/hooks";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Text, rem } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import classes from "../../../styles/DndList.module.css";
import cx from "clsx";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgCalendarDates } from "react-icons/cg";
import { FaTag } from "react-icons/fa6";
import { TbProgress } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";
const data = [
  { position: 6, name: "status", Icon: TbProgress },
  { position: 7, name: "DueDate", Icon: CgCalendarDates },
  { position: 39, name: "assign to", Icon: BsFillPeopleFill },
  { position: 563, name: "Project", Icon: GoProjectSymlink },
  { position: 600, name: "tags", Icon: FaTag },
];

export default function Properties() {
  const [state, handlers] = useListState(data);
  const items = state.map((item, index) => (
    <Draggable key={item.name} index={index} draggableId={item.name}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, " group ")}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            {...provided.dragHandleProps}
            className={cx(
              classes.dragHandle,
              "fixed -ml-7 p-1 h-12  group-hover:block hidden "
            )}
          >
            <IconGripVertical
              className=" -left-6  text-[#777777] mt-2"
              style={{ width: rem(21), height: rem(21) }}
              stroke={1.5}
            />
          </div>
          <div className="grid grid-cols-4 w-full gap-3">
            <div className="p-1 flex  gap-1 items-center rounded text-default-600 hover:bg-slate-200  ">
              <item.Icon size={18} />
              <h1>{item.name}</h1>
            </div>
            <div className="flex-1 col-span-3 p-1 rounded    hover:bg-slate-200 ">
              {renderComp(item)}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  ));
  const renderComp = (item: any) => {
    switch (item.name) {
      case "status":
        return (
          <div className="text-black">
            <h1>slkd;ajslk mlkl</h1>
          </div>
        );
      case "DueDate":
        return (
          <div className="text-black">
            <h1>slkd;ajslk mlkl</h1>
          </div>
        );
      case "assign to":
        return (
          <div className="text-black">
            <h1>slkd;ajslk mlkl</h1>
          </div>
        );
      case "Project":
        return (
          <div className="text-black">
            <h1>slkd;ajslk mlkl</h1>
          </div>
        );
    }
  };
  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div
            className="mb-5 flex flex-col gap-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
