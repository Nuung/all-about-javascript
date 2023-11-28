import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h2>Layout</h2>
      <Outlet />
    </>
  );
}