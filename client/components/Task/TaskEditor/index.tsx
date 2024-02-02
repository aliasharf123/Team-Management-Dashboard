"use client";
import React from "react";
import { EditorContent } from "@tiptap/react";
import BubbleMenuHandle from "./BubbleMenuHandle";
import { useEditor } from "@tiptap/react";
import { defaultExtensions } from "./extensions";
// import BubbleMenu from "@tiptap/extension-bubble-menu";
export default function TaskEditor() {
  const editor = useEditor({
    extensions: [...defaultExtensions],
    content: `
        <h2>
          Hi there,
        </h2>
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
        class:
          "prose dark:prose-invert  prose-p:prose-base prose-xl m-5 focus:outline-none",
      },
    },
  });

  if (!editor) return null;
  return (
    <div>
      {editor && <BubbleMenuHandle editor={editor} />}
      <EditorContent className="" editor={editor} />
    </div>
  );
}
