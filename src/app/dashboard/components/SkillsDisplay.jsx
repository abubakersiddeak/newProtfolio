"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SkillsDisplay({ skills }) {
  // Categorize skills
  const categorizedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className="p-8 bg-black">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mb-2">
          Skills Overview
        </h2>
        <p className="text-sm text-neutral-500">
          {skills.length} skill{skills.length !== 1 ? "s" : ""} across{" "}
          {Object.keys(categorizedSkills).length} categor
          {Object.keys(categorizedSkills).length !== 1 ? "ies" : "y"}
        </p>
      </div>

      {Object.keys(categorizedSkills).length === 0 ? (
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
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          <p className="text-neutral-500 text-lg font-light">No skills found</p>
          <p className="text-neutral-600 text-sm mt-2">
            Add skills from the Manage Skills section
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(categorizedSkills).map(
            ([category, skillsList], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-neutral-900 border border-neutral-800 p-6"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                  <h3 className="text-xl font-light text-white">{category}</h3>
                  <span className="text-xs text-neutral-500">
                    {skillsList.length} skill
                    {skillsList.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {skillsList.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3 p-3 bg-neutral-800 border border-neutral-700 hover:border-neutral-600 transition-all duration-300 group"
                    >
                      {/* Icon - You can map icon names to actual components here */}
                      <div className="text-neutral-500 group-hover:text-white transition-colors flex-shrink-0">
                        {skill.icon || (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-neutral-300 group-hover:text-white transition-colors font-light truncate">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      )}

      {/* Skills Summary Stats */}
      {Object.keys(categorizedSkills).length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-4">
            <p className="text-2xl font-light text-white">{skills.length}</p>
            <p className="text-xs text-neutral-500 mt-1">Total Skills</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4">
            <p className="text-2xl font-light text-white">
              {Object.keys(categorizedSkills).length}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Categories</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4">
            <p className="text-2xl font-light text-white">
              {categorizedSkills["Web"]?.length || 0}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Web Technologies</p>
          </div>
        </div>
      )}
    </section>
  );
}
