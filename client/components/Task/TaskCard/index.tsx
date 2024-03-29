"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa6";
import { ImEnlarge2 } from "react-icons/im";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegFlag } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import AvatarGroupHandler from "../../nextui-handles/AvatarGroup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TaskType = {
  note?: boolean;
  files?: boolean;
};
export const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

export const formateDueDate = (data: Date) => {
  return data.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function TaskCard({ note, files }: TaskType) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const openTaskModel = () => {
    const params = new URLSearchParams(searchParams);
    params.append("p", "2");
    router.push(pathName + "?" + params.toString(), { scroll: false });
  };
  return (
    <Card className="py-2 w-[270px] shadow-none ">
      <CardHeader className="pb-0  pt-2  flex justify-between items-center">
        <div className="flex gap-1">
          <Chip className="font-medium" variant="flat" size="sm">
            Small
          </Chip>
          <Chip size="sm" variant="flat" color="primary">
            Primary
          </Chip>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" className="p-1" variant="light">
              <HiOutlineDotsHorizontal size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
            <DropdownItem
              key="copy"
              shortcut="⌘C"
              startContent={<FaRegCopy className={iconClasses} />}
            >
              Copy Task
            </DropdownItem>
            <DropdownItem
              key="edit"
              shortcut="⌘⇧E"
              onPress={openTaskModel}
              startContent={<ImEnlarge2 className={iconClasses} />}
            >
              Open Task
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              startContent={
                <AiTwotoneDelete className={cn(iconClasses, "text-danger")} />
              }
            >
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="overflow-visible flex flex-col gap-2 py-2">
        {files && (
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://th.bing.com/th/id/OIP.Z_PIeIRDajXPmZHROt-T_QHaEK?w=312&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            width={250}
          />
        )}
        <div className="grid gap-1">
          <h1 lang="de" className="text-lg font-semibold hyphens-auto">
            User Validation and authentication asjdhsa
          </h1>
          {note && (
            <p className="hyphens-auto text-default-600  leading-6">
              laslodijalidsjkajoi jqokadojodsajkj nkjsan djan jnaoj noaso aso{" "}
            </p>
          )}
        </div>
        <div>
          <Chip
            startContent={<FaRegFlag size={15} />}
            variant="light"
            color="default"
            size="sm"
            className="text-default-600 p-0 font-medium"
          >
            {formateDueDate(new Date())}
          </Chip>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between">
        <AvatarGroupHandler />
        <Chip
          startContent={<LuMessagesSquare size={15} />}
          variant="light"
          color="default"
          size="sm"
          className="text-default-600 p-0 font-medium"
        >
          12
        </Chip>
      </CardFooter>
    </Card>
  );
}
