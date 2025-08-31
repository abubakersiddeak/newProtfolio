"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches) {
      const timeline = gsap.timeline({ repeat: -1 });

      // Outer ring animation
      timeline.to(
        ".outer-ring",
        {
          rotate: 360,
          duration: 8,
          ease: "none",
        },
        0
      );

      // Inner hexagon animation
      timeline.to(
        ".inner-hexagon",
        {
          rotate: -360,
          duration: 10,
          ease: "none",
        },
        0
      );

      // Central core pulse and rotation
      timeline.to(
        ".core",
        {
          scale: 1.1,
          opacity: 0.8,
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
        },
        0
      );

      // Line beam animation
      timeline.fromTo(
        ".line-beam",
        {
          width: "0%",
        },
        {
          width: "100%",
          duration: 2,
          ease: "power3.inOut",
          stagger: 0.5,
          repeat: -1,
          yoyo: true,
        },
        0
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-all duration-1000"
    >
      {/* Main loader container */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
        {/* Outer and inner rings with precise, smooth rotation */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50 outer-ring"></div>
        <div className="absolute inset-8 rounded-full border-2 border-dashed border-purple-400/50 inner-ring"></div>

        {/* Central Core with geometric shapes and pulse effect */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-gray-900 shadow-lg shadow-cyan-500/10 core">
          {/* Subtle grid pattern or circuit lines */}
          <div className="absolute w-full h-full p-4">
            <div className="w-full h-full border-2 border-gray-700/50 rounded-full"></div>
          </div>
          <div className="absolute w-20 h-20 bg-gray-800 rounded-full animate-spin-reverse-fast"></div>

          {/* Glowing lines animating across the core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-cyan-400/80 line-beam origin-left"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-purple-400/80 line-beam origin-left rotate-90"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-cyan-400/80 line-beam origin-left rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-purple-400/80 line-beam origin-left -rotate-45"></div>

          {/* Central hexagon */}
          <div className="absolute w-12 h-12 bg-gray-700 rounded-md rotate-45"></div>
        </div>
      </div>

      {/* Status text section */}
      <div className="mt-12 text-center">
        <div className="text-sm sm:text-base text-gray-300 font-mono flex items-center justify-center">
          <span className="mr-2 text-cyan-400">&gt;</span>
          <span className="animate-typing-fast overflow-hidden whitespace-nowrap border-r-2 border-r-cyan-400 pr-1">
            Engaging core systems...
          </span>
        </div>
        <div className="mt-4 h-2 w-56 sm:w-72 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-progress-fast"></div>
        </div>
      </div>

      {/* --- CSS Animations (Headless, as a dedicated style tag) --- */}
      <style jsx global>{`
        @keyframes typing-fast {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes progress-fast {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes spin-reverse-fast {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-typing-fast {
          animation: typing-fast 2s steps(28) forwards;
        }
        .animate-progress-fast {
          animation: progress-fast 3s linear forwards;
        }
        .animate-spin-reverse-fast {
          animation: spin-reverse-fast 10s linear infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .outer-ring,
          .inner-ring,
          .core,
          .line-beam,
          .animate-typing-fast,
          .animate-progress-fast,
          .animate-spin-reverse-fast {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
