"use client";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaRocket,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import { FiCpu, FiLayers, FiZap } from "react-icons/fi";
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
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutWithSkills = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Web");
  const [yearsExp, setYearsExp] = useState(0);
  const [projectsDone, setProjectsDone] = useState(0);
  const count = useMotionValue(0);
  const aboutContainer = useRef(null);

  const stats = [
    {
      value: yearsExp,
      label: "Years Experience",
      icon: <FiZap className="text-yellow-400" />,
    },
    {
      value: projectsDone,
      label: "Projects Delivered",
      icon: <FaRocket className="text-pink-400" />,
    },
    { value: "∞", label: "Cups of Coffee", icon: "☕" },
  ];

  const skillCategories = {
    Web: [
      { name: "React", icon: <FaReact className="text-sky-500" size={24} /> },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="text-white" size={24} />,
      },
      {
        name: "TailwindCSS",
        icon: <SiTailwindcss className="text-cyan-400" size={24} />,
      },
      {
        name: "Framer Motion",
        icon: <TbBrandFramerMotion className="text-purple-500" size={24} />,
      },
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-400" size={24} />,
      },
      {
        name: "Node.js",
        icon: <FaNodeJs className="text-green-600" size={24} />,
      },
      {
        name: "Express.JS",
        icon: <SiExpress className="text-gray-200" size={24} />,
      },
      {
        name: "Auth.JS",
        icon: <SiAuth0 className="text-orange-500" size={24} />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb className="text-green-600" size={24} />,
      },
    ],
    Programming: [
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-400" size={24} />,
      },
      {
        name: "Python",
        icon: <FaPython className="text-blue-400" size={24} />,
      },
      {
        name: "Node.js",
        icon: <FaNodeJs className="text-green-600" size={24} />,
      },
    ],
    Tools: [
      { name: "Git", icon: <FaGitAlt className="text-orange-600" size={24} /> },
      {
        name: "VS Code",
        icon: <VscVscode className="text-blue-600" size={24} />,
      },
      { name: "NPM/Yarn", icon: <SiNpm className="text-red-600" size={24} /> },
      { name: "Figma", icon: <FaFigma className="text-pink-500" size={24} /> },
      { name: "Gimp", icon: <SiGimp className="text-sky-300" size={24} /> },
      {
        name: "Inkscape",
        icon: <SiInkscape className="text-indigo-300" size={24} />,
      },
    ],
  };

  useEffect(() => {
    const animation = animate(count, 100, {
      duration: 2,
      onUpdate: (latest) => {
        setYearsExp(Math.min(1, Math.floor(latest / 20)));
        setProjectsDone(Math.min(3, Math.floor(latest * 0.5)));
      },
    });
    return animation.stop;
  }, []);

  useGSAP(
    () => {
      gsap.from(".trustsection", {
        x: 400,

        opacity: 0,
        scale: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".trustsection",
          start: "top 90%",
          end: "center 60%",
          scrub: 2.5,
          // markers: true,
        },
        ease: "power3.inOut",
      });

      gsap.fromTo(
        ".aboutimagecontent",
        {
          x: -400,
          rotationY: 30,
          opacity: 0,
          scale: 0.8,
          filter: "blur(15px)",
        },
        {
          x: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".aboutimagecontent",
            start: "top 90%", // animation শুরু
            end: "center 60%", // animation শেষ
            scrub: 2.5, // scroll এর সাথে smooth movement
            // markers: true,
          },
        }
      );
      gsap.from(".abouttext", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".abouttext",
          start: "top 90%",
          end: "center 60%",
          scrub: 2.5,
          // markers: true,
        },
        ease: "power3.inOut",
      });
      gsap.from(".name", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".name",
          start: "top 90%",
          end: "center 60%",
          scrub: 2.5,
          // markers: true,
        },
        ease: "power3.inOut",
      });
    },
    { scope: aboutContainer }
  );

  return (
    <section
      ref={aboutContainer}
      id="about"
      className="  relative overflow-hidden "
    >
      {/* Cosmic background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              opacity: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              y: [null, (Math.random() - 0.5) * 100],
              x: [null, (Math.random() - 0.5) * 100],
              transition: {
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12 sm:py-16 md:py-24 ">
        {/* Cosmic title */}
        <div className="name text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span
              className="font-extrabold font-mono text-cyan-500"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom,#052E16 1%,#18FFFF 55%,#052E16 99%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ABOUT & SKILLS
            </span>
          </h2>
          <div className="relative inline-block mt-6">
            <div className="w-32 h-1 bg-gradient-to-r from-[#052E16] to-[#18FFFF] rounded-full" />
          </div>
        </div>

        {/* Main Content Grid: Added 'items-stretch' to make columns match height */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-stretch ">
          {/* Holographic profile */}
          <div
            // Added 'flex justify-center items-center' and 'w-full' to make the image container more flexible
            className="aboutimagecontent  relative flex justify-center lg:justify-start items-center"
          >
            {/* Image container: Removed fixed sizes and used 'w-full' for fluid width */}
            <div className="relative w-[90%] h-full max-w-sm sm:max-w-md md:max-w-lg aspect-square">
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/30 via-purple-400/30 to-pink-400/30 blur-lg animate-pulse" />

              {/* Image container */}
              <div className="absolute inset-1 sm:inset-2 bg-black rounded-xl overflow-hidden border border-cyan-400/20">
                <Image
                  src={
                    user.length !== 0 ? user[0].aboutImage : "/placeholder.svg"
                  }
                  alt="Profile"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Tech badges floating around */}
              <motion.div
                className="absolute -top-4 -left-4 bg-black/80 border border-cyan-400/30 rounded-full p-2 shadow-lg shadow-cyan-400/20"
                animate={{
                  rotate: [0, 360],
                  transition: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <FiCpu className="text-cyan-400" size={24} />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-black/80 border border-purple-400/30 rounded-full p-2 shadow-lg shadow-purple-400/20"
                animate={{
                  rotate: [360, 0],
                  transition: {
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <FiLayers className="text-purple-400" size={24} />
              </motion.div>
            </div>
          </div>

          {/* Content area */}
          <div className="space-y-12 flex flex-col justify-between">
            {/* Bio section */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="name text-4xl font-bold tracking-tight text-white mb-2 text-center lg:text-start">
                  {user.length !== 0 ? (
                    <>
                      <span className="text-white">
                        {user[0].name?.split(" ")[0]?.toUpperCase()}
                      </span>{" "}
                      <span className="text-white">
                        {user[0].name
                          ?.split(" ")
                          .slice(1)
                          .join(" ")
                          ?.toUpperCase()}
                      </span>
                    </>
                  ) : (
                    "loading..."
                  )}
                </h3>

                <div className="name text-sm sm:text-base text-gray-400 font-mono mb-6 text-center lg:text-start">
                  Full-Stack Developer & Digital Architect
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {stats.map((stat, i) => (
                    <div
                      key={i}
                      className="trustsection bg-black/40 border border-white/10 rounded-xl p-4 backdrop-blur-sm"
                    >
                      <div className="flex gap-4 items-center">
                        <div className=" text-cyan-400 ">{stat.icon}</div>
                        <div className="2xl:text-3xl lg:text-2xl text-xl font-bold text-white">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" space-y-4 text-gray-400 2xl:text-lg text-[13px]">
                <p className="abouttext leading-relaxed border-l-2 border-cyan-400/50 pl-4">
                  <span className=" ">Digital craftsman</span> with a passion
                  for building immersive web experiences. I combine{" "}
                  <span className="">technical precision</span> with{" "}
                  <span className="">creative vision</span> to deliver solutions
                  that are as beautiful as they are functional.
                </p>

                <p className="abouttext leading-relaxed border-l-2 border-cyan-400/50 pl-4">
                  My expertise spans from{" "}
                  <span className="">interactive frontends</span> to{" "}
                  <span className="">scalable backends</span>, with a focus on
                  performance, accessibility, and cutting-edge technologies. I
                  thrive in turning complex problems into elegant solutions.
                </p>
              </div>
            </motion.div>

            {/* Skills section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8  flex flex-col"
            >
              {/* Tabs */}
              <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
                {Object.keys(skillCategories).map((tab) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300  cursor-pointer
                      ${
                        activeTab === tab
                          ? "text-white bg-cyan-700 "
                          : "text-gray-300 bg-black/40 border-gray-700 hover:bg-gray-800/60 border border-dashed"
                      }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skillCategories[activeTab].map((skill, index) => (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -5 }}
                    className="bg-black/40 py-3 px-2 lg:p-4 rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-cyan-400/10 cursor-pointer"
                  >
                    <div className=" ">{skill.icon}</div>
                    <span className="text-white font-medium ">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWithSkills;
