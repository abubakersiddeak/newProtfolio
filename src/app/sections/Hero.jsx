"use client";

import { useRef, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lazy load heavy components
const TypingTextEffect = dynamic(
  () => import("../components/TypingTextEffect"),
  {
    ssr: false,
    loading: () => <span className="text-gray-400">Developer</span>,
  }
);

const HeroBg = dynamic(() => import("../components/HeroBg"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ user }) => {
  const texts = useMemo(
    () => ["Full-Stack Developer", "UI/UX Designer", "Creative Technologist"],
    []
  );
  const container = useRef(null);

  // Memoized tech stack
  const techStack = useMemo(
    () => ["React", "Next.js", "Node.js", "TypeScript", "MongoDB"],
    []
  );

  // Optimized GSAP animations
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to(".hero-text-content", {
          x: -150,
          opacity: 0.3,
          scrollTrigger: {
            trigger: ".hero-text-content",
            start: "top top",
            end: "bottom 50%",
            scrub: 1.2,
          },
          ease: "power1.out",
        });

        gsap.to(".hero-image-content", {
          x: 150,
          opacity: 0.3,
          scrollTrigger: {
            trigger: ".hero-image-content",
            start: "top top",
            end: "bottom 50%",
            scrub: 1.2,
          },
          ease: "power1.out",
        });
      });

      // Entrance animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".fade-in-1", { y: 30, opacity: 0, duration: 0.8 })
        .from(".fade-in-2", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".fade-in-3", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".fade-in-4", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          ".fade-in-5",
          { opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .from(".hero-image", { opacity: 0, scale: 0.98, duration: 1 }, "-=0.8");

      return () => mm.revert();
    },
    { scope: container }
  );

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Safe user data access
  const userImage = user?.[0]?.mainImage || "/placeholder.svg";
  const userName = user?.[0]?.name || "ZISAN";

  return (
    <section
      id="home"
      ref={container}
      className="relative min-h-screen flex items-center justify-center overflow-hidden  text-white"
    >
      {/* Background Components */}
      <Suspense fallback={null}>
        <HeroBg />
      </Suspense>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100px_100px]" />
      </div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="hero-text-content lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-7 md:space-y-8 order-2 lg:order-1">
            {/* Label */}
            <div className="fade-in-1 inline-flex items-center gap-2 mx-auto lg:mx-0">
              <div className="w-8 sm:w-10 md:w-12 h-px bg-gradient-to-r from-transparent to-neutral-700" />
              <span className="text-[10px] sm:text-xs text-neutral-500 tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light whitespace-nowrap">
                Portfolio 2025
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="fade-in-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.9] tracking-tight">
                {userName}
              </h1>

              {/* Typing Effect */}
              <div className="fade-in-3 flex items-center justify-center lg:justify-start text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-400 font-light min-h-[28px] sm:min-h-[32px] md:min-h-[36px] tracking-tight">
                <Suspense fallback={<span>Developer</span>}>
                  <TypingTextEffect texts={texts} />
                </Suspense>
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 ml-1 sm:ml-2 bg-neutral-600 animate-blink" />
              </div>
            </div>

            {/* Description */}
            <p className="fade-in-4 text-sm sm:text-base md:text-lg text-neutral-400 max-w-md sm:max-w-lg md:max-w-xl mx-auto lg:mx-0 leading-relaxed font-light px-4 sm:px-0">
              Crafting exceptional digital experiences through thoughtful design
              and clean code. Focused on creating scalable, user-centered
              solutions that make a difference.
            </p>

            {/* CTA Buttons */}
            <div className="fade-in-5 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 px-4 sm:px-0">
              <button
                onClick={() => scrollToSection("projects")}
                className="group cursor-pointer relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-black text-xs sm:text-sm font-medium tracking-wide overflow-hidden transition-all duration-500 hover:bg-neutral-100 w-full sm:w-auto"
                aria-label="View my projects"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  View Projects
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group cursor-pointer px-6 sm:px-8 py-3 sm:py-4 border border-neutral-700 text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-500 hover:border-neutral-500 hover:bg-neutral-900/50 w-full sm:w-auto"
                aria-label="Contact me"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  Get In Touch
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Tech Stack */}
            <div className="fade-in-5 hidden sm:block pt-6 md:pt-8 border-t border-neutral-800/50 mx-4 lg:mx-0">
              <p className="text-[10px] sm:text-xs text-neutral-600 tracking-widest uppercase mb-3 sm:mb-4 font-light">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
                {techStack.map((tech, index) => (
                  <span
                    key={tech}
                    className="text-xs sm:text-sm text-neutral-500 font-light tracking-wide hover:text-neutral-300 transition-colors cursor-default"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack - Mobile Only */}
            <div className="fade-in-5 sm:hidden flex flex-wrap justify-center gap-2 pt-4 px-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-[10px] text-neutral-500 bg-neutral-900/50 border border-neutral-800 rounded-full font-light tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="hero-image-content lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="hero-image relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-full lg:h-[400px] xl:h-[500px] 2xl:h-[600px] group">
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                {/* Image */}
                <Image
                  src={userImage}
                  alt={`${userName}'s profile picture`}
                  fill
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, (max-width: 1280px) 400px, 600px"
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  quality={90}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-1000" />

                {/* Border Frame */}
                <div className="absolute inset-0 border border-neutral-800 group-hover:border-neutral-700 transition-colors duration-1000" />
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-white/20 -translate-x-1.5 -translate-y-1.5 sm:-translate-x-2 sm:-translate-y-2" />
              <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-white/20 translate-x-1.5 translate-y-1.5 sm:translate-x-2 sm:translate-y-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="cursor-pointer absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 group z-20 hidden md:flex flex-col items-center gap-3 sm:gap-4"
        aria-label="Scroll to next section"
      >
        <div className="relative">
          <div className="w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-neutral-700 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-6 sm:h-8 bg-gradient-to-b from-neutral-500 to-transparent animate-scroll-down" />
        </div>
        <span className="text-[8px] sm:text-[9px] text-neutral-600 font-light tracking-[0.25em] sm:tracking-[0.3em] uppercase group-hover:text-neutral-400 transition-colors">
          Scroll
        </span>
      </button>

      {/* Optimized Animations */}
      <style jsx>{`
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateX(-50%) translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(40px);
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .animate-scroll-down {
          animation: scroll-down 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
