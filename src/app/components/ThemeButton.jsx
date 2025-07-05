"use client";
import React from "react";
import { IoMoonSharp } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import UseTheme from "./UseTheme";

export default function ThemeButton() {
  const { theme, setTheme } = UseTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 dark:border-cyan-400/30 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <IoSunnyOutline size={20} className="text-yellow-400" />
      ) : (
        <IoMoonSharp size={20} className="text-white" />
      )}
    </button>
  );
}
