import React from "react";

export default function SkillsDisplay({ skills }) {
  const categorizedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-400">
          My Skills
        </h2>
        <div id="skill-categories" className="grid md:grid-cols-3 gap-8">
          {Object.entries(categorizedSkills).map(([category, skillsList]) => (
            <div
              key={category}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center text-yellow-400">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skillsList.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex flex-col items-center p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="text-3xl mb-2">{skill.icon}</div>
                    <span className="text-sm text-gray-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
