"use client";
import { useState, useMemo } from "react";
import AnimatedSection from "../components/AnimatedSection";
import { VscVscode } from "react-icons/vsc";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaFigma } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiNpm,
  SiExpress,
  SiAuth0,
  SiGimp,
  SiInkscape, // Import Inkscape
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("Web");

  // 🧠 Skill category and icon color
  const skillCategories = useMemo(
    () => ({
      Web: [
        { name: "React", icon: <FaReact className="text-sky-500" /> },
        {
          name: "TailwindCSS",
          icon: <SiTailwindcss className="text-cyan-400" />,
        },
        {
          name: "Framer Motion",
          icon: (
            <TbBrandFramerMotion className="text-purple-500" />
          ) /* Changed color for better visibility */,
        },
        {
          name: "Next.JS",
          icon: <SiNextdotjs className="text-white" />,
        },
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-yellow-400" />,
        },
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
        {
          name: "Express.JS",
          icon: <SiExpress className="text-gray-200" />,
        },
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
        {
          name: "Gimp",
          icon: <SiGimp className="text-sky-300" /> /* Adjusted color */,
        },
        {
          name: "Inkscape",
          icon: (
            <SiInkscape className="text-indigo-300" />
          ) /* Adjusted color and name */,
        },
      ],
    }),
    []
  );

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-24 bg-black/65 transition-colors duration-500 font-mono"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-cyan-500   mb-4 sm:mb-6">
              My Skills
            </h2>
            <div className="w-20 sm:w-28 h-1.5 bg-indigo-400 mx-auto rounded-full mb-8"></div>
          </div>
        </AnimatedSection>

        {/* Tabs */}
        <AnimatedSection delay={200}>
          <div
            className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-14 max-w-4xl mx-auto"
            role="tablist" // Accessibility: Tab list role
          >
            {Object.keys(skillCategories).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl font-semibold text-base sm:text-lg  transition-all cursor-pointer duration-300
                  ${
                    activeTab === tab
                      ? " text-white shadow-lg bg-cyan-600"
                      : "   bg-gray-900 text-white hover:bg-gray-600"
                  }`}
                role="tab" // Accessibility: Tab role
                aria-selected={activeTab === tab} // Accessibility: Selected state
                aria-controls={`panel-${tab}`} // Accessibility: Link to tab panel (if you had one)
              >
                {tab}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Skill Cards */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 max-w-4xl mx-auto"
          id={`panel-${activeTab}`} // Accessibility: Tab panel ID
          role="tabpanel" // Accessibility: Tab panel role
        >
          {(skillCategories[activeTab] || []).map((skill, index) => (
            <AnimatedSection
              key={`${skill.name}-${index}`}
              delay={index * 50 + 400}
            >
              <div
                className=" bg-black/50 p-5 sm:p-6 rounded-xl border border-dashed border-gray-700 shadow-lg flex items-center space-x-4
                          hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {" "}
                {/* Added hover effect */}
                <div className=" text-5xl">{skill.icon}</div>
                <h3 className="text-white font-semibold text-lg sm:text-xl">
                  {skill.name}
                </h3>
              </div>
            </AnimatedSection>
          ))}
          {/* Optional: Empty state message */}
          {(skillCategories[activeTab] || []).length === 0 && (
            <p className="text-center text-gray-400 col-span-full">
              No skills listed for this category yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
