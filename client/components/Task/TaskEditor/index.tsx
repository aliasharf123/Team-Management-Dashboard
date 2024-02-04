"use client";
import React, { useEffect } from "react";

import { EditorContent } from "@tiptap/react";
import { useEditor } from "@tiptap/react";
import { defaultExtensions } from "./extensions";
import EditorBubbleMenu from "./bubble-menu";
import TextareaAutosize from "react-textarea-autosize";
import Properties from "./properties";
import { Divider } from "@nextui-org/react";
// import BubbleMenu from "@tiptap/extension-bubble-menu";
export default function TaskEditor() {
  const taskName = 2;
  const editor = useEditor({
    extensions: [...defaultExtensions],
    content: `
        <h1>
          ${taskName},
        </h1>
        <react-component count="0"></react-component>

        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">A list item</li>
          <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
        <p>
          this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
    <pre><code class="language-css">body {
      display: none;
    }</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,
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
