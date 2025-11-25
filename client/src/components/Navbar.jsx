import React from "react";
import { useLocation,Link , useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ name }) {
  const { handleLogout } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();
  const path = location.pathname;

  
  return (
    <>
      <nav className="fixed top-0 h-[60px] w-full bg-blue-800 flex items-center justify-between px-10 ">
        <h1 className="text-white text-3xl font-bold">PhoneBook</h1>
        {user ? (
          <button
            onClick={handleLogout}
            className="py-1 px-4 bg-white text-blue-900 rounded-full font-medium"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-1 p-1 bg-white rounded-full items-center">
            <Link
              to="/login"
              className={`px-4 py-2 font-medium rounded-full transition-all duration-300 ease-in-out ${
                path === "/login"
                  ? "bg-blue-800 text-white"
                  : "text-blue-900 bg-transparent"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`px-4 py-2 font-medium rounded-full transition-all duration-300 ease-in-out ${
                path === "/register"
                  ? "bg-blue-800 text-white"
                  : "text-blue-900 bg-transparent"
              }`}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
