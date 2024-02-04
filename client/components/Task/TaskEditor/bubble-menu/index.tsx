"use client";
import { ButtonGroup } from "@nextui-org/react";
import {
  Editor,
  BubbleMenu,
  isNodeSelection,
  BubbleMenuProps,
} from "@tiptap/react";
import React from "react";
import StyleSelector from "./style-selector";
import ColorSelector from "./color-selector";
import LinkSelector from "./link-selector";
import NodeSelector from "./node-selector";

export type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children">;

export default function EditorBubbleMenu({ editor }: { editor: Editor }) {
  const bubbleMenuProps: EditorBubbleMenuProps = {
    shouldShow: ({ state, editor }) => {
      const { selection } = state;
      const { empty } = selection;

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive("image") || empty || isNodeSelection(selection)) {
        return false;
      }
      return true;
    },
    tippyOptions: {
      moveTransition: "transform 0.15s ease-out",
    },
  };
  return (
    <BubbleMenu {...bubbleMenuProps} className="flex gap-1 " editor={editor}>
      <ButtonGroup className="p-0 shadow-md">
        <NodeSelector editor={editor} />
        <LinkSelector editor={editor} />
        <StyleSelector editor={editor} />
        <ColorSelector editor={editor} />
      </ButtonGroup>
    </BubbleMenu>
  );
}
