"use client";
import { useState, useEffect } from "react";
import AnimatedSection from "../components/AnimatedSection";

const Skills = () => {
  const [animatedSkills, setAnimatedSkills] = useState({});

  const skills = [
    { name: "React", level: 90, color: "bg-indigo-500 dark:bg-indigo-500" },
    {
      name: "JavaScript",
      level: 85,
      color: "bg-purple-500 dark:bg-purple-500",
    },
    { name: "Node.js", level: 80, color: "bg-blue-500 dark:bg-blue-500" },
    { name: "Python", level: 75, color: "bg-indigo-600 dark:bg-indigo-600" },
    { name: "CSS/SCSS", level: 90, color: "bg-purple-600 dark:bg-purple-600" },
    { name: "MongoDB", level: 70, color: "bg-blue-600 dark:bg-blue-600" },
    { name: "Git", level: 85, color: "bg-indigo-500 dark:bg-indigo-500" },
    { name: "Docker", level: 65, color: "bg-purple-400 dark:bg-purple-400" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const animated = {};
      skills.forEach((skill, index) => {
        setTimeout(() => {
          animated[skill.name] = skill.level;
          setAnimatedSkills((prev) => ({ ...prev, [skill.name]: skill.level }));
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              My{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Skills
              </span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-xl text-slate-700 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Here are the technologies and tools I work with to create amazing
              digital experiences.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <AnimatedSection key={skill.name} delay={index * 100}>
              <div className="bg-gray-50 dark:bg-slate-900 p-4 sm:p-6 rounded-lg border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h3 className="text-slate-900 dark:text-white font-semibold text-base sm:text-lg">
                    {skill.name}
                  </h3>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm sm:text-base">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 sm:h-3">
                  <div
                    className={`h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out ${skill.color}`}
                    style={{ width: `${animatedSkills[skill.name] || 0}%` }}
                  ></div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={800}>
          <div className="text-center mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 sm:mb-8">
              Additional Expertise
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {[
                "Responsive Design",
                "RESTful APIs",
                "GraphQL",
                "Testing",
                "Agile/Scrum",
                "CI/CD",
                "Cloud Services",
                "Performance Optimization",
              ].map((expertise) => (
                <div
                  key={expertise}
                  className="bg-gray-50 dark:bg-slate-900 p-3 sm:p-4 rounded-lg text-center border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg"
                >
                  <span className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">
                    {expertise}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
