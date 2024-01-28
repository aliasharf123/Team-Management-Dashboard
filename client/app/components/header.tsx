import Image from "next/image";
import React from "react";
import logo from "@/public/Screenshot_2023-10-25_102037-transformed.png";
import Link from "next/link";
import SideBar from "./sideBar";

export const options = ["Product", "Blog", "Docs"];

export default function Header() {
  return (
    <header className="fixed w-full z-40   justify-center leading-[13.6px] md:leading-[17.6px]  flex  top-0 ">
      <div className="bg-[rgba(255,255,255,0.9)] backdrop-blur-[5px] mt-[5.4px] inner md:mt-[20px] drop-shadow-sm max-md:w-full md:gap-12 justify-between mx-2  flex pl-[14px] md:pl-[18px] pr-[8px] box-border  py-[8px] rounded-[14px]">
        <div className="flex">
          <Link href={"/"} className="flex gap-1 items-center font-bold">
            <Image
              src={logo}
              className="md:h-[30px] h-[20px] w-[20px] md:w-[30px]"
              width={30}
              height={30}
              alt="Picture of the author"
            />
            <h1>Weka</h1>
          </Link>
          <nav className="flex gap-1 max-md:hidden  ml-[20px] items-center">
            {options.map((value, index) => (
              <Link
                className="paddingStyle duration-300  hover:bg-[rgba(0,0,0,0.07)]"
                href={"/"}
                key={index}
              >
                {value}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex gap-1 items-center">
          <Link
            href={"/auth/login"}
            className="paddingStyle duration-300  hover:bg-[rgba(0,0,0,0.07)]"
          >
            Log in
          </Link>
          <Link href={"/auth/signup"} className="ButtonBlack paddingStyle">
            Sign up free -{">"}
          </Link>
          <SideBar />
        </div>
      </div>
    </header>
  );
}
