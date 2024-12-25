import React from "react";
import logoImage from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
export default function Header() {
  const { auth } = useAuth();
  const logout = useLogout();

  return (
    <header className="flex justify-between items-center mb-12">
      <Link to="/">
        <img src={logoImage} className="h-7" />
      </Link>
      <div>
        {auth?.user ? (
          <button
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors jaro-font"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors jaro-font"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
