"use client";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 dark:bg-black/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      {/* Futuristic glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative z-10">
        <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
          <span className="text-cyan-400 dark:text-cyan-400 font-mono">
            &lt;
          </span>
          DevZisan
          <span className="text-pink-400 dark:text-pink-400 font-mono">
            /&gt;
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 xl:space-x-12 ">
          {["home", "about", "skills", "projects", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="relative text-cyan-300 dark:text-cyan-300 hover:text-white dark:hover:text-white transition-all duration-300 capitalize text-sm xl:text-base font-mono group cursor-pointer"
            >
              <span className="relative z-10">{item}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 cursor-pointer rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 dark:border-cyan-400/30 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 group"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <FaSun className="text-yellow-400 text-lg group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <FaMoon className="text-purple-400 text-lg group-hover:rotate-12 transition-transform duration-500" />
            )}
          </button>

          {/* Social Links */}
          <div className="flex space-x-3 cursor-pointer">
            {[
              {
                icon: FaGithub,
                link: "https://github.com/abubakersiddeak",
                color: "hover:text-cyan-400",
              },
              {
                icon: FaLinkedin,
                link: "https://www.linkedin.com/in/abubaker-siddik-zisan/",
                color: "hover:text-purple-400",
              },
              {
                icon: FaFacebook,
                link: "https://www.facebook.com/abubakar.siddeak",
                color: "hover:text-blue-500",
              },
            ].map(({ icon: Icon, color, link }, index) => (
              <a
                key={index}
                href={link}
                className={`text-gray-300 dark:text-gray-300 ${color} transition-all duration-300 transform hover:scale-110 hover:rotate-12`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center space-x-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 dark:border-cyan-400/30 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <FaSun className="text-yellow-400 text-base" />
            ) : (
              <FaMoon className="text-purple-400 text-base" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-cyan-300 dark:text-cyan-300 text-xl sm:text-2xl hover:text-white transition-colors duration-300"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 dark:bg-black/95 backdrop-blur-xl border-t border-cyan-500/30">
          <nav className="flex flex-col p-4 sm:p-6 space-y-4">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-cyan-300 dark:text-cyan-300 hover:text-white dark:hover:text-white transition-colors duration-300 capitalize text-left text-base sm:text-lg font-mono"
              >
                {item}
              </button>
            ))}
            <div className="flex space-x-4 pt-4 border-t border-cyan-500/30">
              {[
                {
                  icon: FaGithub,
                  link: "https://github.com/abubakersiddeak",
                  color: "hover:text-cyan-400",
                },
                {
                  icon: FaLinkedin,
                  link: "https://www.linkedin.com/in/abubaker-siddik-zisan/",
                  color: "hover:text-purple-400",
                },
                {
                  icon: FaFacebook,
                  link: "https://www.facebook.com/abubakar.siddeak",
                  color: "hover:text-blue-500",
                },
              ].map(({ icon: Icon, color, link }, index) => (
                <a
                  key={index}
                  href={link}
                  className={`text-gray-300 dark:text-gray-300 ${color} transition-colors duration-300`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
