"use client";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { Button, Dropdown, MenuProps, Space } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Product
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Blog
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Docs
      </a>
    ),
  },
];

export default function SideBar() {
  const [opened, { toggle, open, close }] = useDisclosure();

  return (
    <Dropdown
      menu={{ items }}
      onOpenChange={(opened: boolean) => {
        if (opened) open();
        else {
          close();
        }
      }}
      placement="bottomLeft"
    >
      <Burger
        className="md:hidden"
        opened={opened}
        size="xs"
        onClick={toggle}
        aria-label="Toggle navigation"
      />
    </Dropdown>
  );
}
