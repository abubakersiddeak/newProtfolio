"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaFigma } from "react-icons/fa";
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
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import SideNavbar from "./components/SideNavbar";
import SkillsDisplay from "./components/SkillsDisplay";
import ProjectsDisplay from "./components/ProjectsDisplay";
import ManageSkills from "./components/ManageSkils";
import ManageProjects from "./components/ManageProjects";
import ManageUser from "./components/ManageUser";

// Move constant data outside component to prevent recreation on every render
const INITIAL_SKILLS = [
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "React",
    icon: <FaReact className="text-sky-500" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "TailwindCSS",
    icon: <SiTailwindcss className="text-cyan-400" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "Framer Motion",
    icon: <TbBrandFramerMotion className="text-purple-500" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "Next.JS",
    icon: <SiNextdotjs className="text-white" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "Node.js",
    icon: <FaNodeJs className="text-green-600" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "Express.JS",
    icon: <SiExpress className="text-gray-200" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "Auth.JS",
    icon: <SiAuth0 className="text-orange-500" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Web",
    name: "MongoDB",
    icon: <SiMongodb className="text-green-600" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Programming",
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Programming",
    name: "Python",
    icon: <FaPython className="text-blue-400" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Programming",
    name: "Node.js",
    icon: <FaNodeJs className="text-green-600" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Tools",
    name: "Git",
    icon: <FaGitAlt className="text-orange-600" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Tools",
    name: "VS Code",
    icon: <VscVscode className="text-blue-600" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Tools",
    name: "NPM/Yarn",
    icon: <SiNpm className="text-red-600" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Tools",
    name: "Figma",
    icon: <FaFigma className="text-pink-500" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Tools",
    name: "Gimp",
    icon: <SiGimp className="text-sky-300" />,
  },
  {
    id: crypto.randomUUID(),
    category: "Tools",
    name: "Inkscape",
    icon: <SiInkscape className="text-indigo-300" />,
  },
];

// Memoized component map for better performance
const SECTION_COMPONENTS = {
  portfolio: ({ skills, projects }) => (
    <>
      <SkillsDisplay skills={skills} />
      <ProjectsDisplay projects={projects} />
    </>
  ),
  "manage-skills": ({ skills, setSkills }) => (
    <ManageSkills skills={skills} setSkills={setSkills} />
  ),
  "manage-projects": ({ projects, setProjects }) => (
    <ManageProjects projects={projects} setProjects={setProjects} />
  ),
  "manage-users": () => <ManageUser />,
};

export default function Page() {
  const [activeSection, setActiveSection] = useState("portfolio");
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize fetch function
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/project");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setProjects(data);
      setError(null);
    } catch (error) {
      console.error("Project fetch failed:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Render active section component
  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className="bg-gray-900 font-sans min-h-screen flex">
      <SideNavbar setActiveSection={setActiveSection} />

      <main className="flex-1 ml-64">
        {isLoading && activeSection === "portfolio" ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-white">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-screen">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : (
          <ActiveComponent
            skills={skills}
            setSkills={setSkills}
            projects={projects}
            setProjects={setProjects}
          />
        )}
      </main>
    </div>
  );
}
