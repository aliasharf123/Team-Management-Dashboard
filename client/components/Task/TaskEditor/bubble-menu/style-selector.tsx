"use client";
import React from "react";
import { ChainedCommands, Editor } from "@tiptap/react";
import { FaCode } from "react-icons/fa";
import { IconType } from "react-icons/lib";

import {
  MdFormatBold,
  MdOutlineStrikethroughS,
  MdFormatItalic,
  MdFormatUnderlined,
} from "react-icons/md";
import { Button } from "@nextui-org/react";

export const TEXT_STYLE: {
  Icon: IconType;
  toggleFnKey: (editor: Editor) => void;
  name: string;
}[] = [
  {
    name: "bold",
    Icon: MdFormatBold,
    toggleFnKey: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    name: "strike",
    Icon: MdOutlineStrikethroughS,
    toggleFnKey: (editor) => editor.chain().focus().toggleStrike().run(),
  },
  {
    name: "italic",
    Icon: MdFormatItalic,
    toggleFnKey: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    name: "code",
    Icon: FaCode,
    toggleFnKey: (editor) => editor.chain().focus().toggleCode().run(),
  },
  //   { name: "Underline", Icon: MdFormatUnderlined, toggleFnKey: "toggleCode" },
];

export default function StyleSelector({ editor }: { editor: Editor }) {
  return (
    <>
      {TEXT_STYLE.map((value, index) => (
        <Button
          key={index}
          isIconOnly
          className="bg-white"
          onClick={() => value.toggleFnKey(editor)}
        >
          <value.Icon
            size={15}
            className={editor.isActive(value.name) ? "text-primary" : ""}
          />
        </Button>
      ))}
    </>
  );
}
