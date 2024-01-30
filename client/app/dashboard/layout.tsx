import SideBar from "./components/sideBar";
import Header from "./components/header";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      <div className="ml-[230px]">
        <Header />
        {children}
      </div>
    </>
  );
}
