import SideBar from "./components/sideBar";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full relative overflow-x-hidden">{children}</div>
    </div>
  );
}
