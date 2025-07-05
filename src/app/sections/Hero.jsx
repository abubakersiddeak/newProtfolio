"use client";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const texts = [
    "Quantum Developer",
    "AI Architect",
    "Cyber Engineer",
    "Digital Innovator",
  ];

  useEffect(() => {
    if (isTyping) {
      const currentText = texts[currentIndex];
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, currentIndex, isTyping, texts]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Futuristic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black">
        {/* Matrix-style grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in-up order-2 lg:order-1">
            <div className="mb-4 text-cyan-400 font-mono text-sm sm:text-base">
              &gt; Initializing neural interface...
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4 sm:mb-6 leading-tight font-mono">
              ALEX_MATRIX
            </h1>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 dark:text-gray-300 mb-6 sm:mb-8 h-8 sm:h-10 md:h-12 font-mono">
              <span className="text-cyan-400 dark:text-cyan-400">&gt; </span>
              <span className="text-purple-400 dark:text-purple-400">
                {displayText}
              </span>
              <span className="animate-pulse text-cyan-400">█</span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0 font-mono">
              Crafting next-generation digital experiences through quantum
              computing, AI integration, and cybernetic design principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 text-sm sm:text-base font-mono overflow-hidden group"
              >
                <span className="relative z-10">EXECUTE_PORTFOLIO</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="relative border-2 border-cyan-400 dark:border-cyan-400 text-cyan-400 dark:text-cyan-400 hover:bg-cyan-400/10 dark:hover:bg-cyan-400/10 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base font-mono group overflow-hidden"
              >
                <span className="relative z-10">CONNECT_NEURAL_LINK</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Futuristic Photo Frame */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up order-1 lg:order-2">
            <div className="relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                {/* Holographic outer ring */}
                <div
                  className="absolute -inset-8 border-2 border-cyan-400/30 rounded-full animate-spin"
                  style={{ animationDuration: "20s" }}
                >
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 translate-y-1"></div>
                  <div className="absolute left-0 top-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-x-1 -translate-y-1/2"></div>
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full transform translate-x-1 -translate-y-1/2"></div>
                </div>

                {/* Middle ring */}
                <div
                  className="absolute -inset-4 border border-purple-400/50 rounded-full animate-spin"
                  style={{
                    animationDuration: "15s",
                    animationDirection: "reverse",
                  }}
                >
                  <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                </div>

                {/* Glowing aura */}
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>

                {/* Main frame */}
                <div className="relative w-full h-full">
                  {/* Hexagonal frame effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl backdrop-blur-sm border border-cyan-400/50 shadow-2xl shadow-cyan-500/25">
                    {/* Corner tech details */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-pink-400"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
                  </div>

                  {/* Photo container */}
                  <div className="absolute inset-3 rounded-xl overflow-hidden border border-cyan-400/30">
                    <img
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop"
                      alt="Alex Matrix - Quantum Developer"
                      className="w-full h-full object-cover"
                    />
                    {/* Holographic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 via-transparent to-purple-900/40"></div>

                    {/* Scanning lines */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-2 animate-pulse"
                      style={{
                        animation: "scan 3s linear infinite",
                        background:
                          "linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.3), transparent)",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black px-3 py-1 rounded-full text-xs font-mono font-bold shadow-lg animate-pulse">
                  Available For Work
                </div>

                {/* Data streams */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-cyan-400 to-transparent rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 dark:text-cyan-400 animate-bounce group"
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
          <FaChevronDown
            className="mt-2 group-hover:text-purple-400 transition-colors duration-300"
            size={16}
          />
        </div>
      </button>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(400%);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
