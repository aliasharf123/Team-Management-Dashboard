import { Editor } from "@tiptap/react";
import React from "react";

import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare,
  ChevronDownIcon,
} from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
export default function NodeSelector({ editor }: { editor: Editor }) {
  const items = [
    {
      name: "Text",
      icon: TextIcon,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "To-do List",
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskItem"),
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: TextQuote,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      name: "Code",
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button className="bg-white" endContent={<ChevronDownIcon size={15} />}>
          {activeItem.name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Merge options"
        className="max-w-[300px]"
        variant="light"
        items={items}
        selectionMode="single"
        selectedKeys={new Set([activeItem.name])}
      >
        {(item) => (
          <DropdownItem
            startContent={
              <item.icon className="bg-default-100 rounded-md p-1" size={21} />
            }
            onClick={() => item.command()}
            key={item.name}
          >
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
