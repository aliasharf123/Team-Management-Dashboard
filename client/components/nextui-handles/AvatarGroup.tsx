"use client";

import { Avatar, AvatarGroup } from "@nextui-org/react";
import React from "react";

export default function AvatarGroupHandler({ team }: { team?: string[] }) {
  team = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  ];
  return (
    <div>
      <AvatarGroup
        className="w-fit"
        size="sm"
        max={3}
        isBordered
        total={team.length}
      >
        {team.map((value, index) => (
          <Avatar key={index} size="sm" src={value} />
        ))}
      </AvatarGroup>
    </div>
  );
}
