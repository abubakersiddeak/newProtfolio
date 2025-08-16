"use client";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
// import ThemeButton from "./ThemeButton"; // Uncomment if you use this

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
          : "bg-transparent "
      }`}
    >
      {/* Futuristic glow effect - Adjusted for subtlety */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-70"></div>

      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative z-10">
        {/* Logo */}
        <div
          className="text-xl sm:text-2xl font-extrabold text-cyan-400 cursor-pointer flex-shrink-0" /* flex-shrink-0 to prevent shrinking */
          onClick={() => scrollToSection("home")} // Make logo clickable to scroll to home
          aria-label="Scroll to top"
        >
          <span className="text-cyan-400 font-mono">&lt;</span>
          DevZisan
          <span className=" font-mono">/&gt;</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          {" "}
          {/* POSITIONING FOR PERFECT CENTER */}
          <ul className="flex space-x-8 xl:space-x-12">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="relative text-cyan-300 hover:text-white transition-all duration-300 capitalize text-sm xl:text-base font-mono group cursor-pointer"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xs"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions (Social Links) */}
        <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
          {" "}
          {/* flex-shrink-0 to prevent shrinking */}
          {/* Theme Toggle - Uncomment if ThemeButton is used */}
          {/* <ThemeButton /> */}
          <div className="flex space-x-3">
            {user.length !== 0
              ? [
                  {
                    icon: FaGithub,
                    link: [user[0].socialLinks.github],
                    color: "hover:text-cyan-400",
                    label: "GitHub profile",
                  },
                  {
                    icon: FaLinkedin,
                    link: [user[0].socialLinks.linkedin],
                    color: "hover:text-purple-400",
                    label: "LinkedIn profile",
                  },
                  {
                    icon: FaFacebook,
                    link: [user[0].socialLinks.facebook],
                    color: "hover:text-blue-500",
                    label: "Facebook profile",
                  },
                ].map(({ icon: Icon, color, link, label }) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-300 ${color} transition-all duration-300 transform hover:scale-110 hover:rotate-12`}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))
              : Array(3)
                  .fill("")
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full bg-gray-700 animate-pulse"
                    />
                  ))}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center space-x-3">
          {/* Mobile Theme Toggle - Uncomment if ThemeButton is used */}
          {/* <ThemeButton /> */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-cyan-300 text-xl sm:text-2xl hover:text-white transition-colors duration-300"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-cyan-500/30 animate-fade-in-down">
          <nav className="flex flex-col p-4 sm:p-6 space-y-4">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-cyan-300 hover:text-white transition-colors duration-300 capitalize text-left text-base sm:text-lg font-mono py-2"
              >
                {item}
              </button>
            ))}
            <div className="flex space-x-4 pt-4 border-t border-cyan-500/30">
              {user.length !== 0
                ? [
                    {
                      icon: FaGithub,
                      link: [user[0].socialLinks.github],
                      color: "hover:text-cyan-400",
                      label: "GitHub profile",
                    },
                    {
                      icon: FaLinkedin,
                      link: [user[0].socialLinks.linkedin],
                      color: "hover:text-purple-400",
                      label: "LinkedIn profile",
                    },
                    {
                      icon: FaFacebook,
                      link: [user[0].socialLinks.facebook],
                      color: "hover:text-blue-500",
                      label: "Facebook profile",
                    },
                  ].map(({ icon: Icon, color, link, label }) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-300 ${color} transition-colors duration-300`}
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </a>
                  ))
                : Array(3)
                    .fill("")
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full bg-gray-700 animate-pulse"
                      />
                    ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
