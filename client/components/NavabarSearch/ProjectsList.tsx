import React from "react";
import classes from "./NavbarSearch.module.css";
import useUser from "@/hooks/useUser";
import { ActionIcon, Group, Text, Tooltip, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { addProject } from "@/lib/actions/addProject";

export default function ProjectsList() {
  const { data, loading, error } = useUser();
  console.log(data)
  return (
    <div className={classes.section}>
      <Group className={classes.collectionsHeader} justify="space-between">
        <Text size="xs" fw={500} c="dimmed">
          Projects
        </Text>
        <Tooltip label="Create project" withArrow position="right">
          <ActionIcon onClick={() => addProject()} variant="default" size={18}>
            <IconPlus
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Tooltip>
      </Group>
      <div className={classes.collections}>
        {data?.projects.length ? (
          data?.projects.map((project : any) => (
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              key={project.title}
              className={classes.collectionLink}
            >
              {project._id}
            </a>
          ))
        ) : (
          <h1 className={classes.collectionLink}>empty</h1>
        )}
      </div>
    </div>
  );
}
