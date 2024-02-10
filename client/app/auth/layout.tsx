import Image from "next/image";
import AuthForm from "./authForm";
import teamImage from "../../public/TeamSignin.jpg";
import logo from "../../public/Screenshot_2023-10-25_102037-transformed.png";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background bg-radial ">
      <div className="flex items-center    h-screen justify-center">
        <div className="relative flex h-screen w-screen">
          <Link href={"/"}>
            <div className="absolute left-2 flex gap-2 items-center top-5 lg:left-5">
              <Image
                className="pl-1"
                alt="logo"
                src={logo}
                height={30}
                width={30}
              />
              <h1 className="font-bold text-foreground">Weka</h1>
            </div>
          </Link>
          {/* A client form component */}
          <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
            {children}
          </div>
          <div
            style={{
              backgroundImage: `url("https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
            className=" hidden w-1/2 flex-col-reverse rounded-l-medium p-10 shadow-small lg:flex"
          ></div>
        </div>
      </div>
    </div>
  );
}
