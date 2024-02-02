"use client";
import {
  Button,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  getKeyValue,
} from "@nextui-org/react";
import { IconEyeDiscount } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";
import AvatarGroupHandler from "../../nextui-handles/AvatarGroup";
import { formateDueDate } from "../TaskCard";
import { IoEyeOutline, IoSearchCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const rows = [
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
  {
    key: "1",
    title: "Tony Reichert",
    role: "CEO",
    status: "Active",
    tags: ["active", "lasdnk"],
    assigned: [" ", " ", " "],
    "due date": new Date(),
  },
];

const columns = [
  {
    key: "title",
    label: "TaskName",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "tags",
    label: "Tags",
  },
  {
    key: "assigned",
    label: "Assigned",
  },
  {
    key: "due date",
    label: "Due Date",
  },
  {
    key: "actions",
    label: "Actions",
  },
];
type ClassKeys =
  | "title"
  | "status"
  | "tags"
  | "assigned"
  | "due date"
  | "actions";
export default function ListView() {
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");

  const renderCell = useCallback(
    (item: Partial<(typeof rows)[0]>, columnKey: ClassKeys) => {
      switch (columnKey) {
        case "title":
          return <h1>{"skdhaslkdlanllj"}</h1>;
        case "status":
          return (
            <Chip color="danger" className="border-none p-0" variant="dot">
              Done
            </Chip>
          );
        case "tags":
          return (
            <div className="flex gap-1">
              <Chip size="sm" color="danger" variant="flat">
                Done
              </Chip>
              <Chip size="sm" color="danger" variant="flat">
                active
              </Chip>
            </div>
          );
        case "assigned":
          return <AvatarGroupHandler />;

        case "due date":
          return <h1>{formateDueDate(new Date())}</h1>;

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IoEyeOutline />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <MdContentCopy />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <MdDeleteOutline />
                </span>
              </Tooltip>
            </div>
          );
      }
    },
    []
  );
  return (
    <div className="">
      <div className="flex pt-3 pl-3 gap-2">
        <Button radius="sm" startContent={<IoMdAdd />} color="primary">
          Add Task
        </Button>
        <Input
          isClearable
          className="max-w-xs "
          classNames={{
            inputWrapper: "h-10",
          }}
          size="sm"
          placeholder="Search by name..."
          startContent={<FiSearch />}
        />
        <Button isDisabled isIconOnly variant="light" color="default">
          <MdDeleteOutline size={22} />
        </Button>
      </div>
      <Table
        isHeaderSticky
        aria-label="Rows actions table example with dynamic content"
        selectionMode="multiple"
        classNames={{
          table: "shadow-none ",
          wrapper: "rounded-none shadow-none",
        }}
        selectionBehavior={selectionBehavior as any}
        onRowAction={() => {}}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as ClassKeys)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
