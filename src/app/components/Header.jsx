"use client";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { MdAddTask } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { FiSend } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

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
    setIsMenuOpen(false);
  };

  // Unique navigation items with custom icons
  const navItems = [
    { id: "home", name: "Home", icon: <TiHomeOutline /> },
    { id: "about", name: "About", icon: <FaRegUser /> },

    { id: "projects", name: "Projects", icon: <MdAddTask /> },
    { id: "contact", name: "Connect", icon: <FiSend /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#0a0a12] backdrop-blur-3xl border-b border-[#4f46e5]/20 shadow-2xl shadow-[#4f46e5]/10"
          : "bg-transparent"
      }`}
    >
      {/* Cyberpunk-style animated grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative z-10">
        {/* Holographic logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl sm:text-3xl font-extrabold cursor-pointer flex-shrink-0"
          onClick={() => scrollToSection("home")}
          aria-label="Scroll to top"
        >
          <span
            className="text-transparent bg-clip-text bg-cyan-400 "
            style={{
              backgroundImage:
                "linear-gradient(to bottom,#052E16 1%,#18FFFF 55%,#052E16 99%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            &lt;DevZisan/&gt;
          </span>
          <span className="inline-block w-2 h-2 ml-1 bg-cyan-400 rounded-full animate-pulse"></span>
        </motion.div>

        {/* Futuristic desktop navigation */}
        <nav className="hidden lg:flex">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <motion.button
                  onHoverStart={() => setHoveredNav(item.id)}
                  onHoverEnd={() => setHoveredNav(null)}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 rounded-lg group cursor-pointer"
                >
                  <span
                    className="relative z-10 flex items-center gap-2 text-cyan-400 group-hover:text-white transition-colors duration-300"
                    style={{
                      backgroundImage:
                        "linear-gradient(to bottom,#052E16 1%,#18FFFF 55%,#052E16 99%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <span className="text-white">{item.icon}</span>
                    {item.name}
                  </span>
                  {hoveredNav === item.id && (
                    <motion.div
                      layoutId="navHover"
                      className="absolute inset-0 bg-[#1e1e2e] rounded-lg border border-[#052E16] shadow-lg shadow-[#18FFFF]/20"
                      transition={{ type: "spring", bounce: 0.25 }}
                    />
                  )}
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links with holographic effect */}
        <div className="hidden lg:flex items-center space-x-6 flex-shrink-0">
          <div className="flex space-x-5">
            {user.length !== 0
              ? [
                  {
                    icon: FaGithub,
                    link: user[0].socialLinks.github,
                    color: "from-[#6e5494] to-[#c9510c]",
                  },
                  {
                    icon: FaLinkedin,
                    link: user[0].socialLinks.linkedin,
                    color: "from-[#0077b5] to-[#00a0dc]",
                  },
                  {
                    icon: FaFacebook,
                    link: user[0].socialLinks.facebook,
                    color: "from-[#1877f2] to-[#00b3ff]",
                  },
                ].map(({ icon: Icon, link, color }) => (
                  <motion.a
                    key={link}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2 rounded-full bg-[#1e1e2e] border border-[#3f3f46] shadow-sm hover:shadow-[0_0_15px_-3px_rgba(79,70,229,0.3)] transition-all duration-300"
                  >
                    <Icon
                      className="text-[#a1a1aa] hover:text-white"
                      size={18}
                    />
                    <span
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${color} opacity-0 hover:opacity-20 -z-10 transition-opacity duration-300`}
                    ></span>
                  </motion.a>
                ))
              : Array(3)
                  .fill("")
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 rounded-full bg-cyan-400 border border-[#3f3f46] animate-pulse"
                    />
                  ))}
          </div>
        </div>

        {/* Mobile menu button with cyberpunk style */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-[#a1a1aa] hover:text-white p-2 rounded-lg border border-[#3f3f46] bg-[#1e1e2e] relative overflow-hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          <span className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#ec4899] opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10"></span>
        </motion.button>
      </div>

      {/* Cyberpunk mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0a0a12] backdrop-blur-3xl border-t border-[#4f46e5]/20 shadow-2xl shadow-[#4f46e5]/10"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-[#a1a1aa] hover:text-white transition-colors duration-300 text-lg font-medium py-3 px-4 rounded-lg hover:bg-[#1e1e2e] flex items-center gap-3"
                >
                  <span className="text-[#4f46e5] text-xl">{item.icon}</span>
                  {item.name}
                  <span className="ml-auto text-[#4f46e5]">→</span>
                </motion.button>
              ))}

              <div className="pt-6 mt-4 border-t border-[#3f3f46]">
                <h4 className="text-[#a1a1aa] text-sm uppercase tracking-wider mb-4">
                  Connect
                </h4>
                <div className="flex space-x-6">
                  {user.length !== 0
                    ? [
                        {
                          icon: FaGithub,
                          link: user[0].socialLinks.github,
                          label: "GitHub",
                        },
                        {
                          icon: FaLinkedin,
                          link: user[0].socialLinks.linkedin,
                          label: "LinkedIn",
                        },
                        {
                          icon: FaFacebook,
                          link: user[0].socialLinks.facebook,
                          label: "Facebook",
                        },
                      ].map(({ icon: Icon, link, label }) => (
                        <motion.a
                          key={link}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full bg-[#1e1e2e] border border-[#3f3f46] text-[#a1a1aa] hover:text-white transition-colors duration-300"
                          aria-label={label}
                        >
                          <Icon size={20} />
                        </motion.a>
                      ))
                    : Array(3)
                        .fill("")
                        .map((_, idx) => (
                          <div
                            key={idx}
                            className="w-12 h-12 rounded-full bg-[#1e1e2e] border border-[#3f3f46] animate-pulse"
                          />
                        ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
