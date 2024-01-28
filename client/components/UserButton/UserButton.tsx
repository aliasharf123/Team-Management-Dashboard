"use client";

import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  rem,
  Skeleton,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import useUser from "@/hooks/useUser";
import UserMenu from "../UserMenu";
import { UserDoc } from "../../../server/src/user/types";

export function UserButton() {
  const { data, error, loading } = useUser<UserDoc>("user");

  return (
    <UserMenu>
      <UnstyledButton className={classes.user}>
        <Group>
          <Skeleton circle radius="xl" height={35} visible={loading}>
            <Avatar src={data?.imageUrl ?? ""} radius="xl" />
          </Skeleton>

          <div style={{ flex: 1 }}>
            <Skeleton visible={loading}>
              <Text size="sm" truncate fw={500}>
                {data?.email.substring(0, data.email.indexOf("@"))}
              </Text>
            </Skeleton>
            <Skeleton visible={loading}>
              <Text c="dimmed" truncate size="xs">
                {data?.email}
              </Text>
            </Skeleton>
          </div>

          <IconChevronRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        </Group>
      </UnstyledButton>
    </UserMenu>
  );
}
