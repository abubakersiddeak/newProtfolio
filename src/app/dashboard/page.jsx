"use client";
import React, { useState, useEffect, useMemo } from "react"; // Added useMemo import
import {
  MdDashboard,
  MdFolder,
  MdCode,
  MdMail,
  MdAddCircle,
  MdEdit,
  MdDelete,
  MdLaunch,
} from "react-icons/md";

// Import your project data
import { projects as initialProjectsData } from "../db/projects";

// Import icons for skill categories (assuming you have these installed)
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaFigma,
  FaUbuntu,
  FaWindows,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiJavascript,
  SiExpress,
  SiAuth0,
  SiMongodb,
  SiNpm,
  SiGimp,
  SiInkscape,
  SiKalilinux,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

export default function Page() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Initial dummy data for local state
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    bio: "A passionate Full Stack Developer with a knack for creating intuitive and dynamic web applications. Specializing in React, Node.js, and modern web technologies.",
    profileImageUrl: "https://placehold.co/150x150/1f2937/d1d5db?text=JD", // Dark theme friendly placeholder
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
  });

  // Using your imported project data directly
  const [projects, setProjects] = useState(initialProjectsData);

  // Initial dummy data for skills (you might want to integrate skillCategories data here if you want icons in editable skills)
  const [skills, setSkills] = useState([
    { id: "skill1", name: "JavaScript", category: "Programming Languages" },
    { id: "skill2", name: "React.js", category: "Frontend Frameworks" },
    { id: "skill3", name: "Node.js", category: "Backend" },
    { id: "skill4", name: "Express.js", category: "Backend" },
    { id: "skill5", name: "MongoDB", category: "Databases" },
    { id: "skill6", name: "Tailwind CSS", category: "Styling" },
    { id: "skill7", name: "Git", category: "Tools" },
    { id: "skill8", name: "RESTful APIs", category: "Concepts" },
  ]);

  // Skill categories with icons (from your provided data)
  // Note: This data structure is for display only. If you want these icons
  // to be associated with your *editable* `skills` state, you'd need to
  // adjust how skills are added/edited to include an icon property.
  const skillCategoriesWithIcons = useMemo(
    () => ({
      Web: [
        { name: "React", icon: <FaReact className="text-sky-500" /> },
        {
          name: "TailwindCSS",
          icon: <SiTailwindcss className="text-cyan-400" />,
        },
        {
          name: "Framer Motion",
          icon: <TbBrandFramerMotion className="text-purple-500" />,
        },
        { name: "Next.JS", icon: <SiNextdotjs className="text-white" /> },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-yellow-400" />,
        },
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
        { name: "Express.JS", icon: <SiExpress className="text-gray-200" /> },
        { name: "Auth.JS", icon: <SiAuth0 className="text-orange-500" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      ],
      Programming: [
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-yellow-400" />,
        },
        { name: "Python", icon: <FaPython className="text-blue-400" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
      ],
      Tools: [
        { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
        { name: "VS Code", icon: <VscVscode className="text-blue-600" /> },
        { name: "NPM/Yarn", icon: <SiNpm className="text-red-600" /> },
        { name: "Figma", icon: <FaFigma className="text-pink-500" /> },
        { name: "Gimp", icon: <SiGimp className="text-sky-300" /> },
        { name: "Inkscape", icon: <SiInkscape className="text-indigo-300" /> },
      ],
      "Operating Systems": [
        { name: "Ubuntu", icon: <FaUbuntu className="text-orange-300" /> },
        { name: "Kali Linux", icon: <SiKalilinux className="text-blue-300" /> },
        { name: "Windows", icon: <FaWindows className="text-cyan-300" /> },
      ],
    }),
    []
  );

  // State for project modal
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    longDescription: "",
    image: "", // Consistent with your projects data
    technologies: "", // Will be a string for input, then split into array
    live: "", // Consistent with your projects data
    category: "",
    github: "", // Consistent with your projects data
  });

  // State for profile modal
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState(profile); // Initialize with current profile

  // State for skill modal
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "",
  });

  // Handle Profile Update (local state only)
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setProfile(profileForm);
    setShowProfileModal(false);
  };

  // Handle Project Operations (local state only)
  const handleAddOrUpdateProject = (e) => {
    e.preventDefault();
    let updatedProjects;
    // Split technologies string into an array
    const technologiesArray = projectForm.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech !== "");

    const projectToSave = {
      ...projectForm,
      technologies: technologiesArray,
    };

    if (editingProject) {
      // Update existing project
      updatedProjects = projects.map((p) =>
        p.id === editingProject.id ? { ...projectToSave, id: p.id } : p
      );
    } else {
      // Add new project
      updatedProjects = [
        ...projects,
        { ...projectToSave, id: crypto.randomUUID() },
      ];
    }
    setProjects(updatedProjects);
    setShowProjectModal(false);
    setEditingProject(null);
    setProjectForm({
      title: "",
      description: "",
      longDescription: "",
      image: "",
      technologies: "", // Reset as string
      live: "",
      category: "",
      github: "",
    });
  };

  const handleDeleteProject = (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
  };

  const openProjectModal = (project = null) => {
    setEditingProject(project);
    // When editing, convert technologies array back to comma-separated string for the form
    setProjectForm(
      project
        ? {
            ...project,
            technologies: project.technologies
              ? project.technologies.join(", ")
              : "",
          }
        : {
            title: "",
            description: "",
            longDescription: "",
            image: "",
            technologies: "",
            live: "",
            category: "",
            github: "",
          }
    );
    setShowProjectModal(true);
  };

  // Handle Skill Operations (local state only)
  const handleAddOrUpdateSkill = (e) => {
    e.preventDefault();
    let updatedSkills;
    if (editingSkill) {
      // Update existing skill
      updatedSkills = skills.map((s) =>
        s.id === editingSkill.id ? { ...skillForm, id: s.id } : s
      );
    } else {
      // Add new skill
      updatedSkills = [...skills, { ...skillForm, id: crypto.randomUUID() }];
    }
    setSkills(updatedSkills);
    setShowSkillModal(false);
    setEditingSkill(null);
    setSkillForm({ name: "", category: "" });
  };

  const handleDeleteSkill = (skillId) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    const updatedSkills = skills.filter((s) => s.id !== skillId);
    setSkills(updatedSkills);
  };

  const openSkillModal = (skill = null) => {
    setEditingSkill(skill);
    setSkillForm(skill || { name: "", category: "" });
    setShowSkillModal(true);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gray-800 shadow-lg p-6 flex flex-col items-center lg:items-start border-b lg:border-r border-gray-700">
        <div className="flex items-center space-x-3 mb-8 w-full justify-center lg:justify-start">
          <MdDashboard className="h-8 w-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        </div>
        <nav className="space-y-4 w-full">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-all duration-200 ${
              activeSection === "dashboard"
                ? "bg-blue-700 text-white shadow-md"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <MdDashboard className="h-5 w-5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveSection("projects")}
            className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-all duration-200 ${
              activeSection === "projects"
                ? "bg-blue-700 text-white shadow-md"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <MdFolder className="h-5 w-5" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveSection("skills")}
            className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-all duration-200 ${
              activeSection === "skills"
                ? "bg-blue-700 text-white shadow-md"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <MdCode className="h-5 w-5" />
            <span>Skills</span>
          </button>
          <button
            onClick={() => setActiveSection("contact")}
            className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-all duration-200 ${
              activeSection === "contact"
                ? "bg-blue-700 text-white shadow-md"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <MdMail className="h-5 w-5" />
            <span>Contact Info</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        {/* Overview Section */}
        {activeSection === "dashboard" && profile && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <img
                src={profile.profileImageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/150x150/1f2937/d1d5db?text=JD";
                }}
              />
              <div className="text-center md:text-left flex-1">
                <h2 className="text-4xl font-extrabold text-gray-100 mb-2">
                  {profile.name}
                </h2>
                <p className="text-lg text-gray-300 mb-4">{profile.bio}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-blue-900 px-4 py-2 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-blue-200">
                      Total Projects: {projects.length}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setProfileForm(profile);
                      setShowProfileModal(true);
                    }}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
                  >
                    <MdEdit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">My Projects</h2>
              <button
                onClick={() => openProjectModal()}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
              >
                <MdAddCircle className="h-5 w-5" />
                <span>Add Project</span>
              </button>
            </div>
            {projects.length === 0 ? (
              <p className="text-gray-400 text-center py-10">
                No projects added yet. Click "Add Project" to get started!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x250/1f2937/d1d5db?text=Project+Image";
                      }}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-100 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies &&
                          project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-3">
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                            >
                              <span>Live</span>
                              <MdLaunch className="h-4 w-4" />
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                            >
                              <span>GitHub</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="inline-block"
                              >
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.3-0.3 6.6-1.6 6.6-7c0-1.6-0.6-2.9-1.5-3.9 0.2-0.3 0.7-1.5-0.2-3.8 0 0-1.3-0.4-4.2 1.4-1.2-0.3-2.5-0.5-3.8-0.5s-2.6 0.2-3.8 0.5c-2.9-1.8-4.2-1.4-4.2-1.4-0.9 2.3-0.4 3.5-0.2 3.8-0.9 1-1.5 2.3-1.5 3.9 0 5.4 3.3 6.7 6.6 7-0.7 0.6-1.2 1.7-1.2 3.2v4"></path>
                              </svg>
                            </a>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openProjectModal(project)}
                            className="p-2 rounded-full bg-yellow-700 text-yellow-100 hover:bg-yellow-600 transition-colors duration-200"
                            title="Edit Project"
                          >
                            <MdEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 rounded-full bg-red-700 text-red-100 hover:bg-red-600 transition-colors duration-200"
                            title="Delete Project"
                          >
                            <MdDelete className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-100">My Skills</h2>
              <button
                onClick={() => openSkillModal()}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
              >
                <MdAddCircle className="h-5 w-5" />
                <span>Add Skill</span>
              </button>
            </div>
            {skills.length === 0 ? (
              <p className="text-gray-400 text-center py-10">
                No skills added yet. Click "Add Skill" to list your expertise!
              </p>
            ) : (
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                {/* Group skills by category */}
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    const category = skill.category || "Uncategorized";
                    if (!acc[category]) {
                      acc[category] = [];
                    }
                    acc[category].push(skill);
                    return acc;
                  }, {})
                ).map(([category, categorySkills]) => (
                  <div key={category} className="mb-6 last:mb-0">
                    <h3 className="text-xl font-semibold text-gray-200 mb-3 border-b pb-2 border-gray-700">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center bg-blue-900 text-blue-200 px-4 py-2 rounded-full shadow-sm text-sm font-medium"
                        >
                          <span>{skill.name}</span>
                          <button
                            onClick={() => openSkillModal(skill)}
                            className="ml-2 p-1 rounded-full hover:bg-blue-800 transition-colors duration-200"
                            title="Edit Skill"
                          >
                            <MdEdit className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="ml-1 p-1 rounded-full hover:bg-blue-800 transition-colors duration-200"
                            title="Delete Skill"
                          >
                            <MdDelete className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contact Info Section */}
        {activeSection === "contact" && profile && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-100 mb-6">
              Contact Information
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center space-x-3">
                <MdMail className="h-5 w-5 text-blue-400" />
                <span>
                  Email:{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-blue-400 hover:underline"
                  >
                    {profile.email}
                  </a>
                </span>
              </p>
              <p className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-blue-400"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Phone: {profile.phone}</span>
              </p>
              {profile.linkedin && (
                <p className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-blue-400"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>
                    LinkedIn:{" "}
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {profile.linkedin}
                    </a>
                  </span>
                </p>
              )}
              {profile.github && (
                <p className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-blue-400"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.3-0.3 6.6-1.6 6.6-7c0-1.6-0.6-2.9-1.5-3.9 0.2-0.3 0.7-1.5-0.2-3.8 0 0-1.3-0.4-4.2 1.4-1.2-0.3-2.5-0.5-3.8-0.5s-2.6 0.2-3.8 0.5c-2.9-1.8-4.2-1.4-4.2-1.4-0.9 2.3-0.4 3.5-0.2 3.8-0.9 1-1.5 2.3-1.5 3.9 0 5.4 3.3 6.7 6.6 7-0.7 0.6-1.2 1.7-1.2 3.2v4"></path>
                  </svg>
                  <span>
                    GitHub:{" "}
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {profile.github}
                    </a>
                  </span>
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setProfileForm(profile);
                setShowProfileModal(true);
              }}
              className="mt-6 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
            >
              <MdEdit className="h-4 w-4" />
              <span>Edit Contact Info</span>
            </button>
          </div>
        )}
      </main>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-lg">
            <h3 className="text-2xl font-bold text-gray-100 mb-6">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleAddOrUpdateProject} className="space-y-4">
              <div>
                <label
                  htmlFor="projectTitle"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="projectDescription"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Short Description
                </label>
                <textarea
                  id="projectDescription"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                  rows="2"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="projectLongDescription"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Long Description
                </label>
                <textarea
                  id="projectLongDescription"
                  value={projectForm.longDescription}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      longDescription: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="projectImage"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Image URL
                </label>
                <input
                  type="url"
                  id="projectImage"
                  value={projectForm.image}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, image: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="projectTechnologies"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  id="projectTechnologies"
                  value={projectForm.technologies}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      technologies: e.target.value,
                    })
                  }
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="projectLiveUrl"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Live Demo URL
                </label>
                <input
                  type="url"
                  id="projectLiveUrl"
                  value={projectForm.live} // Using 'live' from your data
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      live: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="projectGithubUrl"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="projectGithubUrl"
                  value={projectForm.github} // Using 'github' from your data
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      github: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="projectCategory"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="projectCategory"
                  value={projectForm.category}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, category: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-5 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                >
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-lg">
            <h3 className="text-2xl font-bold text-gray-100 mb-6">
              Edit Profile
            </h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label
                  htmlFor="profileName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="profileName"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="profileBio"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="profileBio"
                  value={profileForm.bio}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, bio: e.target.value })
                  }
                  rows="3"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="profileImageUrl"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Profile Image URL
                </label>
                <input
                  type="url"
                  id="profileImageUrl"
                  value={profileForm.profileImageUrl}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      profileImageUrl: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="profileEmail"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="profileEmail"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="profilePhone"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="profilePhone"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="profileLinkedin"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="profileLinkedin"
                  value={profileForm.linkedin}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, linkedin: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="profileGithub"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  GitHub URL
                </label>
                <input
                  type="url"
                  id="profileGithub"
                  value={profileForm.github}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, github: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-5 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-lg">
            <h3 className="text-2xl font-bold text-gray-100 mb-6">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h3>
            <form onSubmit={handleAddOrUpdateSkill} className="space-y-4">
              <div>
                <label
                  htmlFor="skillName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Skill Name
                </label>
                <input
                  type="text"
                  id="skillName"
                  value={skillForm.name}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="skillCategory"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="skillCategory"
                  value={skillForm.category}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, category: e.target.value })
                  }
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {/* You might want a <select> dropdown here for predefined categories from skillCategoriesWithIcons */}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowSkillModal(false)}
                  className="px-5 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                >
                  {editingSkill ? "Update Skill" : "Add Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
