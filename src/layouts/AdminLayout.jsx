import React from "react";
import Aside from "../components/admin/aside";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <Aside />
      <main className="flex-grow p-10">
        <Outlet />
      </main>
    </div>
  );
}
