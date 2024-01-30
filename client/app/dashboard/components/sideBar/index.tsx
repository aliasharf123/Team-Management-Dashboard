import Image from "next/image";
import React from "react";
import logo from "../../../../public/Screenshot_2023-10-25_102037-transformed.png";
import { PiHouseBold } from "react-icons/pi";
import { PiCheckCircleBold } from "react-icons/pi";
import { PiBellBold } from "react-icons/pi";
import { PiChartBar } from "react-icons/pi";
import { PiXCircleBold } from "react-icons/pi";
import { PiTextAlignLeft } from "react-icons/pi";
import Link from "next/link";
import { IconType } from "react-icons/lib";

type NavItems = {
  name: string;
  link: string;
  Icon: IconType;
}[];

const mainNav: NavItems = [
  {
    name: "Home",
    link: "/",
    Icon: PiHouseBold,
  },
  {
    name: "My Tasks",
    link: "/tasks",
    Icon: PiCheckCircleBold,
  },
  { name: "Inbox", link: "/Inbox", Icon: PiBellBold },
];
const reportNav: NavItems = [
  {
    name: "Goals",
    link: "/",
    Icon: PiChartBar,
  },
  {
    name: "Profiles",
    link: "/tasks",
    Icon: PiXCircleBold,
  },
];

const mockData = [
  { name: "i love asdhasdlnasdlsadsadsadada", color: "#47D9FC" },
  { name: "i love asdhasdlnasdlsadsadsadada", color: "#FB49A4" },
];

export default function SideBar() {
  return (
    <div className="fixed  text-Enerie-Black h-screen top-0 left-0 border py-10 pl-1 pr-8 w-[230px]">
      <div className="flex pl-4 justify-between items-center mb-10">
        <div className="flex gap-2 items-center font-bold font-sans">
          <Image width={25} height={25} src={logo} alt="logo" />
          <h1 className="text-lg">Weka</h1>
        </div>
        <PiTextAlignLeft size={23} />
      </div>
      <div className="grid gap-3 pl-2 text-sm font-semibold">
        <NavigateItemComponent navItems={mainNav} />
        <h1 className="text-[#787878] pl-2">Reporting</h1>
        <NavigateItemComponent navItems={reportNav} />
        <h1 className="text-[#787878] pl-2">Projects</h1>
        <div className="flex overflow-hidden flex-col relative gap-4">
          {mockData.map((value) => (
            <div className="flex gap-3 pl-2 items-center" key={value.name}>
              <div
                style={{ backgroundColor: value.color }}
                className="w-4  rounded h-3"
              >
                {" "}
              </div>
              <h1 className="truncate">{value.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const NavigateItemComponent = ({ navItems }: { navItems: NavItems }) =>
  navItems.map((value) => (
    <Link
      className="flex gap-3  pl-2 py-2 rounded-md hover:bg-slate-200  duration-200 items-center"
      key={value.name}
      href={`/dashboard${value.link}`}
    >
      <value.Icon size={23} />
      <h1>{value.name}</h1>
    </Link>
  ));
