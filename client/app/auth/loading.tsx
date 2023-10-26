import Image from "next/image";
import React from "react";
import loadingSvg from '../../public/Rolling-1s-85px.svg'
export default function loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
        <Image src={loadingSvg} className="w-10 h-10" width={200} height={200} alt="loading"/>
    </div>
  );
}
