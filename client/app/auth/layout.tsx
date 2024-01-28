import Image from "next/image";
import React from "react";
import AuthForm from "./authForm";
import teamImage from "../../public/TeamSignin.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex-col flex">
      <div className="grid md:grid-cols-2 h-full items-center gap-14 lg:gap-24  px-4 md:px-8 justify-center">
        {/* A client form component */}
        <div className=" md:flex md:justify-center ">{children}</div>
        <div className="w-[38rem] max-md:hidden h-[28rem]  relative ">
          <Image
            placeholder="blur"
            src={teamImage}
            className="flex-1 "
            alt="team image"
            fill
          />
        </div>
      </div>
    </div>
  );
}
