"use client";
import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { IconType } from "react-icons/lib";

export default function IconButton({
  Icon,
  onPress,
  content,
  size,
}: {
  Icon: IconType;
  onPress?: () => void;
  content?: string;
  size?: number;
}) {
  return (
    <Tooltip content={content} isDisabled={!Boolean(content)}>
      <Button
        onPress={() => {
          onPress && onPress();
        }}
        isIconOnly
        variant="light"
        size="sm"
        radius="full"
      >
        <Icon className="text-default-400" size={size} />
      </Button>
    </Tooltip>
  );
}
