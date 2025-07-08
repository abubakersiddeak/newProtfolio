import React from "react";
import Image from "next/image";

import { FaGithub } from "react-icons/fa";
export default function ProjectsDisplay({ projects }) {
  return (
    <section id="projects" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-400">
          My Projects
        </h2>
        <div
          id="project-list"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={project.image[0]?.url}
                alt={project.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-500 transition-colors duration-300 flex items-center"
                  >
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
