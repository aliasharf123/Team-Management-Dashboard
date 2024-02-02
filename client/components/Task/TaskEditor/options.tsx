"use client";
import IconButton from "@/components/Button/IconButton";
import { Button } from "@nextui-org/react";
import React from "react";
import { AiOutlineComment } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";

export default function Options() {
  return (
    <div className="flex  items-center">
      <Button size="sm" variant="light" className="p-1 text-sm">
        Share
      </Button>
      <IconButton
        Icon={AiOutlineComment}
        size={22}
        content="share task with people"
      />
      <IconButton size={22} Icon={MdManageHistory} content="see history" />
      <IconButton size={22} Icon={FaRegStar} content="Add to your favorite" />
    </div>
  );
}
