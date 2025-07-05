"use client";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              <span className="text-indigo-400 dark:text-indigo-400">Dev</span>
              Portfolio
            </h3>
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Creating beautiful, functional, and user-friendly web
              applications.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
              >
                <FaGithub size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
              >
                <FaLinkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
              >
                <FaTwitter size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors"
              >
                <FaEnvelope size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {["Home", "About", "Skills", "Projects", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const section = document.getElementById(
                          link.toLowerCase()
                        );
                        if (section) {
                          section.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="text-gray-400 hover:text-indigo-400 dark:hover:text-indigo-400 transition-colors text-sm sm:text-base"
                    >
                      {link}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Get In Touch
            </h4>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-gray-400 text-sm sm:text-base">
                john.doe@example.com
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                +1 (555) 123-4567
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                San Francisco, CA
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center text-sm sm:text-base">
            © {currentYear} John Doe. Made with{" "}
            <FaHeart className="text-red-500 mx-1" size={14} />
            and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
