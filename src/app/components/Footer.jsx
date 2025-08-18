"use client";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" py-8 font-mono  sm:py-24 z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              <span className="text-indigo-400">Dev</span>
              Zisan
            </h3>
            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Creating beautiful, functional, and user-friendly web
              applications.
            </p>
            {/* <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4 z-50">
              <a
                href="https://github.com/abubakersiddeak"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <FaGithub size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/abubaker-siddik-zisan/"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <FaLinkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.facebook.com/abubakar.siddeak"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <FaFacebook size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          {/* <div className="text-center sm:text-left">
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
                      className="text-gray-400 cursor-pointer hover:text-indigo-400 transition-colors text-sm sm:text-base"
                    >
                      {link}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div> */}

          {/* Contact Info */}
          {/* <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Get In Touch
            </h4>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-gray-400 text-sm sm:text-base">
                abubakersiddeak@gmail.com
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                +880 1560045388
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                +880 1790884776
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                Dhaka, Bangladesh
              </p>
            </div>
          </div> */}
        </div>

        <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center text-sm sm:text-base">
            © {currentYear} Abubakar Siddik Zisan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
