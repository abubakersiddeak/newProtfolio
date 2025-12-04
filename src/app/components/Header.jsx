"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaFileDownload,
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
  const [activeSection, setActiveSection] = useState("home");

  // Optimized scroll handler with throttling
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 50);
        timeoutId = null;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = ["home", "about", "projects", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  }, []);

  // Memoized navigation items
  const navItems = useMemo(
    () => [
      { id: "home", name: "Home", icon: TiHomeOutline },
      { id: "about", name: "About", icon: FaRegUser },
      { id: "projects", name: "Projects", icon: MdAddTask },
      { id: "contact", name: "Contact", icon: FiSend },
    ],
    []
  );

  // Memoized social links
  const socialLinks = useMemo(() => {
    if (!user || user.length === 0) return null;
    return [
      {
        icon: FaGithub,
        link: user[0]?.socialLinks?.github,
        label: "GitHub",
      },
      {
        icon: FaLinkedin,
        link: user[0]?.socialLinks?.linkedin,
        label: "LinkedIn",
      },
      {
        icon: FaFacebook,
        link: user[0]?.socialLinks?.facebook,
        label: "Facebook",
      },
    ].filter((link) => link.link);
  }, [user]);

  // Resume download handler
  const handleResumeDownload = () => {
    const resumeUrl = user?.[0]?.resume || "/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800/50 shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        {/* Simplified background grid */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-4 flex justify-between items-center relative z-10">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-xl sm:text-2xl font-light cursor-pointer flex items-center gap-2 group"
            onClick={() => scrollToSection("home")}
            aria-label="Scroll to home"
          >
            <span className="text-white tracking-tight">&lt;DevZisan/&gt;</span>
            <span className="w-1.5 h-1.5 bg-white rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex" aria-label="Main navigation">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <motion.button
                      onHoverStart={() => setHoveredNav(item.id)}
                      onHoverEnd={() => setHoveredNav(null)}
                      onClick={() => scrollToSection(item.id)}
                      className="relative px-4 py-2 rounded group cursor-pointer"
                      aria-label={`Navigate to ${item.name}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        className={`relative z-10 flex items-center gap-2 text-sm font-light tracking-wide transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-neutral-400 group-hover:text-white"
                        }`}
                      >
                        <span className="font-normal">{item.name}</span>
                      </span>

                      {/* Active underline */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute bottom-0 left-0 right-0 h-px bg-white"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Resume Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResumeDownload}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-light text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded transition-all duration-300"
              aria-label="Download Resume"
            >
              <FaFileDownload className="text-base" />
              <span className="hidden xl:inline">Resume</span>
            </motion.button>

            {/* Social Links */}
            {socialLinks && (
              <div className="flex items-center space-x-3 pl-6 border-l border-neutral-800">
                {socialLinks.map(({ icon: Icon, link, label }) => (
                  <motion.a
                    key={link}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-500 hover:text-white transition-colors duration-300"
                    aria-label={label}
                  >
                    <Icon className="text-base" />
                  </motion.a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-neutral-400 hover:text-white p-2 rounded border border-neutral-800 hover:border-neutral-700 transition-colors relative z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu - Outside of header for proper z-index stacking */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 h-full w-[280px] sm:w-[320px] bg-neutral-950 border-l border-neutral-800/50 shadow-2xl z-[70]"
            >
              <nav className="flex flex-col p-6 space-y-2 h-full overflow-y-auto">
                {/* Close button */}
                <div className="flex justify-end mb-6">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded hover:bg-neutral-900 transition-colors"
                    aria-label="Close menu"
                  >
                    <FaTimes className="text-neutral-400" size={18} />
                  </motion.button>
                </div>

                {/* Navigation items */}
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`cursor-pointer text-left transition-all duration-300 text-base font-light py-4 px-4 rounded flex items-center gap-3 group ${
                        isActive
                          ? "text-white bg-neutral-900/50 border-l-2 border-white"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900/30 border-l-2 border-transparent"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="flex-1">{item.name}</span>
                      {isActive && <span className="text-xs">●</span>}
                    </motion.button>
                  );
                })}

                {/* Resume Download - Mobile */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleResumeDownload}
                  className="cursor-pointer mt-4 flex items-center justify-center gap-2 py-3 px-4 text-sm font-light text-white bg-neutral-900/50 border border-neutral-700 hover:border-neutral-500 rounded transition-all duration-300"
                  aria-label="Download Resume"
                >
                  <FaFileDownload />
                  <span>Download Resume</span>
                </motion.button>

                {/* Social links section */}
                <div className="pt-6 mt-auto border-t border-neutral-800/50">
                  <h4 className="text-neutral-500 text-xs uppercase tracking-wider mb-4 font-light">
                    Connect
                  </h4>
                  <div className="flex gap-3">
                    {socialLinks
                      ? socialLinks.map(({ icon: Icon, link, label }) => (
                          <motion.a
                            key={link}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all duration-300"
                            aria-label={label}
                          >
                            <Icon size={18} />
                          </motion.a>
                        ))
                      : [...Array(3)].map((_, idx) => (
                          <div
                            key={idx}
                            className="w-11 h-11 rounded bg-neutral-900/50 border border-neutral-800 animate-pulse"
                          />
                        ))}
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
