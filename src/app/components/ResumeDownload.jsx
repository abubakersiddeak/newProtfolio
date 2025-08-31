"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ResumeDownload = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const ringRef = useRef(null);
  const chainRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  //  Initial + floating animations
  useGSAP(
    () => {
      gsap.from(ringRef.current, {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
      gsap.from(chainRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
      });

      gsap.to(buttonRef.current, {
        y: -6,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  // 🚀 Hover animations
  useGSAP(
    () => {
      if (isHovered) {
        gsap.to(buttonRef.current, {
          scale: 1.08,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
          boxShadow:
            "0 0 30px rgba(0, 247, 255, 0.9), 0 0 60px rgba(168, 85, 247, 0.7), 0 0 90px rgba(236, 72, 153, 0.5)",
        });
        gsap.to(chainRef.current, {
          scaleY: 1.15,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(buttonRef.current, {
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          boxShadow:
            "0 0 20px rgba(0, 247, 255, 0.6), 0 0 40px rgba(168, 85, 247, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)",
        });
        gsap.to(chainRef.current, {
          scaleY: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [isHovered], scope: containerRef }
  );

  // 🚀 Download animations
  useGSAP(
    () => {
      if (isDownloading) {
        gsap.to(buttonRef.current, {
          backgroundColor: "rgba(0, 247, 255, 0.25)",
          duration: 0.5,
          yoyo: true,
          repeat: -1,
        });
        gsap.to(chainRef.current, {
          x: 5,
          duration: 0.1,
          repeat: 20,
          yoyo: true,
          ease: "power1.inOut",
        });
      } else {
        gsap.killTweensOf([buttonRef.current, chainRef.current]);
        gsap.to(buttonRef.current, {
          backgroundColor: "rgba(17, 24, 39, 0.7)",
          duration: 0.5,
        });
        gsap.to(chainRef.current, { x: 0, duration: 0.3 });
      }
    },
    { dependencies: [isDownloading], scope: containerRef }
  );

  const handleDownload = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/path-to-your-resume.pdf";
      link.download = "YourName-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div ref={containerRef} className="fixed top-6 right-6 z-40">
      {/* 🔹 Ring */}
      <div
        ref={ringRef}
        className="w-7 h-7 mx-auto mb-1 rounded-full border-4 border-cyan-400/50 bg-gray-900/80 backdrop-blur-md relative"
        style={{
          boxShadow:
            "0 0 20px rgba(0, 247, 255, 0.7), inset 0 0 10px rgba(0, 247, 255, 0.3)",
        }}
      />

      {/* 🔹 Chain */}
      <div
        ref={chainRef}
        className="w-1 h-14 mx-auto bg-gradient-to-b from-cyan-400/40 to-purple-500/20 relative"
        style={{ transformOrigin: "top center" }}
      />

      {/* 🔹 Download button */}
      <a
        ref={buttonRef}
        href="/path-to-your-resume.pdf"
        download="YourName-Resume.pdf"
        onClick={handleDownload}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm relative overflow-hidden"
        style={{
          background: "rgba(17, 24, 39, 0.7)",
          border: "1px solid rgba(0, 247, 255, 0.2)",
        }}
      >
        {isDownloading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-t-2 border-cyan-400 rounded-full animate-spin" />
            <span>Downloading...</span>
          </div>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 text-cyan-400"
            >
              <path
                fill="currentColor"
                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64v-32c0-35.3-28.7-64-64-64H398.2L416 352H64z"
              />
            </svg>
            <span>Resume</span>
          </>
        )}
      </a>
    </div>
  );
};

export default ResumeDownload;
