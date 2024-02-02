import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import SlashCommand from "./slash-command";

export const defaultExtensions = [
  StarterKit,
  TextStyle,
  SlashCommand,
  Color,
  TaskList.configure({
    HTMLAttributes: {
      class: "prose-base pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-2",
    },
    nested: true,
  }),
  Placeholder.configure({
    placeholder: "Press '/' for commands...",
  }),
  Highlight.configure({ multicolor: true }),
];
