"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectList({ projects }) {
  const [showAddProject, setShowAddProject] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  // States for Add Project Form
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addLongDescription, setAddLongDescription] = useState("");
  const [addTechnologies, setAddTechnologies] = useState("");
  const [addImageUrls, setAddImageUrls] = useState("");
  const [addGithub, setAddGithub] = useState("");
  const [addLive, setAddLive] = useState("");
  const [addCategory, setAddCategory] = useState("");

  // States for Edit Project Form
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLongDescription, setEditLongDescription] = useState("");
  const [editTechnologies, setEditTechnologies] = useState([]);
  const [editImageUrls, setEditImageUrls] = useState([]);
  const [editGithub, setEditGithub] = useState("");
  const [editLive, setEditLive] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleEditClick = (project) => {
    setOpenEditForm(true);
    setSelectedProject(project);

    setEditTitle(project.title || "");
    setEditDescription(project.description || "");
    setEditLongDescription(project.longDescription || "");
    setEditTechnologies(project.technologies ? [...project.technologies] : []);
    setEditImageUrls(project.image ? [...project.image] : []);
    setEditGithub(project.github || "");
    setEditLive(project.live || "");
    setEditCategory(project.category || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProject = {
      title: editTitle,
      description: editDescription,
      longDescription: editLongDescription,
      technologies: editTechnologies.filter(Boolean),
      image: editImageUrls.filter((img) => img.url.trim() !== ""),
      github: editGithub,
      live: editLive,
      category: editCategory,
    };

    try {
      const response = await fetch(`/api/project/${selectedProject._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      setOpenEditForm(false);
      alert("Project updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const images = addImageUrls
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url) => ({ url }));

    const techs = addTechnologies
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);

    const newProject = {
      title: addTitle,
      description: addDescription,
      longDescription: addLongDescription,
      technologies: techs,
      image: images,
      github: addGithub,
      live: addLive,
      category: addCategory,
    };

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        throw new Error("Failed to add project");
      }

      resetAddFormStates();
      setShowAddProject(false);
      alert("Project added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again.");
    }
  };

  const handleDelete = async (project) => {
    const id = project._id;
    if (
      confirm(
        "Are you sure you want to DELETE this Project? This action cannot be undone."
      )
    ) {
      try {
        const res = await fetch(`/api/project/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to delete project");
        }
        alert("Project deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  const resetAddFormStates = () => {
    setAddTitle("");
    setAddDescription("");
    setAddLongDescription("");
    setAddTechnologies("");
    setAddImageUrls("");
    setAddGithub("");
    setAddLive("");
    setAddCategory("");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Manage Projects
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => {
            resetAddFormStates();
            setShowAddProject(true);
          }}
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
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 && (
          <div className="col-span-full text-center py-20">
            <p className="text-neutral-500 text-lg font-light">
              No projects found. Add one to get started!
            </p>
          </div>
        )}
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col hover:border-neutral-700 transition-colors"
          >
            {/* Project Image */}
            <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
              {project.image && project.image.length > 0 ? (
                <Image
                  src={project.image[0].url}
                  alt={project.title}
                  fill
                  className="object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-700">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-xl font-light text-white line-clamp-1">
                  {project.title}
                </h3>
                {project.category && (
                  <span className="text-xs text-neutral-500 whitespace-nowrap">
                    {project.category}
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed font-light line-clamp-3 mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {project.technologies.slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
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

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-neutral-800">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 border border-neutral-700 hover:border-neutral-600 transition-colors text-xs font-medium"
                >
                  GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 bg-white text-black hover:bg-neutral-200 transition-colors text-xs font-medium"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-neutral-950 flex gap-3 border-t border-neutral-800">
              <button
                onClick={() => handleEditClick(project)}
                className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-neutral-700 hover:border-neutral-600 transition-colors text-xs font-medium"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>
              <button
                onClick={() => handleDelete(project)}
                className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-red-900/50 hover:border-red-800 text-red-400 transition-colors text-xs font-medium"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Project Modal */}
      <AnimatePresence>
        {openEditForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-40 p-4"
            onClick={() => setOpenEditForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
                Edit Project
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Description
                  </label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors resize-none font-light"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Long Description
                  </label>
                  <textarea
                    value={editLongDescription}
                    onChange={(e) => setEditLongDescription(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors resize-none font-light"
                    rows={4}
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-3 font-light">
                    Technologies
                  </label>
                  {editTechnologies.map((tech, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => {
                          const updatedTechs = [...editTechnologies];
                          updatedTechs[index] = e.target.value;
                          setEditTechnologies(updatedTechs);
                        }}
                        className="flex-1 px-0 py-2 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light text-sm"
                        placeholder={`Technology ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setEditTechnologies(
                            editTechnologies.filter((_, i) => i !== index)
                          )
                        }
                        className="cursor-pointer p-2 border border-neutral-800 hover:border-red-900 text-red-400 transition-colors"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setEditTechnologies([...editTechnologies, ""])
                    }
                    className="cursor-pointer mt-2 px-4 py-2 border border-neutral-800 hover:border-neutral-700 text-sm font-light transition-colors"
                  >
                    Add Technology
                  </button>
                </div>

                {/* Image URLs */}
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-3 font-light">
                    Image URLs
                  </label>
                  {editImageUrls.map((img, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={img.url}
                        onChange={(e) => {
                          const updatedImages = [...editImageUrls];
                          updatedImages[index] = { url: e.target.value };
                          setEditImageUrls(updatedImages);
                        }}
                        className="flex-1 px-0 py-2 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light text-sm"
                        placeholder={`Image URL ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setEditImageUrls(
                            editImageUrls.filter((_, i) => i !== index)
                          )
                        }
                        className="cursor-pointer p-2 border border-neutral-800 hover:border-red-900 text-red-400 transition-colors"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setEditImageUrls([...editImageUrls, { url: "" }])
                    }
                    className="cursor-pointer mt-2 px-4 py-2 border border-neutral-800 hover:border-neutral-700 text-sm font-light transition-colors"
                  >
                    Add Image URL
                  </button>
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={editLive}
                    onChange={(e) => setEditLive(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setOpenEditForm(false)}
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

      {/* Add Project Modal - Similar styling */}
      <AnimatePresence>
        {showAddProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-40 p-4"
            onClick={() => setShowAddProject(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
                Add New Project
              </h2>
              <form onSubmit={handleAddSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                />

                <textarea
                  placeholder="Short Description"
                  value={addDescription}
                  onChange={(e) => setAddDescription(e.target.value)}
                  required
                  rows={2}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors resize-none font-light"
                />

                <textarea
                  placeholder="Long Description"
                  value={addLongDescription}
                  onChange={(e) => setAddLongDescription(e.target.value)}
                  rows={4}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors resize-none font-light"
                />

                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  value={addTechnologies}
                  onChange={(e) => setAddTechnologies(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                />

                <textarea
                  placeholder="Image URLs (comma separated)"
                  value={addImageUrls}
                  onChange={(e) => setAddImageUrls(e.target.value)}
                  rows={3}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors resize-none font-light"
                />

                <input
                  type="url"
                  placeholder="GitHub Repository URL"
                  value={addGithub}
                  onChange={(e) => setAddGithub(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                />

                <input
                  type="url"
                  placeholder="Live Demo URL"
                  value={addLive}
                  onChange={(e) => setAddLive(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={addCategory}
                  onChange={(e) => setAddCategory(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                />

                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddProject(false);
                      resetAddFormStates();
                    }}
                    className="cursor-pointer flex-1 px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer flex-1 px-6 py-3 bg-white text-black hover:bg-neutral-200 text-sm font-medium transition-colors"
                  >
                    Add Project
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
