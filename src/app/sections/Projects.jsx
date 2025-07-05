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
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express.js"],
      github: "#",
      live: "#",
      category: "Full Stack",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates",
      longDescription:
        "A modern task management application featuring real-time collaboration, drag-and-drop functionality, team workspaces, and advanced project tracking. Built with React, Socket.io for real-time features, and a Node.js backend with PostgreSQL database. Includes features like task assignment, deadline tracking, file attachments, and team communication.",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Socket.io", "PostgreSQL", "Material-UI"],
      github: "#",
      live: "#",
      category: "Frontend",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "A beautiful weather dashboard with interactive maps and forecasts",
      longDescription:
        "An elegant weather dashboard that provides detailed weather information, interactive maps, and extended forecasts. Features include location-based weather data, weather maps, severe weather alerts, and historical weather data visualization. Built with React, Chart.js for data visualization, and integrates with multiple weather APIs for accurate data.",
      image:
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Chart.js", "Weather API", "Tailwind CSS"],
      github: "#",
      live: "#",
      category: "Frontend",
    },
    {
      id: 4,
      title: "Social Media Dashboard",
      description: "A comprehensive social media analytics dashboard",
      longDescription:
        "A powerful social media analytics dashboard that aggregates data from multiple platforms including Twitter, Instagram, and Facebook. Features include engagement metrics, follower growth tracking, content performance analysis, and automated reporting. Built with React, D3.js for advanced data visualization, and integrates with social media APIs.",
      image:
        "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "D3.js", "Social Media APIs", "Redux"],
      github: "#",
      live: "#",
      category: "Full Stack",
    },
    {
      id: 5,
      title: "Fitness Tracker",
      description: "A mobile-responsive fitness tracking application",
      longDescription:
        "A comprehensive fitness tracking application that allows users to log workouts, track progress, set goals, and monitor their fitness journey. Features include exercise database, workout planning, progress visualization, social features for sharing achievements, and integration with wearable devices. Built with React Native for cross-platform compatibility.",
      image:
        "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React Native", "Firebase", "Chart.js", "Expo"],
      github: "#",
      live: "#",
      category: "Mobile",
    },
    {
      id: 6,
      title: "Recipe Sharing Platform",
      description: "A community-driven recipe sharing and cooking platform",
      longDescription:
        "A vibrant recipe sharing platform where users can discover, share, and save their favorite recipes. Features include recipe creation with step-by-step instructions, ingredient shopping lists, nutritional information, user reviews and ratings, and personalized recipe recommendations. Built with React, Node.js, and includes advanced search and filtering capabilities.",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Node.js", "MongoDB", "Cloudinary"],
      github: "#",
      live: "#",
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
      className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              My{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Projects
              </span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-xl text-slate-700 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Here are some of my recent projects that showcase my skills and
              creativity.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter - Responsive */}
        <AnimatedSection delay={200}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                  selectedCategory === category
                    ? "bg-indigo-600 dark:bg-indigo-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg"
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
              <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg">
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="opacity-0 group-hover:opacity-100 bg-indigo-600 dark:bg-indigo-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm sm:text-base"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-xs bg-indigo-600 dark:bg-indigo-600 text-white px-2 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-gray-300 px-2 sm:px-3 py-1 rounded-full border border-indigo-500/20 dark:border-indigo-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <a
                      href={project.github}
                      className="flex items-center text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm sm:text-base"
                    >
                      <FaGithub className="mr-1 sm:mr-2" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center text-slate-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm sm:text-base"
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
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-indigo-500/20 dark:border-indigo-500/20">
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
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <span className="bg-indigo-600 dark:bg-indigo-600 text-white px-3 py-1 rounded text-sm self-start">
                    {selectedProject.category}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-lg leading-relaxed">
                  {selectedProject.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-gray-300 px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-indigo-500/20 dark:border-indigo-500/20 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={selectedProject.github}
                    className="flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-slate-900 dark:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors border border-indigo-500/20 dark:border-indigo-500/20 text-sm sm:text-base"
                  >
                    <FaGithub className="mr-2" />
                    View Code
                  </a>
                  <a
                    href={selectedProject.live}
                    className="flex items-center justify-center bg-indigo-600 dark:bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-700 transition-colors text-sm sm:text-base"
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
