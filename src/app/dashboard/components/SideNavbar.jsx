"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";

export default function SideNavbar({
  activeSection,
  setActiveSection,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const navItems = [
    {
      id: "portfolio",
      label: "Overview",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      id: "manage-projects",
      label: "Projects",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "manage-skills",
      label: "Skills",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      id: "manage-users",
      label: "User",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-neutral-900 border-r border-neutral-800 z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-light tracking-tight text-white">
              &lt;DevZisan/&gt;
            </h2>
            <p className="text-xs text-neutral-500 mt-1">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                  activeSection === item.id
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <span
                  className={
                    activeSection === item.id
                      ? "text-black"
                      : "text-neutral-500 group-hover:text-white"
                  }
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-neutral-800">
            <button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/10 border border-red-900/50 text-red-400 hover:bg-red-600/20 hover:border-red-800 transition-all duration-300 cursor-pointer group"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
            <p className="text-xs text-neutral-600 mt-3 text-center">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-neutral-900 border-r border-neutral-800 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Logo with Close Button */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-light tracking-tight text-white">
                &lt;DevZisan/&gt;
              </h2>
              <p className="text-xs text-neutral-500 mt-1">Admin Dashboard</p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-neutral-800 rounded transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <svg
                className="w-5 h-5 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group ${
                  activeSection === item.id
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                <span
                  className={
                    activeSection === item.id
                      ? "text-black"
                      : "text-neutral-500 group-hover:text-white"
                  }
                >
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-neutral-800">
            <button
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/10 border border-red-900/50 text-red-400 hover:bg-red-600/20 hover:border-red-800 transition-all duration-300 cursor-pointer group"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
            <p className="text-xs text-neutral-600 mt-3 text-center">
              Version 1.0.0
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
