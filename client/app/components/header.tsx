import Image from "next/image";
import React from "react";
import logo from "../../public/Screenshot_2023-10-25_102037-transformed.png";
import Link from "next/link";
export default function Header() {
  return (
    <div className="p-1 px-2 font-medium flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <Image  src={logo} className="w-16 h-14" width={1000} height={1000} alt="logo" />
      </div>
      <div className="flex gap-4 h-fit">
        <Link href={'/auth'} passHref>Sign in</Link>
        <button className="bg-Enerie-Black text-white backdrop-brightness-50 rounded-md px-5 py-[0.1rem]  font-[570]  ShadowBox">Get App</button>
      </div>
    </div>
  );
}
