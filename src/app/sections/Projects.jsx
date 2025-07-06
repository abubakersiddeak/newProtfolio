"use client";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React frontend and Node.js backend",
      longDescription:
        "A comprehensive e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. The application is fully responsive and includes advanced features like product search, filtering, and real-time inventory management.",
      image: "/one.png",
      technologies: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "MongoDB",
        "Express.js",
      ],
      github: "https://github.com/abubakersiddeak/WealShop2024",
      live: "https://weal-shop2024.vercel.app/",
      category: "Full Stack",
    },
    {
      id: 2,
      title: "Online Exam Platform",
      description:
        "A secure and user-friendly online examination platform with real-time results and automated evaluation.",
      longDescription:
        "A modern online examination platform designed for educational institutions and training centers. The system support MCQs question format. Features include without student login, timed exams, question randomization, real-time performance tracking, instant result generation. The platform also includes an intuitive admin panel for managing students, creating exams, and monitoring exam activity. Built using React for frontend and Node.js/MongoDB for scalable backend operations, this solution ensures reliability and smooth performance even under high traffic.",
      image: "/2.png",
      technologies: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "MongoDB",
        "Express.js",
      ],
      github: "https://github.com/abubakersiddeak/online_exam",
      live: "https://online-exam-nine.vercel.app/",
      category: "Full Stack",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A clean and responsive personal portfolio website to showcase skills, projects, and experience.",
      longDescription:
        "A clean and responsive personal portfolio website to showcase skills, projects, and experience.",
      image: "/3.png",
      technologies: ["React", "Tailwind CSS", "Next.js", "Node.js"],
      github: "https://github.com/abubakersiddeak/protfolio",
      live: "https://effervescent-lokum-36bfa7.netlify.app/",
      category: "Full Stack",
    },
  ];

  const categories = ["All", "Full Stack", "Frontend", "Mobile"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 md:py-20 bg-black/60 font-mono transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-cyan-500   mb-4 sm:mb-6">
              My Projects
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
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
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

        {/* Projects Grid - Responsive */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <div className="bg-black/50 p-5 sm:p-6 rounded-xl border border-dashed  overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer  border-indigo-500/20 shadow-lg">
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="opacity-0 group-hover:opacity-100 bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm sm:text-base"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-slate-700 text-gray-300 px-2 sm:px-3 py-1 rounded-lg border border-indigo-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <a
                      href={project.github}
                      className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors text-sm sm:text-base"
                    >
                      <FaGithub className="mr-1 sm:mr-2" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors text-sm sm:text-base"
                    >
                      <FaExternalLinkAlt className="mr-1 sm:mr-2" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Project Modal - Responsive */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-indigo-500/20">
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-48 sm:h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded text-sm self-start">
                    {selectedProject.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-lg leading-relaxed">
                  {selectedProject.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-700 text-gray-300 px-3 sm:px-4 py-1 sm:py-2 rounded-lg border border-indigo-500/20 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={selectedProject.github}
                    className="flex items-center justify-center bg-slate-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg :hover:bg-slate-600 transition-colors border border-indigo-500/20 text-sm sm:text-base"
                  >
                    <FaGithub className="mr-2" />
                    View Code
                  </a>
                  <a
                    href={selectedProject.live}
                    className="flex items-center justify-center bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Live Demo
                  </a>
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
