"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const footerLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <footer className="relative  border-t border-neutral-900 py-12 sm:py-16 md:py-20">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-light text-white mb-3 tracking-tight">
              &lt;DevZisan/&gt;
            </h3>
            <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-xs mx-auto md:mx-0">
              Creating elegant digital experiences through clean code and
              thoughtful design.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <h4 className="text-xs text-neutral-600 uppercase tracking-wider mb-4 font-light">
              Navigate
            </h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer font-light"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-xs text-neutral-600 uppercase tracking-wider mb-4 font-light">
              Contact
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:abubakersiddeak@gmail.com"
                className="block text-sm text-neutral-400 hover:text-white transition-colors font-light"
              >
                abubakersiddeak@gmail.com
              </a>
              <a
                href="tel:+8801560045388"
                className="block text-sm text-neutral-400 hover:text-white transition-colors font-light"
              >
                +880 1560045388
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-neutral-900">
          {/* Copyright */}
          <p className="text-xs text-neutral-600 font-light text-center sm:text-left">
            © {currentYear} Abubakar Siddik Zisan. All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer uppercase tracking-wider font-light"
          >
            <span>Back to Top</span>
            <svg
              className="w-3 h-3 transition-transform group-hover:-translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
