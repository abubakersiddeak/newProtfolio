"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaFigma } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiNpm,
  SiExpress,
  SiAuth0,
  SiGimp,
  SiInkscape,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

gsap.registerPlugin(ScrollTrigger);

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value);
      const incrementTime = (duration * 1000) / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Text Reveal Animation Component
const TextReveal = ({ children, delay = 0 }) => {
  return (
    <motion.span
      className="inline-block overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.span
        className="inline-block"
        variants={{
          hidden: { y: "100%", opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.8,
              delay,
              ease: [0.25, 0.4, 0.25, 1],
            },
          },
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

const AboutWithSkills = ({ user }) => {
  const container = useRef(null);
  const imageRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Web");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skillCategories = {
    Web: [
      { name: "React", icon: <FaReact size={20} /> },
      { name: "Next.js", icon: <SiNextdotjs size={20} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={20} /> },
      { name: "Framer Motion", icon: <TbBrandFramerMotion size={20} /> },
      { name: "JavaScript", icon: <SiJavascript size={20} /> },
      { name: "Node.js", icon: <FaNodeJs size={20} /> },
      { name: "Express.js", icon: <SiExpress size={20} /> },
      { name: "Auth.js", icon: <SiAuth0 size={20} /> },
      { name: "MongoDB", icon: <SiMongodb size={20} /> },
    ],
    Programming: [
      { name: "JavaScript", icon: <SiJavascript size={20} /> },
      { name: "Python", icon: <FaPython size={20} /> },
      { name: "Node.js", icon: <FaNodeJs size={20} /> },
    ],
    Tools: [
      { name: "Git", icon: <FaGitAlt size={20} /> },
      { name: "VS Code", icon: <VscVscode size={20} /> },
      { name: "NPM", icon: <SiNpm size={20} /> },
      { name: "Figma", icon: <FaFigma size={20} /> },
      { name: "Gimp", icon: <SiGimp size={20} /> },
      { name: "Inkscape", icon: <SiInkscape size={20} /> },
    ],
  };

  // Track mouse for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Parallax effect
        gsap.to(".about-image", {
          y: 50,
          scrollTrigger: {
            trigger: ".about-image",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".about-content", {
          y: -30,
          scrollTrigger: {
            trigger: ".about-content",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Image reveal animation
      gsap.from(".image-container", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
      });

      // Decorative corners animation
      gsap.from(".corner-tl", {
        x: -30,
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
      });

      gsap.from(".corner-br", {
        x: 30,
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
      });

      // Stats border animation
      gsap.from(".stat-border", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
        },
      });

      // Line animation
      gsap.from(".header-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
        },
      });

      // Skills border animation
      gsap.from(".skills-divider", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
        },
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  // Safe data access
  const userData = user?.[0] || {};
  const userName = userData.name || "ZISAN";
  const firstName = userName.split(" ")[0];
  const lastName = userName.split(" ").slice(1).join(" ");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      id="about"
      ref={container}
      className="about-section relative min-h-screen flex items-center py-5 sm:py-14 md:py-18 lg:py-22 text-white  overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="header-line w-12 h-px bg-gradient-to-r from-white/40 to-transparent" />
            <motion.span
              className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-neutral-500 tracking-[0.2em] uppercase font-light"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              About Me
            </motion.span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Image Side */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <motion.div
              className="about-image relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0"
              style={{
                transform: `translate(${mousePosition.x * 0.3}px, ${
                  mousePosition.y * 0.3
                }px)`,
              }}
            >
              <div className="image-container relative w-full h-full overflow-hidden bg-neutral-900">
                {/* Loading Skeleton */}
                <AnimatePresence>
                  {!imageLoaded && (
                    <motion.div
                      className="absolute inset-0 bg-neutral-800 animate-pulse"
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                <Image
                  ref={imageRef}
                  src={userData.aboutImage || "/placeholder.svg"}
                  alt="About me"
                  fill
                  sizes="(max-width: 768px) 384px, (max-width: 1024px) 448px, 500px"
                  className={`object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 hover:scale-105 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  quality={85}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Animated Scan Line */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    top: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 border border-neutral-800"
                  whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner Glow on Hover */}
                <motion.div
                  className="absolute top-0 left-0 w-20 h-20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  }}
                />
              </div>

              {/* Decorative Corners with Animation */}
              <motion.div
                className="corner-tl absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16"
                whileHover={{ scale: 1.1 }}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent" />
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-white/30 to-transparent" />
              </motion.div>

              <motion.div
                className="corner-br absolute -bottom-4 -right-4 w-12 h-12 sm:w-16 sm:h-16"
                whileHover={{ scale: 1.1 }}
              >
                <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-white/30 to-transparent" />
                <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-white/30 to-transparent" />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -right-2 sm:-right-4 top-1/4 bg-black/80 backdrop-blur-sm border border-neutral-800 px-3 py-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <motion.span
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-white font-light">
                    Available
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content Side */}
          <motion.div
            className="lg:col-span-7 order-2 lg:order-2 about-content space-y-8 sm:space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Name & Title */}
            <motion.div className="space-y-1" variants={itemVariants}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight tracking-tight overflow-hidden">
                <TextReveal>{firstName}</TextReveal>{" "}
                <TextReveal delay={0.1}>
                  <span className="text-neutral-500">{lastName}</span>
                </TextReveal>
              </h2>
              <motion.p
                className="text-base sm:text-lg text-neutral-500 font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Full-Stack Developer & Digital Architect
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="stats-container grid grid-cols-3 gap-4 sm:gap-6"
              variants={itemVariants}
            >
              {[
                { value: "1", suffix: "+", label: "Year" },
                { value: "10", suffix: "+", label: "Projects" },
                { value: "2", suffix: "+", label: "Clients" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="relative pl-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="stat-border absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/40 to-white/10 group-hover:from-white/60 group-hover:to-white/20 transition-all duration-300" />
                  <p className="text-2xl sm:text-3xl font-light text-white mb-1">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={1.5 + index * 0.2}
                    />
                  </p>
                  <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              className="space-y-4 text-sm  text-neutral-400 leading-relaxed font-light"
              variants={itemVariants}
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Digital craftsman with a passion for building immersive web
                experiences. I combine technical precision with creative vision
                to deliver solutions that are as beautiful as they are
                functional.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                My expertise spans from interactive frontends to scalable
                backends, with a focus on performance, accessibility, and
                cutting-edge technologies. I thrive in turning complex problems
                into elegant solutions.
              </motion.p>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              className="skills-section pt-2 space-y-6"
              variants={itemVariants}
            >
              {/* Animated Divider */}
              <div className="skills-divider h-px bg-gradient-to-r from-neutral-800/50 via-neutral-700/50 to-transparent" />

              {/* Tabs */}
              <div className="flex flex-wrap gap-3">
                {Object.keys(skillCategories).map((tab) => (
                  <MagneticButton
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer px-4 sm:px-5 py-2 text-xs sm:text-sm font-light tracking-wide transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-white text-black"
                        : "bg-transparent border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                    }`}
                  >
                    {tab}
                  </MagneticButton>
                ))}
              </div>

              {/* Skills Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {skillCategories[activeTab].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      custom={index}
                      variants={skillVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="relative flex items-center gap-3 px-3 sm:px-4 py-3 bg-neutral-900/50 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 cursor-default group overflow-hidden"
                    >
                      {/* Hover Glow Effect */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)",
                        }}
                      />

                      {/* Icon */}
                      <motion.span
                        className="relative z-10 text-neutral-500 group-hover:text-white transition-colors duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        {skill.icon}
                      </motion.span>

                      {/* Name */}
                      <span className="relative z-10 text-xs sm:text-sm text-neutral-400 group-hover:text-white transition-colors font-light">
                        {skill.name}
                      </span>

                      {/* Bottom Line Animation */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-white/50 to-transparent"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.a
                href="#contact"
                className="group inline-flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <span className="font-light tracking-wide">Let's Connect</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutWithSkills;
