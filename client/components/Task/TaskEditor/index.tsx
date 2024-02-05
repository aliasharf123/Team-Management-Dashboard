"use client";
import React, { useEffect } from "react";

import { EditorContent } from "@tiptap/react";
import { useEditor } from "@tiptap/react";
import { defaultExtensions } from "./extensions";
import EditorBubbleMenu from "./bubble-menu";
import TextareaAutosize from "react-textarea-autosize";
import Properties from "./properties";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import Collaboration from "@tiptap/extension-collaboration";
export default function TaskEditor() {
  const ydoc = new Y.Doc();

  const provider = new WebrtcProvider("new sadsa", ydoc);
  const editor = useEditor({
    extensions: [
      ...defaultExtensions,
      Collaboration.configure({
        document: ydoc,
      }),
    ],

    editorProps: {
      attributes: {
        class: "prose dark:prose-invert w-full focus:outline-none",
      },
      handleDOMEvents: {
        keydown: (_view, event) => {
          // prevent default event listeners from firing when slash command is active
          if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
            const slashCommand = document.querySelector("#slash-command");
            if (slashCommand) {
              return true;
            }
          }
        },
      },
    },
  });

  if (!editor) return null;
  return (
    <div className="">
      <TextareaAutosize
        className="text-5xl w-full 
         bg-transparent font-bold hyphens-auto outline-none mb-3 resize-none"
      />
      <Properties />
      {/* <Divider className="my-4 h-[0.4px]" /> */}

      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent className="" editor={editor} />
    </div>
  );
}
