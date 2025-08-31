"use client";

import TypingTextEffect from "../components/TypingTextEffect";
import Image from "next/image";
import HeroBg from "../components/HeroBg";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ user }) => {
  const texts = ["Web Developer", "UI/UX Designer", "Tech Enthusiast"];
  const container = useRef(null);

  useGSAP(
    () => {
      // Enhanced text animation with 3D effect and glow
      gsap.to(".herotextcontent", {
        x: -500,
        rotationY: -30,
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: ".herotextcontent",
          start: "top 10%",
          end: "bottom 60%",
          scrub: 3.5,
          markers: false, // Disable markers for production
        },
        ease: "power3.inOut",
      });

      // Enhanced image animation with 3D perspective and glow
      gsap.to(".heroimagecontent", {
        x: 400,
        rotationY: 30,
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        scrollTrigger: {
          trigger: ".heroimagecontent",
          start: "top 10%",
          end: "bottom 60%",
          scrub: 3.5,
          markers: false,
        },
        ease: "power3.inOut",
      });

      // Animate the grid background for a more dynamic feel
      gsap.to(".grid-bg", {
        backgroundPosition: "40px 40px",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Holographic floating elements animation
      gsap.to(".float-element", {
        y: -20,
        rotation: 5,
        opacity: 0.7,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: "sine.inOut",
      });

      // Initial entrance animations
      const tl = gsap.timeline();
      tl.from(".hero-heading", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        .from(
          ".typing-text",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          ".hero-buttons",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          ".tech-stack",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .from(
          ".hero-image",
          {
            scale: 0.8,
            rotationY: -180,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
    },
    { scope: container }
  );

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={container}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black/70 text-white font-sans"
    >
      <HeroBg />

      {/* Enhanced Futuristic Grid Background */}
      <div className="grid-bg absolute inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Animated Glowing Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full z-0 opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="0.5"
              className="animate-pulse"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Holographic particles/effects */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`float-element absolute w-${i + 2} h-${
              i + 2
            } rounded-full bg-cyan-500/10 blur-xl`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          ></div>
        ))}
        {[...Array(5)].map((_, i) => (
          <div
            key={i + 5}
            className={`float-element absolute w-${i + 2} h-${
              i + 2
            } rounded-full bg-purple-500/10 blur-xl`}
            style={{
              top: `${15 + i * 12}%`,
              right: `${5 + i * 10}%`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-20">
        <div className="grid lg:grid-cols-2 gap-5 md:gap-10 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="herotextcontent text-center lg:text-left order-2 lg:order-1">
            <div className="relative inline-block mb-2 md:mb-4 lg:mb-6">
              <h1 className="hero-heading text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-100 leading-tight max-w-full font-cinzel">
                Hi, I&apos;m{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,#052E16 1%,#18FFFF 55%,#052E16 99%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  ZISAN
                </span>
              </h1>
            </div>

            <div className="typing-text text-xl sm:text-2xl md:text-2xl 2xl:text-3xl font-light text-gray-400 mb-2 2xl:mb-6 h-8 sm:h-10 font-cinzel">
              <span className="text-blue-400">&gt; </span>
              <TypingTextEffect texts={texts} />
              <span className="animate-pulse-cursor text-blue-400">_</span>
            </div>

            <p className="hero-description hidden md:block text-base sm:text-lg text-gray-400 mb-8 sm:mb-5 max-w-xl mx-auto lg:mx-0 leading-relaxed font-cinzel">
              I craft <span className="">cutting-edge digital experiences</span>{" "}
              at the intersection of design and technology. Specializing in{" "}
              <span className="">immersive interfaces</span> and{" "}
              <span className="">high-performance applications</span>.
            </p>

            <div className="hero-buttons flex flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group cursor-pointer relative border border-cyan-400 bg-gradient-to-b from-[#052E16] via-[#18FFFF] to-[#052E16] px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 text-[10px] sm:text-[12px] font-mono overflow-hidden group"
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
                className="cursor-pointer relative border-2 border-cyan-400 text-cyan-400 hover:bg-transparent px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-[10px] sm:text-[12px] font-mono group overflow-hidden"
              >
                <span
                  className="relative z-10 hover:text-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,#052E16 1%,#18FFFF 55%,#052E16 99%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Quick Contact
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Tech Stack Indicators */}
            <div className="tech-stack mt-12 hidden md:flex flex-wrap justify-center lg:justify-start gap-3">
              {["React", "framer-motion", "Next.js", "Node.js", "Mongodb"].map(
                (tech, index) => (
                  <div
                    key={tech}
                    className={`tech-item px-3 py-1.5 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 text-xs font-mono text-gray-300 hover:text-blue-400 transition-colors delay-${
                      index * 100
                    }`}
                  >
                    {tech}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Holographic Profile Interface */}
          <div className="heroimagecontent test flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="hero-image relative w-64 h-64 sm:w-80 sm:h-80 md:w-110 md:h-110 2xl:w-130 2xl:h-130 rounded-xl overflow-hidden group border-amber-100 border-b-4">
              {/* Holographic Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-500"></div>

              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Scan Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px)] bg-[length:100% 3px] opacity-30"></div>

              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={
                    user.length !== 0 ? user[0].mainImage : "/placeholder.svg"
                  }
                  alt="Profile Image"
                  fill // layout="fill" এর পরিবর্তে
                  style={{ objectFit: "cover" }} // objectFit এর পরিবর্তে
                  className="w-full h-full transition-all duration-500 transform group-hover:scale-105"
                />

                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.1) 0%,rgba(168,85,247,0.1) 100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-500/10 blur-xl animate-float-slow"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-purple-500/10 blur-xl animate-float-slower"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cyberpunk-inspired Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="cursor-pointer absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-blue-400 transition-colors duration-300 group z-40"
      >
        <div className="flex flex-col items-center">
          <div className="relative w-8 h-12 border-2 border-gray-700 rounded-full group-hover:border-blue-400 transition-colors duration-300 flex justify-center">
            <div className="absolute top-2 w-1 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          </div>
          <span className="mt-2 text-xs font-mono tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
            SCROLL
          </span>
        </div>
      </button>

      {/* Advanced Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-cursor {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes binaryRain {
          from {
            transform: translateY(-100vh);
          }
          to {
            transform: translateY(100vh);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(-15px);
          }
        }
        @keyframes float-slower {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(10px) translateX(10px);
          }
        }
        @keyframes hologram-pulse {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.1;
          }
        }
        @keyframes grid-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-pulse-cursor {
          animation: pulse-cursor 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 12s ease-in-out infinite;
        }
        .hologram-effect {
          animation: hologram-pulse 3s ease-in-out infinite;
        }
        .grid-move {
          animation: grid-move 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
