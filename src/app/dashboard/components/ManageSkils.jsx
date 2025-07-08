"use client";
import React, { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaTools,
} from "react-icons/fa";

export default function ManageSkills({ skills, setSkills }) {
  const [editingSkill, setEditingSkill] = useState(null); // Skill being edited
  const [newSkill, setNewSkill] = useState({
    category: "",
    name: "",
    icon: "",
  }); // For adding new skill

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.name && newSkill.category) {
      // For simplicity, we'll use a generic icon or expect user to input SVG string
      // In a real app, you'd have a more robust icon selection/upload
      const iconComponent = newSkill.icon ? (
        <span dangerouslySetInnerHTML={{ __html: newSkill.icon }} />
      ) : (
        <FaTools />
      ); // Default icon
      setSkills([
        ...skills,
        { id: generateUniqueId(), ...newSkill, icon: iconComponent },
      ]);
      setNewSkill({ category: "", name: "", icon: "" }); // Reset form
    }
  };

  const handleUpdateSkill = (e) => {
    e.preventDefault();
    if (editingSkill) {
      setSkills(
        skills.map((skill) =>
          skill.id === editingSkill.id
            ? { ...editingSkill, icon: editingSkill.icon || <FaTools /> }
            : skill
        )
      );
      setEditingSkill(null); // Exit edit mode
    }
  };

  const handleDeleteSkill = (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter((skill) => skill.id !== id));
    }
  };

  return (
    <section className="py-16 bg-gray-800 text-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-400">
          Manage Skills
        </h2>

        {/* Add New Skill Form */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg mb-12 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-400">
            Add New Skill
          </h3>
          <form
            onSubmit={handleAddSkill}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label
                htmlFor="newSkillCategory"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Category
              </label>
              <input
                type="text"
                id="newSkillCategory"
                value={newSkill.category}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, category: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                placeholder="e.g., Web, Programming, Tools"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newSkillName"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Skill Name
              </label>
              <input
                type="text"
                id="newSkillName"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                placeholder="e.g., React, Python"
                required
              />
            </div>
            {/* Note: Icon input is complex. For simplicity, allowing SVG string or leaving blank. */}
            <div className="md:col-span-2">
              <label
                htmlFor="newSkillIcon"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Icon (SVG String or leave blank for default)
              </label>
              <input
                type="text"
                id="newSkillIcon"
                value={newSkill.icon}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, icon: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
                placeholder="<svg ...>...</svg>"
              />
            </div>
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center ml-auto"
              >
                <FaPlus className="mr-2" /> Add Skill
              </button>
            </div>
          </form>
        </div>

        {/* Skills List */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-400">
            Current Skills
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Icon
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingSkill?.id === skill.id ? (
                        <input
                          type="text"
                          value={editingSkill.category}
                          onChange={(e) =>
                            setEditingSkill({
                              ...editingSkill,
                              category: e.target.value,
                            })
                          }
                          className="w-full py-1 px-2 bg-gray-700 border border-gray-600 rounded text-white"
                        />
                      ) : (
                        skill.category
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingSkill?.id === skill.id ? (
                        <input
                          type="text"
                          value={editingSkill.name}
                          onChange={(e) =>
                            setEditingSkill({
                              ...editingSkill,
                              name: e.target.value,
                            })
                          }
                          className="w-full py-1 px-2 bg-gray-700 border border-gray-600 rounded text-white"
                        />
                      ) : (
                        skill.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-3xl">
                      {editingSkill?.id === skill.id ? (
                        <input
                          type="text"
                          value={
                            editingSkill.icon && editingSkill.icon.props
                              ? editingSkill.icon.props.dangerouslySetInnerHTML
                                  ?.__html || ""
                              : ""
                          }
                          onChange={(e) =>
                            setEditingSkill({
                              ...editingSkill,
                              icon: (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: e.target.value,
                                  }}
                                />
                              ),
                            })
                          }
                          className="w-full py-1 px-2 bg-gray-700 border border-gray-600 rounded text-white"
                          placeholder="SVG string"
                        />
                      ) : (
                        skill.icon
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingSkill?.id === skill.id ? (
                        <>
                          <button
                            onClick={handleUpdateSkill}
                            className="text-green-400 hover:text-green-600 mr-3"
                            title="Save"
                          >
                            <FaSave className="inline-block text-xl" />
                          </button>
                          <button
                            onClick={() => setEditingSkill(null)}
                            className="text-red-400 hover:text-red-600"
                            title="Cancel"
                          >
                            <FaTimes className="inline-block text-xl" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="text-blue-400 hover:text-blue-600 mr-3"
                            title="Edit"
                          >
                            <FaEdit className="inline-block text-xl" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className="text-red-400 hover:text-red-600"
                            title="Delete"
                          >
                            <FaTrash className="inline-block text-xl" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
