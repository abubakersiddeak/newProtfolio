"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

// Loading messages that cycle through
const LOADING_MESSAGES = [
  "Initializing Creative Systems...",
  "Loading Design Assets...",
  "Compiling Awesomeness...",
  "Preparing Experience...",
  "Almost Ready...",
];

// Particle configuration
const PARTICLE_COUNT = 20;

export default function Loading() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const particleTimelineRef = useRef(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [progress, setProgress] = useState(0);

  // Generate random particles
  const generateParticles = useCallback(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    setParticles(generateParticles());
  }, [generateParticles]);

  // Message cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ctx = gsap.context(() => {
      if (!mediaQuery.matches) {
        // Main timeline
        timelineRef.current = gsap.timeline({ repeat: -1 });

        // Outer ring rotation
        timelineRef.current.to(
          ".ring-outer",
          {
            rotate: 360,
            duration: 20,
            ease: "none",
          },
          0
        );

        // Inner ring counter-rotation
        timelineRef.current.to(
          ".ring-inner",
          {
            rotate: -360,
            duration: 15,
            ease: "none",
          },
          0
        );

        // Middle ring with different speed
        timelineRef.current.to(
          ".ring-middle",
          {
            rotate: 360,
            duration: 25,
            ease: "none",
          },
          0
        );

        // Core pulse animation
        gsap.to(".core-pulse", {
          scale: 1.08,
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Core glow animation
        gsap.to(".core-glow", {
          opacity: 0.6,
          scale: 1.2,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Orbital dots
        gsap.to(".orbital-dot", {
          rotate: 360,
          duration: 3,
          ease: "none",
          repeat: -1,
          stagger: {
            each: 0.5,
            from: "start",
          },
        });

        // Line beam staggered animation
        gsap.fromTo(
          ".line-beam",
          { scaleX: 0, opacity: 0.5 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: {
              each: 0.15,
              repeat: -1,
              yoyo: true,
            },
          }
        );

        // Floating particles
        particleTimelineRef.current = gsap.timeline({ repeat: -1 });
        gsap.utils.toArray(".particle").forEach((particle) => {
          gsap.to(particle, {
            y: "-=30",
            x: `+=${Math.random() * 20 - 10}`,
            opacity: 0,
            duration: parseFloat(particle.dataset.duration || "3"),
            delay: parseFloat(particle.dataset.delay || "0"),
            ease: "power1.out",
            repeat: -1,
            repeatRefresh: true,
          });
        });

        // Entry animation
        gsap.from(".loader-content", {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (timelineRef.current) timelineRef.current.kill();
      if (particleTimelineRef.current) particleTimelineRef.current.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle absolute rounded-full bg-sky-400/60"
            data-duration={particle.duration}
            data-delay={particle.delay}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div className="loader-content relative flex flex-col items-center">
        {/* Loader container */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* Outer decorative ring */}
          <div className="ring-outer absolute inset-0 rounded-full border-2 border-sky-500/20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-sky-400 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${
                    i * 45
                  }deg) translateY(-96px) translateX(-50%)`,
                }}
              />
            ))}
          </div>

          {/* Middle ring with gradient */}
          <div className="ring-middle absolute inset-4 rounded-full">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="1"
                strokeDasharray="8 4"
                opacity="0.6"
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Inner ring */}
          <div className="ring-inner absolute inset-8 rounded-full border border-violet-500/30 border-dashed" />

          {/* Orbital elements */}
          {[0, 120, 240].map((rotation, i) => (
            <div
              key={i}
              className="orbital-dot absolute inset-6"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: i % 2 === 0 ? "#38bdf8" : "#a855f7",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "#38bdf8" : "#a855f7"}`,
                }}
              />
            </div>
          ))}

          {/* Core glow effect */}
          <div className="core-glow absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-sky-500/20 to-violet-500/20 blur-xl" />

          {/* Central core */}
          <div className="core-pulse relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl shadow-sky-500/20 border border-zinc-700/50">
            {/* Inner spinning element */}
            <div className="absolute w-14 h-14 sm:w-18 sm:h-18 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 transform rotate-45 animate-spin-slow" />

            {/* Glowing line beams */}
            {[0, 45, 90, 135].map((rotation, i) => (
              <div
                key={i}
                className="line-beam absolute h-0.5 w-1/2 origin-left"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg, #38bdf8, transparent)"
                      : "linear-gradient(90deg, #a855f7, transparent)",
                }}
              />
            ))}

            {/* Central logo */}
            <span className="relative text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent z-10">
              &lt;Z/&gt;
            </span>
          </div>
        </div>

        {/* Status section */}
        <div className="mt-12 text-center w-full max-w-xs sm:max-w-sm">
          {/* Animated message */}
          <div className="h-8 flex items-center justify-center">
            <div className="text-sm sm:text-base text-gray-300 font-mono flex items-center">
              <span className="mr-2 text-sky-400 animate-pulse">&gt;</span>
              <span key={messageIndex} className="animate-fade-in">
                {LOADING_MESSAGES[messageIndex]}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 relative">
            <div className="h-1.5 w-full bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/50 backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-violet-500 to-sky-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
            {/* Progress percentage */}
            <div className="mt-2 text-xs font-mono text-zinc-500">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Tech stack indicators */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {["React", "Next.js", "GSAP"].map((tech, i) => (
              <div
                key={tech}
                className="px-2 py-1 text-xs font-mono text-zinc-500 bg-zinc-800/50 rounded border border-zinc-700/30 animate-fade-in"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(405deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
