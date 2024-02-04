import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";

import { Color } from "@tiptap/extension-color";
import SlashCommand from "./slash-command";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { InputRule } from "@tiptap/core";
import DragAndDrop from "./drag-drop";
import Link from "@tiptap/extension-link";
import { CustomPlaceholder } from "./place-holder";
import { CustomDocument } from "./top-content";
import Placeholder from "@tiptap/extension-placeholder";
import CustomKeymap from "./custome-keymap";
export const defaultExtensions = [
  StarterKit.configure({
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2",
      },
    },
  }),
  TextStyle,
  Typography,
  SlashCommand,
  Link.configure({
    openOnClick: true,
    autolink: true,
    HTMLAttributes: {
      class: "cursor-pointer",
    },
    validate: (href) => /^https?:\/\//.test(href),
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading" && node.attrs.level == 1) {
        return "title";
      } else {
        return "Press '/' for commands...";
      }
    },
  }),
  CustomDocument,
  DragAndDrop,
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-stone-300",
    },
  }),
  Color,
  TaskList.configure({
    HTMLAttributes: {
      class: " not-prose p-0 ",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start ",
    },
    nested: true,
  }),
  Highlight.configure({ multicolor: true }),
  CustomKeymap,
];
