import React from "react";
import logoWhite from "../../assets/logo-white.svg";
import avatar from "../../assets/avater.webp";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuth } from "../../hooks/useAuth";

export default function Aside() {
    const logout = useLogout();
    const {auth} = useAuth()
  return (
    <aside className="w-64 bg-primary p-6 flex flex-col">
      <Link to="/admin/dashboard">
      <div className="mb-10">
        <img src={logoWhite} className="h-7" />
      </div>
      </Link>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className="block py-2 px-4 rounded-lg bg-buzzr-purple bg-white text-primary font-bold"
            >
              Quizzes
            </NavLink>
          </li>

          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Settings
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Manage Users
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
            >
              Manage Roles
            </a>
          </li>

          <li>
            <a 
              className="cursor-pointer block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              onClick={logout}
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-auto flex items-center">
        <img
          src={avatar}
          alt="Mr Hasan"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
               <span className="text-white font-semibold">{auth?.user?.full_name}</span>

      </div>
    </aside>
  );
}
