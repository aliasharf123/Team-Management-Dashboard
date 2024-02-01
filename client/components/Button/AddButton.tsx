import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { FaPlus } from "react-icons/fa6";

type AddButtonProb = {
  buttonSize?: "sm" | "md" | "lg";
  iconSize?: "sm" | "md" | "lg";
  content?: string;
  fn?: () => void;
};

export default function AddButton({
  buttonSize,
  iconSize,
  content,
  fn,
}: AddButtonProb) {
  return (
    <Tooltip content={content} isDisabled={!Boolean(content)}>
      <Button
        onPress={() => {
          fn && fn();
        }}
        size={buttonSize}
        isIconOnly
        radius="full"
        color="primary"
      >
        <FaPlus size={iconSize} />
      </Button>
    </Tooltip>
  );
}
