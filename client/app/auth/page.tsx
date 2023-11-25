import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/Screenshot_2023-10-25_102037-transformed.png";
import teamImage from "../../public/TeamSignin.jpg";
import AuthForm from "./authForm";
export default function Page() {
  return (
    <div className="h-screen flex-col flex">
      {/* Header */}
      <div className="flex justify-center mb-14">
        <Link href={"/"} className="flex items-center">
          <Image src={logo} className="h-20" width={80} height={80} alt="logo" />
          <h1 className="font-bold text-lg">Weka Team</h1>
        </Link>
      </div>
      <div className="flex h-full   gap-14 lg:gap-24  px-4 md:px-8 justify-center">
        <div className="w-[38rem] max-md:hidden h-[28rem]  relative ">
          <Image placeholder="blur" src={teamImage} className="flex-1 " alt="team image" fill />
        </div>
        {/* A client form component */}
        <AuthForm />
      </div>
    </div>
  );
}
