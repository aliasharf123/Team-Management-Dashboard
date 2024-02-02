import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Editor, BubbleMenu } from "@tiptap/react";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { COLORS } from "./values/colors";
import { TEXT_STYLE } from "./values/textStyle";
export default function BubbleMenuHandle({ editor }: { editor: Editor }) {
  return (
    <BubbleMenu
      className="flex gap-1"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <ButtonGroup className="p-0">
        {TEXT_STYLE.map((value, index) => (
          <Button
            key={index}
            isIconOnly
            onClick={() => value.toggleFnKey(editor)}
          >
            <value.Icon
              className={editor.isActive(value.name) ? "text-primary" : ""}
            />
          </Button>
        ))}
        <Dropdown>
          <DropdownTrigger>
            <Button color="primary" variant="light" className="capitalize">
              A
              <MdOutlineKeyboardArrowDown size={15} />
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
      </ButtonGroup>
    </BubbleMenu>
  );
}
