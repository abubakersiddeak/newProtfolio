"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaEye,
  FaStar,
} from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedProjectSection from "../components/AnimateProjectSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Enhanced custom styles
const customStyles = `
  /* Hide scrollbar */
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* Enhanced gradient border with animated glow */
  .project-card-enhanced {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(31, 41, 55, 0.6));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(59, 130, 246, 0.1);
  }

  .project-card-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    transition: left 0.5s;
  }

  .project-card-enhanced:hover::before {
    left: 100%;
  }

  .project-card-enhanced::after {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(135deg, #0f172a, #3b82f6, #8b5cf6, #0f172a);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card-enhanced:hover::after {
    opacity: 1;
    animation: borderGlow 2s ease-in-out infinite alternate;
  }

  @keyframes borderGlow {
    0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    100% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
  }

  /* Glass morphism effect */
  .glass-effect {
    background: rgba(17, 24, 39, 0.7);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Enhanced modal backdrop */
  .modal-backdrop {
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%);
    backdrop-filter: blur(20px);
  }

  /* Floating animation */
  .floating {
    animation: floating 6s ease-in-out infinite;
  }

  @keyframes floating {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  /* Pulse effect */
  .pulse-glow {
    animation: pulseGlow 2s ease-in-out infinite alternate;
  }

  @keyframes pulseGlow {
    0% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
    100% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
  }
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", "Full Stack", "Frontend", "Mobile"];

  // Refs for GSAP and DOM elements
  const projectContainerRef = useRef(null);
  const gridContainerRef = useRef(null);
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const backgroundRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Simulate data fetching
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);

        const res = await fetch("/api/project"); // এখানে "/" দিতে হবে
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();

        // valid project গুলো ফিল্টার করা
        const validProjects = data.filter(
          (project) => project && project._id // শুধু _id চেক করা
        );

        setProjects(validProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // GSAP animations encapsulated
  useGSAP(
    () => {
      if (!projectContainerRef.current || projects.length === 0) return;

      // Only run horizontal scroll on large screens
      if (window.innerWidth >= 768) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: projectContainerRef.current,
            start: "top 2%",
            end: () =>
              `+=${gridContainerRef.current?.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 2.5,
            anticipatePin: 1,
            refreshPriority: -1,
            // markers: true,
          },
        });

        // Horizontal scroll and scroll indicator animation
        tl.to(gridContainerRef.current, {
          x: () => -(gridContainerRef.current.scrollWidth - window.innerWidth),
          ease: "power1.inOut",
          duration: 2,
        });

        if (scrollIndicatorRef.current) {
          tl.to(
            scrollIndicatorRef.current,
            {
              x: () =>
                `+=${gridContainerRef.current.scrollWidth - window.innerWidth}`,
              ease: "none",
            },
            "<" // Sync with the horizontal scroll
          );
        }

        // Enhanced card entrance and hover animations
        gsap.utils.toArray(".projectCard").forEach((card, index) => {
          tl.fromTo(
            card,
            { y: 100, opacity: 0, scale: 0.5, rotationY: -5 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationY: 20,
              ease: "back.out(1.4)",
              duration: 0.8,
            },
            index * 0.15
          );

          const hoverAnimation = gsap.to(card, {
            y: -20,
            scale: 1.02,
            rotationY: 5,
            duration: 0.4,
            ease: "power2.out",
            paused: true,
          });

          card.addEventListener("mouseenter", () => hoverAnimation.play());
          card.addEventListener("mouseleave", () => hoverAnimation.reverse());
        });
      } else {
        // Simple fade-in for mobile devices
        gsap.fromTo(
          gsap.utils.toArray(".projectCard"),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }
        );
      }

      // Title and category animations on scroll
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.7 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        categoryRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          stagger: 0.1,
          scrollTrigger: { trigger: categoryRef.current, start: "top 85%" },
        }
      );
    },
    { scope: projectContainerRef, dependencies: [projects, isLoading] }
  );

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <section className="py-20 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-mono text-cyan-400">Loading Projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={projectContainerRef}
      id="projects"
      className="py-20 text-white relative overflow-hidden min-h-screen"
    >
      <style>{customStyles}</style>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced title section */}
        <AnimatedProjectSection>
          <div ref={titleRef} className="text-center mb-5 2xl:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold">
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
                  PROJECTS
                </span>
              </h2>
              <div className="relative inline-block">
                <div className="relative inline-block mt-1 2xl:mt-6">
                  <div className="w-32 h-1 bg-gradient-to-r from-[#052E16] to-[#18FFFF] rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedProjectSection>

        {/* Enhanced category filters */}
        <AnimatedProjectSection delay={200}>
          <div
            ref={categoryRef}
            className="flex flex-wrap justify-center gap-4 mb-5"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 cursor-pointer py-2 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden text-[13px] ${
                  selectedCategory === category
                    ? " bg-cyan-500 text-white shadow-2xl"
                    : "glass-effect text-gray-300 hover:text-white border border-dashed"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <span className="relative z-10">{category}</span>
                {selectedCategory !== category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-600/0 hover:from-cyan-500/10 hover:to-purple-600/10 transition-all duration-300"></div>
                )}
              </motion.button>
            ))}
          </div>
        </AnimatedProjectSection>

        {/* --- PROJECTS GRID --- */}
        {/* On large screens (lg), this remains horizontal, but on mobile, it becomes a vertical grid */}
        <div className="relative">
          <div
            ref={gridContainerRef}
            className="flex lg:flex-row flex-col gap-2 2xl:gap-6 pb-8 hide-scrollbar lg:overflow-x-scroll lg:w-max mx-auto min-h-[60vh] md:py-7 2xl:py-10"
            style={
              window.innerWidth >= 768
                ? { width: `${filteredProjects.length * 500}px` }
                : {}
            }
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                className="projectCard project-card-enhanced rounded-xl flex-shrink-0 w-full lg:w-96 h-[300px] 2xl:h-[500px] cursor-pointer relative overflow-hidden "
                onClick={() => handleProjectClick(project)}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Project Number */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-4xl font-black text-white/10">{`0${
                    index + 1
                  }`}</span>
                </div>

                {/* Enhanced header with terminal dots */}
                <div className="flex items-center justify-between p-2 2xl:p-4 border-b border-gray-700/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
                  </div>
                  {project.featured && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-xs font-bold text-black">
                      <FaStar className="text-[10px]" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>
                <div className="absolute top-0 right-2 z-10">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-cyan-400 text-xs font-mono rounded-full border border-cyan-400/30">
                    {project.category}
                  </span>
                </div>
                <div className="relative h-30 2xl:h-44 overflow-hidden">
                  <Image
                    src={project.image[0].url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-600/0 hover:from-cyan-500/10 hover:to-purple-600/10 transition-all duration-500"></div>
                </div>
                <div className="2xl:p-6 p-4 flex-1 flex flex-col">
                  <h3 className="2xl:text-xl text-[13px] font-bold text-white 2xl:mb-3 mb-1 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 2xl:mb-3 mb-1 text-[10px] 2xl:text-sm line-clamp-3 flex-1">
                    {project.description}
                  </p>
                  <div className="2xl:mb-4 mb-2">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="2xl:text-xs text-[7px] font-mono bg-gray-800/80 text-cyan-300 2xl:px-3 px-2 py-1 rounded-full border border-gray-700/50 hover:border-cyan-400/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs font-mono bg-gray-800/80 text-gray-400 px-3 py-1 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-gray-700/50">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 2xl:px-4 px-2 2xl:py-2 py-1 glass-effect rounded-lg hover:bg-gray-700/50 transition-all text-[10px] 2xl:text-sm group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub className="group-hover:rotate-12 transition-transform" />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 2xl:px-4 px-2 2xl:py-2 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all text-[10px] 2xl:text-sm font-semibold group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaEye className="group-hover:scale-110 transition-transform" />
                      <span>Live</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Project Scroll Indicator - Only visible on large screens */}
          {filteredProjects.length > 1 && window.innerWidth >= 768 && (
            <div className="absolute bottom-[-16px] left-0 w-full flex justify-center py-4 z-20">
              <div className="relative w-40 h-2 glass-effect rounded-full overflow-hidden">
                <motion.div
                  ref={scrollIndicatorRef}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                  style={{ width: `${100 / filteredProjects.length}%` }}
                ></motion.div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content max-w-6xl w-full max-h-[90vh] glass-effect rounded-2xl overflow-hidden relative"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 p-3 glass-effect rounded-full hover:bg-red-500/20 transition-all group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes className="text-xl group-hover:text-red-400 transition-colors" />
              </motion.button>
              <div className="flex flex-col lg:flex-row h-full">
                <div className="lg:w-2/3 relative h-64 lg:h-auto">
                  <div className="relative w-full h-full bg-black">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={selectedProject.image[currentImageIndex].url}
                          alt={`${selectedProject.title} - ${
                            currentImageIndex + 1
                          }`}
                          fill
                          className="object-contain"
                          quality={100}
                        />
                      </motion.div>
                    </AnimatePresence>
                    {selectedProject.image.length > 1 && (
                      <>
                        <motion.button
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev > 0
                                ? prev - 1
                                : selectedProject.image.length - 1
                            )
                          }
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-effect rounded-full hover:bg-cyan-500/20 transition-all"
                          whileHover={{ scale: 1.1, x: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaChevronLeft className="text-xl" />
                        </motion.button>
                        <motion.button
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev < selectedProject.image.length - 1
                                ? prev + 1
                                : 0
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-effect rounded-full hover:bg-cyan-500/20 transition-all"
                          whileHover={{ scale: 1.1, x: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaChevronRight className="text-xl" />
                        </motion.button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.image.map((_, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-3 h-3 rounded-full transition-all ${
                                currentImageIndex === idx
                                  ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                                  : "bg-gray-600 hover:bg-gray-400"
                              }`}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="lg:w-1/3 p-6 overflow-y-auto">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                    {selectedProject.featured && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-xs font-bold text-black">
                        <FaStar className="text-[10px]" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-cyan-900/30 text-cyan-400 text-xs rounded-full">
                      {selectedProject.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {currentImageIndex + 1} / {selectedProject.image.length}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedProject.longDescription ||
                      selectedProject.description}
                  </p>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <FaCode className="text-cyan-400" />
                      TECH STACK
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          className="text-xs px-3 py-1 glass-effect text-cyan-300 rounded-full border border-cyan-400/20"
                          whileHover={{
                            scale: 1.05,
                            borderColor: "rgba(34, 211, 238, 0.5)",
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-6 py-3 glass-effect rounded-xl hover:bg-gray-700/50 transition-all group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub className="text-lg group-hover:rotate-12 transition-transform" />
                      <span className="font-semibold">View Source Code</span>
                    </motion.a>
                    <motion.a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all font-semibold group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt className="text-lg group-hover:scale-110 transition-transform" />
                      <span>View Live Demo</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
