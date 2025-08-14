"use client";

import React, { useState, useEffect } from "react";
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
// import { projects as initialProjects } from "../db/projects";
import SideNavbar from "./components/SideNavbar";
import SkillsDisplay from "./components/SkillsDisplay";
import ProjectsDisplay from "./components/ProjectsDisplay";
import ManageSkills from "./components/ManageSkils";
import ManageProjects from "./components/ManageProjects";
import ManageUser from "./components/ManageUser";
const generateUniqueId = () => crypto.randomUUID();

const initialSkills = [
  {
    id: generateUniqueId(),
    category: "Web",
    name: "React",
    icon: <FaReact className="text-sky-500" />,
  },
  {
    id: generateUniqueId(),
    category: "Web",
    name: "TailwindCSS",
    icon: <SiTailwindcss className="text-cyan-400" />,
  },
  {
    id: generateUniqueId(),
    category: "Web",
    name: "Framer Motion",
    icon: <TbBrandFramerMotion className="text-purple-500" />,
  },
  {
    id: generateUniqueId(),
    category: "Web",
    name: "Next.JS",
    icon: <SiNextdotjs className="text-white" />,
  },
  {
    id: generateUniqueId(),
    category: "Web",
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
  },
  {
    id: generateUniqueId(),
    category: "Web",
    name: "Node.js",
    icon: <FaNodeJs className="text-green-600" />,
  },
  {
    id: generateUniqueId(),
    category: "Web",
    name: "Express.JS",
    icon: <SiExpress className="text-gray-200" />,
  },
  {
    id: generateUniqueId(),
    category: "Web",
    name: "Auth.JS",
    icon: <SiAuth0 className="text-orange-500" />,
  },
  {
    id: generateUniqueId(),
    category: "Web",
    name: "MongoDB",
    icon: <SiMongodb className="text-green-600" />,
  },
  {
    id: generateUniqueId(),
    category: "Programming",
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
  },
  {
    id: generateUniqueId(),
    category: "Programming",
    name: "Python",
    icon: <FaPython className="text-blue-400" />,
  },
  {
    id: generateUniqueId(),
    category: "Programming",
    name: "Node.js",
    icon: <FaNodeJs className="text-green-600" />,
  },
  {
    id: generateUniqueId(),
    category: "Tools",
    name: "Git",
    icon: <FaGitAlt className="text-orange-600" />,
  },
  {
    id: generateUniqueId(),
    category: "Tools",
    name: "VS Code",
    icon: <VscVscode className="text-blue-600" />,
  },
  {
    id: generateUniqueId(),
    category: "Tools",
    name: "NPM/Yarn",
    icon: <SiNpm className="text-red-600" />,
  },
  {
    id: generateUniqueId(),
    category: "Tools",
    name: "Figma",
    icon: <FaFigma className="text-pink-500" />,
  },
  {
    id: generateUniqueId(),
    category: "Tools",
    name: "Gimp",
    icon: <SiGimp className="text-sky-300" />,
  },
  {
    id: generateUniqueId(),
    category: "Tools",
    name: "Inkscape",
    icon: <SiInkscape className="text-indigo-300" />,
  },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState("portfolio"); //
  const [skills, setSkills] = useState(initialSkills);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function getProjects() {
      try {
        const res = await fetch("/api/project");
        const projects = await res.json();

        setProjects(projects);
      } catch (error) {
        console.log("Project fetch failed ");
      }
    }
    getProjects();
  }, []);

  return (
    <div className="bg-gray-900 font-sans min-h-screen flex">
      <SideNavbar setActiveSection={setActiveSection} />

      <div className="flex-1 ml-64">
        <main>
          {activeSection === "portfolio" && (
            <>
              <SkillsDisplay skills={skills} />
              <ProjectsDisplay projects={projects} />
            </>
          )}

          {activeSection === "manage-skills" && (
            <ManageSkills skills={skills} setSkills={setSkills} />
          )}

          {activeSection === "manage-projects" && (
            <ManageProjects projects={projects} setProjects={setProjects} />
          )}
          {activeSection === "manage-users" && <ManageUser />}
        </main>
      </div>
    </div>
  );
}
