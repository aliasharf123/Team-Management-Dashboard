"use client";

import { Avatar, AvatarGroup } from "@nextui-org/react";
import React from "react";

export default function AvatarGroupHandler({
  team,
  parentStyle,
  avatarStyle,
}: {
  team?: string[];
  parentStyle?: string;
  avatarStyle?: string;
}) {
  team = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  ];
  return (
    <div>
      <AvatarGroup
        className={`w-fit ` + parentStyle}
        size="sm"
        max={3}
        isBordered
        total={team.length}
      >
        {team.map((value, index) => (
          <Avatar key={index} src={value} />
        ))}
      </AvatarGroup>
    </div>
  );
}
