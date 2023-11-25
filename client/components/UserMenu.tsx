"use client";
import { Button, Popover } from "@mantine/core";
import React from "react";
import { IconLogout } from "@tabler/icons-react";
import { deleteCookies } from "@/lib/actions/AuthCookies";
export default function UserMenu({ children }: { children: React.ReactNode }) {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
    <Popover.Target>{children}</Popover.Target>
    <Popover.Dropdown>
      <Button onClick={async () => { await deleteCookies()}} fullWidth color="red" leftSection={<IconLogout size={14} />} >
          Log out
      </Button>
    </Popover.Dropdown>
  </Popover>
  );
}
