"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/Screenshot_2023-10-25_102037-transformed.png";
import { TbSmartHome } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  ScrollShadow,
  User,
} from "@nextui-org/react";
import DropdownClient from "./dropdownClient";
import SearchInput from "./searchInput";
import { TfiTimer } from "react-icons/tfi";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { TbCheckupList } from "react-icons/tb";
import { RiNotificationLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./theme-switch";
import { IoIosAddCircle } from "react-icons/io";
const mainNav = [
  { name: "Notification", Icon: RiNotificationLine },

  {
    name: "Add Project ",
    Icon: IoIosAddCircle,
  },
  {
    name: "Calender",
    Icon: TfiTimer,
  },
];

export default function SideBar() {
  const iconClasses = "text-xl  pointer-events-none flex-shrink-0";
  const pathName = usePathname();
  const [open, setOpen] = useState(true);

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
    <>
      <div
        className={`sticky ${
          open ? " w-[280px]" : "w-0 -translate-x-72"
        } duration-250  h-screen flex flex-col group border border-divider  top-0 left-0 border-r py-6 `}
      >
        <div className="flex sticky flex-col px-6 pb-[2px]  gap-5">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <Image
                className="pl-1"
                alt="logo"
                src={logo}
                height={30}
                width={30}
              />
              <h1 className="font-bold ">Weka</h1>
            </div>
            <Button
              onClick={() => setOpen(false)}
              isIconOnly
              className="hidden  text-default-500 group-hover:flex"
              variant="light"
              size="sm"
            >
              <HiOutlineChevronDoubleRight className="rotate-180" size={15} />
            </Button>
            <div className="w-8 h-8 group-hover:hidden"> </div>
          </div>
          <div className="flex flex-col gap-4">
            <DropdownClient>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  size: "sm",
                }}
                className="transition-transform pl-1 justify-start"
                description="@tonyreichert"
                name="Tony Reichert"
              />
            </DropdownClient>
            <SearchInput />
          </div>
        </div>
        <ScrollShadow size={100} className="px-6 py-4  h-full">
          <div>
            <Listbox variant="flat" aria-label="Listbox menu with sections">
              <ListboxSection title="OverView">
                {mainNav.map((item) => (
                  <ListboxItem
                    key={item.name}
                    classNames={{
                      title: "font-medium",
                    }}
                    className="flex-1 text-small truncate py-2  text-default-500 group-data-[selected=true]:text-foreground"
                    startContent={
                      <item.Icon size={26} className={iconClasses} />
                    }
                  >
                    {item.name}
                  </ListboxItem>
                ))}
              </ListboxSection>

              <ListboxSection title="Projects">
                <ListboxItem className="text-default-500" key="copy">
                  Copy link
                </ListboxItem>
              </ListboxSection>

              <ListboxSection title="Tasks">
                <ListboxItem
                  key="new"
                  className="flex-1 text-small truncate font-medium text-default-500 group-data-[selected=true]:text-foreground"
                  // startContent={<item.Icon size={25} className={iconClasses} />}
                >
                  task
                </ListboxItem>
              </ListboxSection>
            </Listbox>
          </div>
        </ScrollShadow>
        <ThemeSwitch />
      </div>
      <div
        className={`sticky ${
          open ? "hidden" : "flex"
        } top-0 left-0  h-screen  flex-col p-1 `}
      >
        <Button
          onClick={() => setOpen(true)}
          isIconOnly
          variant="light"
          size="sm"
        >
          <HiOutlineChevronDoubleRight size={15} />
        </Button>
      </div>
    </>
  );
}
