"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [imageIndex, setImageIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);

  const categories = ["All", "Full Stack", "Frontend", "Mobile"];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // GSAP animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 85%",
        },
      });

      gsap.from(".project-item", {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, filter]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedProject) return;
      if (e.key === "Escape") setSelectedProject(null);
      if (e.key === "ArrowLeft" && selectedProject.image?.length > 1) {
        setImageIndex((p) =>
          p === 0 ? selectedProject.image.length - 1 : p - 1
        );
      }
      if (e.key === "ArrowRight" && selectedProject.image?.length > 1) {
        setImageIndex((p) =>
          p === selectedProject.image.length - 1 ? 0 : p + 1
        );
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedProject]);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className=" relative py-10   text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="fade-in-about mb-2 sm:mb-6 md:mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="header-line w-12 h-px bg-gradient-to-r from-white/40 to-transparent" />
            <span className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-neutral-500 tracking-[0.2em] uppercase font-light">
              Projects
            </span>
          </div>
        </div>
        {/* Header */}
        <div className="section-title text-center mb-10 sm:mb-14">
          <div className="ade-in-about space-y-3">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-tight"></span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-start gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`cursor-pointer px-4 sm:px-5 py-2 text-xs sm:text-sm font-light tracking-wide transition-all duration-300 ${
                  filter === cat
                    ? "bg-white text-black"
                    : "bg-transparent border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id}
                className="project-item group relative"
                onMouseEnter={() => setHoveredId(project._id)}
                onMouseLeave={() => setHoveredId(null)}
                layout
              >
                <div
                  onClick={() => {
                    setSelectedProject(project);
                    setImageIndex(0);
                  }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-500"
                >
                  {/* Image */}
                  {project.image?.[0]?.url ? (
                    <Image
                      src={project.image[0].url}
                      alt={project.title}
                      fill
                      className={`object-cover transition-all duration-700 ${
                        hoveredId === project._id
                          ? "scale-110 blur-sm"
                          : "scale-100"
                      }`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
                      <span className="text-neutral-700 text-xs">No Image</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
                      hoveredId === project._id ? "opacity-90" : "opacity-60"
                    }`}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    {/* Category */}
                    <span className="text-[10px] text-cyan-400 uppercase tracking-wider mb-1">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-medium mb-1 line-clamp-1">
                      {project.title}
                    </h3>

                    {/* Tech Pills */}
                    <div
                      className={`flex flex-wrap gap-1 transition-all duration-500 ${
                        hoveredId === project._id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] bg-white/10 backdrop-blur-sm rounded-full text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* View Button */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: hoveredId === project._id ? 1 : 0,
                        y: hoveredId === project._id ? 0 : 10,
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20  text-xs font-medium">
                        View Details
                      </span>
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div
                      className={`absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-cyan-400 to-transparent transition-opacity duration-500 ${
                        hoveredId === project._id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div
                      className={`absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-cyan-400 to-transparent transition-opacity duration-500 ${
                        hoveredId === project._id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>

                  {/* Number */}
                  <div className="absolute top-3 left-3 text-[10px] text-white/30 font-mono">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-neutral-500 text-sm mb-3">No projects found</p>
            <button
              onClick={() => setFilter("All")}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950 border border-white/10"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[95vh] sm:max-h-[90vh]">
                {/* Image */}
                <div className="relative aspect-[16/10] sm:aspect-video bg-neutral-900">
                  <AnimatePresence mode="wait">
                    {selectedProject.image?.[imageIndex]?.url && (
                      <motion.div
                        key={imageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={selectedProject.image[imageIndex].url}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Image Nav */}
                  {selectedProject.image?.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setImageIndex((p) =>
                            p === 0 ? selectedProject.image.length - 1 : p - 1
                          )
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/60 rounded-full hover:bg-black/80 cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setImageIndex((p) =>
                            p === selectedProject.image.length - 1 ? 0 : p + 1
                          )
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-black/60 rounded-full hover:bg-black/80 cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {selectedProject.image.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImageIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                              imageIndex === i
                                ? "bg-white w-4"
                                : "bg-white/40 hover:bg-white/60"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-950 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-4 sm:p-5 md:p-6 -mt-8 relative">
                  {/* Category & Title */}
                  <div className="mb-3 sm:mb-4">
                    <span className="text-[10px] sm:text-xs text-cyan-400 uppercase tracking-wider">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium mt-0.5">
                      {selectedProject.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                    {selectedProject.longDescription ||
                      selectedProject.description}
                  </p>

                  {/* Tech */}
                  {selectedProject.technologies?.length > 0 && (
                    <div className="mb-4 sm:mb-5">
                      <span className="text-[10px] text-neutral-600 uppercase tracking-wider block mb-2">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-[10px] sm:text-xs bg-white/5 border border-white/10  text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-2">
                    {selectedProject.live && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center  gap-1.5 px-4 py-2 bg-gradient-to-r  text-xs sm:text-sm font-medium  hover:opacity-90 transition-opacity cursor-pointer bg-transparent border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Live
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-xs sm:text-sm font-medium  hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none border border-white/5">
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
