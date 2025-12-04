"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectsDisplay({ projects }) {
  return (
    <section className="p-8 bg-black">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mb-2">
          Projects Overview
        </h2>
        <p className="text-sm text-neutral-500">
          {projects.length} project{projects.length !== 1 ? "s" : ""} in your
          portfolio
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900 border border-neutral-800">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-neutral-700"
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
          <p className="text-neutral-500 text-lg font-light">
            No projects found
          </p>
          <p className="text-neutral-600 text-sm mt-2">
            Add projects from the Manage Projects section
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col hover:border-neutral-700 transition-colors"
            >
              {/* Project Image */}
              <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                {project.image?.[0]?.url ? (
                  <Image
                    src={project.image[0].url}
                    alt={project.title || "Project image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-700 text-sm">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-light text-white line-clamp-1 flex-1">
                    {project.title || "Untitled Project"}
                  </h3>
                  {project.category && (
                    <span className="text-xs text-neutral-500 whitespace-nowrap">
                      {project.category}
                    </span>
                  )}
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed font-light line-clamp-3 mb-4 flex-grow">
                  {project.description || "No description available"}
                </p>

                {/* Technologies */}
                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-neutral-500 font-light"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs text-neutral-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-neutral-800 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 border border-neutral-700 hover:border-neutral-600 transition-colors text-xs font-medium"
                    >
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-medium"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Stats */}
      {projects.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-4">
            <p className="text-2xl font-light text-white">{projects.length}</p>
            <p className="text-xs text-neutral-500 mt-1">Total Projects</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4">
            <p className="text-2xl font-light text-white">
              {projects.filter((p) => p.category === "Full Stack").length}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Full Stack</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4">
            <p className="text-2xl font-light text-white">
              {projects.filter((p) => p.category === "Frontend").length}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Frontend</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4">
            <p className="text-2xl font-light text-white">
              {new Set(projects.flatMap((p) => p.technologies || [])).size}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Technologies Used</p>
          </div>
        </div>
      )}
    </section>
  );
}
