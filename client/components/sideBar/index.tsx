"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../../public/Screenshot_2023-10-25_102037-transformed.png";
import { PiHouseBold } from "react-icons/pi";
import { PiCheckCircleBold } from "react-icons/pi";
import { PiBellBold } from "react-icons/pi";
import { PiChartBar } from "react-icons/pi";
import { PiXCircleBold } from "react-icons/pi";
import { PiTextAlignLeft } from "react-icons/pi";
import { IconType } from "react-icons/lib";
import { FiSun } from "react-icons/fi";
import {
  Divider,
  Link,
  Listbox,
  ListboxItem,
  ListboxSection,
  Switch,
  User,
} from "@nextui-org/react";
import DropdownClient from "./dropdownClient";
import SearchInput from "./searchInput";
import { FaMoon } from "react-icons/fa";
import AddButton from "@/components/Button/AddButton";
import { usePathname } from "next/navigation";
const mainNav = [
  {
    name: "Dashboard",
    link: "/dashboard",
    Icon: PiHouseBold,
  },
  {
    name: "My Tasks",
    link: "/tasks",
    Icon: PiCheckCircleBold,
  },
  { name: "Notification", link: "/Notification", Icon: PiBellBold },
  {
    name: "Profiles",
    link: "/Profiles",
    Icon: PiXCircleBold,
  },
  {
    name: "Calender",
    link: "/Calender",
    Icon: PiXCircleBold,
  },
];

export default function SideBar() {
  const iconClasses = "text-xl  pointer-events-none flex-shrink-0";
  const pathName = usePathname();

  const selectedLink = (link: string): boolean => {
    if (link === "/dashboard") {
      if (pathName === link) return true;
      else return false;
    } else if (pathName.includes(link)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="sticky  text-Enerie-Black h-screen flex flex-col justify-between top-0 left-0 border py-6 px-4 w-[250px]">
      <div className="flex flex-col gap-5">
        <DropdownClient>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform justify-start"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownClient>
        <SearchInput />
        <div className="w-full  rounded-small border-default-200 dark:border-default-100">
          <Listbox
            items={mainNav}
            variant="faded"
            classNames={{
              list: "gap-1",
            }}
            aria-label="Listbox menu with icons"
          >
            {(value) => (
              <ListboxItem
                key={value.name}
                classNames={{
                  title: "font-medium",
                  base: `py-2 ${
                    selectedLink(value.link) && "bg-primary shadow-xl"
                  }`,
                }}
                variant={"bordered"}
                startContent={
                  <value.Icon
                    className={
                      iconClasses +
                      `${selectedLink(value.link) ? "" : " text-default-500"}`
                    }
                  />
                }
              >
                {value.name}
              </ListboxItem>
            )}
          </Listbox>
          <Divider className="my-4" />
          <div className="bg-default-100 text-center rounded-lg p-6 flex gap-1 flex-col items-center">
            <AddButton content="" />
            <div>
              <h1 className="font-bold">Add new Project</h1>
              <h1 className="text-xs font-medium">
                or use <span className="text-primary">invite link</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Switch
        defaultSelected
        size="md"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <FiSun className={className} />
          ) : (
            <FaMoon className={className} />
          )
        }
      >
        Dark mode
      </Switch>
    </div>
  );
}
