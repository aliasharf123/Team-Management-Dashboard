"use client";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Editor } from "@tiptap/react";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const COLORS: { name: string; hexColor: string }[] = [
  { name: "Gray", hexColor: "#808080" },
  { name: "Brown", hexColor: "#A52A2A" },
  { name: "Orange", hexColor: "#FFA500" },
  { name: "Yellow", hexColor: "#FFFF00" },
  { name: "Blue", hexColor: "#0000FF" },
  { name: "Pink", hexColor: "#FFC0CB" },
  { name: "Red", hexColor: "#FF0000" },
  { name: "Default", hexColor: "#FFFFFF" },
  { name: "Green", hexColor: "#008000" },
  { name: "Purple", hexColor: "#800080" },
];

export default function ColorSelector({ editor }: { editor: Editor }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly className="capitalize bg-white">
          <div className="flex items-center">
            <h1 className="font-bold">A</h1>
            <MdOutlineKeyboardArrowDown size={15} />
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Variants" items={COLORS}>
        {(color) => (
          <DropdownItem
            onClick={() =>
              editor.chain().focus().setColor(color.hexColor).run()
            }
            key="new"
          >
            <span
              className="font-medium text-base"
              style={{ color: color.hexColor }}
            >
              A{" "}
            </span>{" "}
            {color.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
