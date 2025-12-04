"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageSkills({ skills, setSkills }) {
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({
    category: "",
    name: "",
    icon: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (newSkill.name && newSkill.category) {
      const skillToAdd = {
        id: Date.now().toString(),
        category: newSkill.category,
        name: newSkill.name,
        icon: newSkill.icon || "FaTools",
      };

      setSkills([...skills, skillToAdd]);
      setNewSkill({ category: "", name: "", icon: "" });
      setShowAddForm(false);
      alert("Skill added successfully!");
    }
  };

  const handleUpdateSkill = (e) => {
    e.preventDefault();
    if (editingSkill) {
      setSkills(
        skills.map((skill) =>
          skill.id === editingSkill.id ? editingSkill : skill
        )
      );
      setEditingSkill(null);
      alert("Skill updated successfully!");
    }
  };

  const handleDeleteSkill = (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter((skill) => skill.id !== id));
      alert("Skill deleted successfully!");
    }
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Manage Skills
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {skills.length} skill{skills.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="cursor-pointer px-6 py-3 bg-white text-black text-sm font-medium tracking-wide transition-all duration-300 hover:bg-neutral-200 flex items-center gap-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Skill
        </button>
      </div>

      {/* Skills by Category */}
      <div className="space-y-8">
        {Object.keys(groupedSkills).length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-lg font-light">
              No skills found. Add one to get started!
            </p>
          </div>
        )}

        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div
            key={category}
            className="bg-neutral-900 border border-neutral-800 p-6"
          >
            <h2 className="text-xl font-light text-white mb-4 pb-3 border-b border-neutral-800">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categorySkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-neutral-800 border border-neutral-700 p-4 flex items-center justify-between gap-3 hover:border-neutral-600 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="text-neutral-500 text-xl flex-shrink-0">
                      {/* Icon placeholder - you can map icon names to actual icons here */}
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
                    </div>
                    <span className="text-sm text-neutral-200 font-light truncate">
                      {skill.name}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingSkill(skill)}
                      className="cursor-pointer p-1.5 border border-neutral-700 hover:border-neutral-600 transition-colors"
                      title="Edit"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="cursor-pointer p-1.5 border border-red-900/50 hover:border-red-800 text-red-400 transition-colors"
                      title="Delete"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-40 p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 w-full max-w-md"
            >
              <h2 className="text-2xl font-light text-white mb-6">
                Add New Skill
              </h2>
              <form onSubmit={handleAddSkill} className="space-y-5">
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newSkill.category}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, category: e.target.value })
                    }
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                    placeholder="e.g., Web, Programming, Tools"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, name: e.target.value })
                    }
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                    placeholder="e.g., React, Python"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Icon Name (optional)
                  </label>
                  <input
                    type="text"
                    value={newSkill.icon}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, icon: e.target.value })
                    }
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                    placeholder="FaReact, FaPython, etc."
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewSkill({ category: "", name: "", icon: "" });
                    }}
                    className="cursor-pointer flex-1 px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer flex-1 px-6 py-3 bg-white text-black hover:bg-neutral-200 text-sm font-medium transition-colors"
                  >
                    Add Skill
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Skill Modal */}
      <AnimatePresence>
        {editingSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-40 p-4"
            onClick={() => setEditingSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 w-full max-w-md"
            >
              <h2 className="text-2xl font-light text-white mb-6">
                Edit Skill
              </h2>
              <form onSubmit={handleUpdateSkill} className="space-y-5">
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingSkill.category}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, name: e.target.value })
                    }
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    value={editingSkill.icon || ""}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, icon: e.target.value })
                    }
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light"
                    placeholder="FaReact, FaPython, etc."
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setEditingSkill(null)}
                    className="cursor-pointer flex-1 px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer flex-1 px-6 py-3 bg-white text-black hover:bg-neutral-200 text-sm font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
