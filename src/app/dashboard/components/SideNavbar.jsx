import Link from "next/link";
import React from "react";
import { FaHome, FaProjectDiagram, FaTools } from "react-icons/fa";

export default function SideNavbar({ setActiveSection }) {
  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col py-8 shadow-lg z-50">
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
            className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            <FaHome className="mr-3 text-xl" /> Public Portfolio
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("manage-skills")}
            className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            <FaTools className="mr-3 text-xl" /> Manage Skills
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("manage-projects")}
            className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            <FaProjectDiagram className="mr-3 text-xl" /> Manage Projects
          </button>
        </li>
      </ul>
    </nav>
  );
}
