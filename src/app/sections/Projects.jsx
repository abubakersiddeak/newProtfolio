"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedSection from "../components/AnimatedSection";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["All", "Full Stack", "Frontend", "Mobile"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`api/project`);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="py-12  sm:py-16 md:py-14 ">
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
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-cyan-500   mb-4 sm:mb-6">
              MY PROJECTS
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-indigo-400 mx-auto mb-6 sm:mb-8"></div>
          </div>
        </AnimatedSection>

        {/* Category Filter - Responsive */}
        <AnimatedSection delay={200}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  selectedCategory === category
                    ? " text-white shadow-lg bg-cyan-600"
                    : " bg-slate-800 text-gray-300 hover:bg-slate-700 border border-indigo-500/20 shadow-lg"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Futuristic Project Modal */}
        <div className="flex flex-wrap justify-center gap-4">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={project._id} delay={index * 100}>
              {/* Futuristic Card Container */}
              <div
                className={`bg-gradient-to-br from-gray-900/80 to-gray-800/90 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-1 group/card h-[350px] w-[85vw] md:h-[400px] xl:h-[450px] md:w-[25vw] xl:w-[25vw] 2xl:w-[25vw] flex flex-col  relative`}
              >
                {/* Holographic Effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden ">
                  <div className="absolute -inset-8 bg-[conic-gradient(from_90deg_at_50%_50%,#00ccff_0%,#7b00ff_50%,#00ccff_100%)] opacity-20 group-hover/card:opacity-30 animate-spin-slow"></div>
                </div>

                {/* Image Container with Full Screen Trigger */}
                <div
                  className="relative  rounded-t-xl cursor-zoom-in overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  <Image
                    src={project.image[0].url}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                      Click to expand
                    </span>
                  </div>

                  {/* Floating Tech Badge */}
                  <span className="absolute top-3 right-3 bg-gray-900/90 text-cyan-400 px-3 py-1 rounded-full text-xs font-mono border border-cyan-400/30 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col h-[60%] xl:h-[55%]">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover/card:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 mb-4 text-xs line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="hidden flex-wrap gap-2 mb-4 mt-auto md:flex">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[7px] md:text-[10px] font-mono bg-gray-800/80 text-cyan-300 px-2.5 py-1 rounded-full border border-gray-700 hover:border-cyan-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs font-mono bg-gray-800/80 text-gray-400 px-2.5 py-1 rounded-full">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between border-t border-gray-800 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <FaGithub className="mr-2" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      Live
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Full Screen Image Viewer */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-end sm:justify-center p-4 backdrop-blur-lg overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="cursor-pointer absolute top-6 right-6 z-50 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 text-white transition-all shadow-lg border border-gray-700 hover:border-cyan-400"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Main Content Container */}
            <div className="w-full max-w-6xl flex flex-col  h-[90vh]">
              {/* Project Details Panel - Bottom Section */}

              {/* Image Carousel - Top Section */}
              <div className="relative w-full h-[60vh] min-h-[400px] bg-black rounded-t-xl sm:rounded-b-none overflow-hidden border border-gray-700">
                {selectedProject.image.map((img, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                    style={{ opacity: currentImageIndex === idx ? 1 : 0 }}
                  >
                    <Image
                      src={img.url}
                      alt={`${selectedProject.title} - ${idx + 1}`}
                      fill
                      className="object-contain"
                      quality={100}
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev > 0 ? prev - 1 : selectedProject.image.length - 1
                    )
                  }
                  className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 text-white transition-all shadow-lg border border-gray-700 hover:border-cyan-400"
                >
                  <FaChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev < selectedProject.image.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-900/80 hover:bg-gray-800 text-white transition-all shadow-lg border border-gray-700 hover:border-cyan-400"
                >
                  <FaChevronRight className="text-xl" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {selectedProject.image.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 cursor-pointer rounded-full transition-all ${
                        currentImageIndex === idx
                          ? "bg-cyan-400 scale-125"
                          : "bg-gray-600 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-b-xl sm:rounded-t-none sm:rounded-b-xl p-6 border-t border-gray-700 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Text Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-400">
                        {selectedProject.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {currentImageIndex + 1}/{selectedProject.image.length}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {selectedProject.longDescription ||
                        selectedProject.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">
                        TECH STACK
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1 rounded-full bg-gray-800 text-cyan-300 border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
                    >
                      <FaGithub />
                      <span>View Code</span>
                    </a>
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg transition-colors"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
