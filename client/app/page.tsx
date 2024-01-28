import Image from "next/image";
import Footer from "./components/footer";
import Header from "./components/header";
import background from "@/public/ia8trm6g.png";
import TypeWriterClient from "./components/typeWriter";
import Link from "next/link";
import effect from "@/public/65809a10c85f59a63201a8a5_noise-light.png";
export default function Home() {
  return (
    <main className="bg-[#F5F5F4]  ">
      <Header />
      <div className="md:py-[200px] overflow-hidden  relative  flex justify-center py-[150px]">
        <Image
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url(${effect})`,
          }}
          className="absolute md:-top-[40vh] max-md:h-[70vh] -right-[30vw] -top-[10vh] opacity-[90%] bg-no-repeat bg-cover   md:-right-[20vw]  blur-[10px] bg-blend-soft-light  w-[1800px] "
          src={background}
          alt={"background"}
        />
        <div className=" text-center   z-30 flex flex-col items-center gap-14 max-w-[80rem] mx-5  text-Enerie-Black">
          <div className="md:text-7xl lg:text-9xl  text-6xl">
            <h1 className=" font-semibold  textStyle">
              The weka provides new features like
            </h1>
            <h1 className="tracking-tight font-['Open_Sans']">
              <TypeWriterClient />
            </h1>
          </div>
          <p className="text-2xl  max-w-[50rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            blanditiis velit accusamus dicta! Harum, dolores error sit cum
            recusandae, nemo facilis quos explicabo dicta similique nihil,
            voluptas nostrum. Tempora, illum!
          </p>
          <Link href={"/auth/signup"} className="ButtonBlack paddingStyle">
            Sign up free -{">"}
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
