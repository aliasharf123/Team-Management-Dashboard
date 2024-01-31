import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  User,
} from "@nextui-org/react";
import React from "react";
import { PiBellBold, PiMagnifyingGlassBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import DropdownClient from "./dropdownClient";
import SearchInput from "./searchInput";

export default function Header() {
  return (
    <div className="w-full flex justify-between p-4 py-3  z-50 gap-5 sticky top-0  items-center blurBackground border-b ">
      <div className="w-96">
        <SearchInput />
      </div>
      <div className="flex gap-2 justify-end items-center">
        <Button isIconOnly radius="full" color="primary">
          <FaPlus />
        </Button>
        <Button isIconOnly variant="light">
          <PiBellBold size={20} />
        </Button>
        <DropdownClient>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownClient>
      </div>
    </div>
  );
}
