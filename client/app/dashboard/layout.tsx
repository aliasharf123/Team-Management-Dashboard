import SideBar from "../../components/sideBar";

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative">
      <SideBar />
      <div className="flex-auto">{children}</div>
    </div>
  );
}
