"use client";

import { FaChevronDown } from "react-icons/fa";
import TypingTextEffect from "../components/TypingTextEffect";
import Image from "next/image";

const Hero = ({ user }) => {
  const texts = ["Web Developer", "UI/UX Designer"];
  console.log(user);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen  flex items-center justify-center relative overflow-hidden"
    >
      {/* Futuristic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br bg-black/75">
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

      <div className="relative mt-0 z-10 px-2 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid  lg:grid-cols-2 gap-14 lg:gap-16 items-center ">
          {/* Text Content */}
          <div className="text-center  lg:text-left animate-fade-in-up order-2 lg:order-1">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold  bg-clip-text bg-gradient-to-r text-white mb-1 sm:mb-6 leading-tight font-mono">
              {user.length !== 0 ? user[0].name?.toUpperCase() : "loading..."}
            </h1>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-2 sm:mb-8 h-8 sm:h-10 md:h-12 font-mono">
              <span className="text-cyan-400">&gt; </span>
              <TypingTextEffect texts={texts} />
              <span className="animate-pulse text-cyan-400">█</span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-3 sm:mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0 font-mono">
              Crafting immersive, visually stunning, and high-performance web
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-6 sm:px-0">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group cursor-pointer relative bg-gradient-to-r bg-cyan-400  px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 text-sm sm:text-base font-mono overflow-hidden group"
              >
                <div className="absolute bg-amber-50 h-full w-full left-5 top-0 z-10 group-hover:translate-x-[100%] duration-750"></div>
                <span className="relative z-10 text-black">View Projects</span>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="cursor-pointer relative border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base font-mono group overflow-hidden"
              >
                <span className="relative z-10">Quick Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Futuristic Photo Frame */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up order-1 lg:order-2">
            <div className="relative">
              <div className="relative w-50 h-50 sm:w-80 sm:h-80 md:w-96 md:h-96">
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
                {/* <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div> */}

                {/* Main frame */}
                <div className="relative w-full h-full">
                  {/* Hexagonal frame effect */}
                  <div className="absolute inset-0  rounded-2xl backdrop-blur-sm border border-cyan-400/50 shadow-2xl shadow-cyan-500/25">
                    {/* Corner tech details */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-purple-400"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-pink-400"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
                  </div>

                  {/* Photo container */}
                  <div className="absolute inset-3 overflow-hidden border border-cyan-400/30">
                    <Image
                      src={
                        user.length !== 0
                          ? user[0].mainImage
                          : "/placeholder.svg"
                      }
                      alt="Image loading..."
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Status indicators */}
                <div className="absolute -top-0 -right-0 bg-green-600  text-white px-3 py-1 rounded-sm rounded-tr-2xl text-xs font-mono font-extrabold shadow-lg ">
                  Available For Work
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="cursor-pointer mt-2 absolute bottom-0 sm:bottom-5 left-1/2 transform -translate-x-1/2 text-cyan-400 animate-bounce group"
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt- animate-pulse"></div>
          </div>
          <FaChevronDown
            className="mt-2 group-hover:text-purple-400 transition-colors duration-300"
            size={12}
          />
        </div>
      </button>
    </section>
  );
};

export default Hero;
