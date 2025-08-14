" use client";
import Link from "next/link";
import React from "react";
import { FaHome, FaProjectDiagram, FaTools } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

export default function SideNavbar({ setActiveSection }) {
  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col py-8 shadow-lg z-50 ">
      <div className="mb-10 px-6">
        <Link
          href="#"
          onClick={() => setActiveSection("portfolio")}
          className="text-3xl font-bold text-sky-400 hover:text-sky-300 transition-colors duration-300"
        >
          DevZisan Dashboard
        </Link>
      </div>
      <ul className="flex flex-col space-y-4 text-lg px-6 mb-auto">
        <li>
          <button
            onClick={() => setActiveSection("portfolio")}
            className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700 transition-colors cursor-pointer hover:scale-95 duration-750"
          >
            <FaHome className="mr-3 text-xl" /> Public Portfolio
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("manage-skills")}
            className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-750 cursor-pointer hover:scale-95 "
          >
            <FaTools className="mr-3 text-xl" /> Manage Skills
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("manage-projects")}
            className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700 transition-colors cursor-pointer hover:scale-95 duration-750"
          >
            <FaProjectDiagram className="mr-3 text-xl" /> Manage Projects
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("manage-users")}
            className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700 transition-colors cursor-pointer hover:scale-95 duration-750"
          >
            <FaTools className="mr-3 text-xl" /> Manage Users
          </button>
        </li>
      </ul>
      <button
        onClick={() => signOut({ callbackUrl: "/sign-in" })}
        className="mt-15  bg-red-500 text-white px-4 py-2 flex items-center  gap-2 justify-center cursor-pointer hover:scale-95 duration-750"
      >
        <IoIosLogOut /> <p>Log Out</p>
      </button>
    </nav>
  );
}
