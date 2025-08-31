"use client";

import Image from "next/image";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";

export default function ProjectList({ projects }) {
  const [showAddProject, setShowAddProject] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  // States for Add Project Form
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addLongDescription, setAddLongDescription] = useState("");
  const [addTechnologies, setAddTechnologies] = useState(""); // comma separated for add form
  const [addImageUrls, setAddImageUrls] = useState(""); // comma separated for add form
  const [addGithub, setAddGithub] = useState("");
  const [addLive, setAddLive] = useState("");
  const [addCategory, setAddCategory] = useState("");

  // States for Edit Project Form (will be populated from selectedProject)
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLongDescription, setEditLongDescription] = useState("");
  const [editTechnologies, setEditTechnologies] = useState([]); // array for edit form
  const [editImageUrls, setEditImageUrls] = useState([]); // array of objects { url: '' } for edit form
  const [editGithub, setEditGithub] = useState("");
  const [editLive, setEditLive] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const handleEditClick = (project) => {
    setOpenEditForm(true);
    setSelectedProject(project); // Keep selected project for ID reference

    // Initialize edit form states with selected project data
    setEditTitle(project.title || "");
    setEditDescription(project.description || "");
    setEditLongDescription(project.longDescription || "");
    setEditTechnologies(project.technologies ? [...project.technologies] : []); // Copy array
    setEditImageUrls(project.image ? [...project.image] : []); // Copy array of objects
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
      technologies: editTechnologies.filter(Boolean), // Filter out empty strings
      image: editImageUrls.filter((img) => img.url.trim() !== ""), // Filter out empty URLs
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
      // In a real app, you'd likely re-fetch projects or update local state here
      alert("Project updated successfully!");
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

      // Clear add form states
      setAddTitle("");
      setAddDescription("");
      setAddLongDescription("");
      setAddTechnologies("");
      setAddImageUrls("");
      setAddGithub("");
      setAddLive("");
      setAddCategory("");
      setShowAddProject(false);
      alert("Project added successfully!");
      // In a real app, you'd likely re-fetch projects or update local state here
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
        // In a real app, you'd likely re-fetch projects or update local state here
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  // Helper to reset add form states when closing modals
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
    <div className="bg-gray-950 text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-white">Manage Projects</h1>
        <button
          onClick={() => {
            resetAddFormStates();
            setShowAddProject(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <IoAddCircleOutline className="text-xl" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 && (
          <p className="col-span-full text-center text-gray-400 text-lg">
            No projects found. Add one to get started!
          </p>
        )}
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-sky-600"
          >
            <div className="relative h-48 w-full overflow-hidden">
              {project.image && project.image.length > 0 ? (
                <Image
                  src={project.image[0].url} // Displaying the first image as a thumbnail
                  alt={project.title}
                  fill // layout="fill" এর পরিবর্তে
                  style={{ objectFit: "cover" }} // objectFit এর পরিবর্তে
                  className="transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold mb-3 text-sky-400">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4 text-base line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index} // Use index if tech can be non-unique, or better, use a unique key if available
                    className="bg-gray-700 text-sm text-gray-200 px-3 py-1 rounded-full border border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors duration-300 flex items-center font-medium"
                >
                  <FaGithub className="mr-2 text-lg" /> GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-full transition-colors duration-300 shadow-md"
                >
                  Live Demo
                </a>
              </div>
            </div>
            <div className="p-4 bg-gray-900 flex justify-end gap-3 border-t border-gray-700">
              <button
                onClick={() => handleEditClick(project)}
                className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                <MdOutlineEdit className="text-lg" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(project)}
                className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                <MdDeleteOutline className="text-lg" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Project Modal */}
      {openEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-sky-400">
              Edit Project
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="edit-title"
                  className="block text-gray-300 text-sm font-medium mb-1"
                >
                  Title
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="edit-description"
                  className="block text-gray-300 text-sm font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-sky-500 resize-y"
                  rows="2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="edit-long-description"
                  className="block text-gray-300 text-sm font-medium mb-1"
                >
                  Long Description
                </label>
                <textarea
                  id="edit-long-description"
                  value={editLongDescription}
                  onChange={(e) => setEditLongDescription(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-sky-500 resize-y"
                  rows="4"
                  required
                />
              </div>

              {/* Technologies - Individual Inputs */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Technologies
                </label>
                {editTechnologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => {
                        const updatedTechs = [...editTechnologies];
                        updatedTechs[index] = e.target.value;
                        setEditTechnologies(updatedTechs);
                      }}
                      className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-sky-500"
                      placeholder={`Technology ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditTechnologies(
                          editTechnologies.filter((_, i) => i !== index)
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-sm"
                      aria-label="Remove technology"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setEditTechnologies([...editTechnologies, ""])}
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Add Technology
                </button>
              </div>

              {/* Image URLs - Individual Inputs */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1">
                  Project Images URL
                </label>
                {editImageUrls.map((img, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="url"
                      value={img.url}
                      onChange={(e) => {
                        const updatedImages = [...editImageUrls];
                        updatedImages[index] = { url: e.target.value };
                        setEditImageUrls(updatedImages);
                      }}
                      className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-sky-500"
                      placeholder={`Image URL ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditImageUrls(
                          editImageUrls.filter((_, i) => i !== index)
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-sm"
                      aria-label="Remove image URL"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditImageUrls([...editImageUrls, { url: "" }])
                  }
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Add Image URL
                </button>
              </div>

              <div>
                <label
                  htmlFor="edit-github"
                  className="block text-gray-300 text-sm font-medium mb-1"
                >
                  GitHub URL
                </label>
                <input
                  id="edit-github"
                  type="url"
                  value={editGithub}
                  onChange={(e) => setEditGithub(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="edit-live"
                  className="block text-gray-300 text-sm font-medium mb-1"
                >
                  Live Demo URL
                </label>
                <input
                  id="edit-live"
                  type="url"
                  value={editLive}
                  onChange={(e) => setEditLive(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="edit-category"
                  className="block text-gray-300 text-sm font-medium mb-1"
                >
                  Category
                </label>
                <input
                  id="edit-category"
                  type="text"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setOpenEditForm(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Project Modal (remains comma-separated) */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleAddSubmit}
            className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700"
          >
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">
              Add New Project
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Project Title"
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />

              <textarea
                placeholder="Short Description (max 150 characters)"
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                required
                rows={2}
                maxLength={150}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 resize-y focus:outline-none focus:border-yellow-500"
              />

              <textarea
                placeholder="Long Description"
                value={addLongDescription}
                onChange={(e) => setAddLongDescription(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 resize-y focus:outline-none focus:border-yellow-500"
              />

              <input
                type="text"
                placeholder="Technologies (comma separated)"
                value={addTechnologies}
                onChange={(e) => setAddTechnologies(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />

              <textarea
                placeholder="Image URLs (comma separated)"
                value={addImageUrls}
                onChange={(e) => setAddImageUrls(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 resize-y focus:outline-none focus:border-yellow-500"
              />

              <input
                type="url"
                placeholder="GitHub Repository URL"
                value={addGithub}
                onChange={(e) => setAddGithub(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />

              <input
                type="url"
                placeholder="Live Demo URL"
                value={addLive}
                onChange={(e) => setAddLive(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />

              <input
                type="text"
                placeholder="Category"
                value={addCategory}
                onChange={(e) => setAddCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div className="flex justify-end items-center mt-6 gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddProject(false);
                  resetAddFormStates();
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
