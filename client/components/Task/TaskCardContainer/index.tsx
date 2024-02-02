"use client";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
  cn,
} from "@nextui-org/react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { iconClasses } from "../TaskCard";
import AddButton from "../../Button/AddButton";
export default function TaskCardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col  gap-4">
      <Card
        classNames={{
          body: "flex  justify-between",
        }}
        className="max-w-[270px] shadow-none"
      >
        <CardBody className="flex justify-between">
          <div className="flex  gap-1 justify-between  items-center">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-semibold">To Do</h1>
              <p className="text-xs text-default-500 font-medium">
                12 Card Task
              </p>
            </div>
            <div className="flex items-center ">
              <AddButton buttonSize="sm" content="Add new task" />
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    radius="full"
                    variant="light"
                    size="sm"
                    color="default"
                  >
                    <HiOutlineDotsVertical size={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with icons"
                >
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    shortcut="⌘⇧D"
                    startContent={
                      <AiTwotoneDelete
                        className={cn(iconClasses, "text-danger")}
                      />
                    }
                  >
                    Delete List
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    shortcut="⌘⇧D"
                    startContent={
                      <AiTwotoneDelete
                        className={cn(iconClasses, "text-danger")}
                      />
                    }
                  >
                    Delete All Done Tasks
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardBody>
      </Card>
      {children}
    </div>
  );
}
