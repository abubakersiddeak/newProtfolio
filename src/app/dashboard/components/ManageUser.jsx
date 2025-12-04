"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    mainImage: "",
    aboutImage: "",
    password: "",
    role: "user",
    github: "",
    linkedin: "",
    facebook: "",
    twitter: "",
  });

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData._id ? "PUT" : "POST";
      const url = formData._id ? `/api/user/${formData._id}` : "/api/user";

      const payload = {
        ...formData,
        socialLinks: {
          github: formData.github,
          linkedin: formData.linkedin,
          facebook: formData.facebook,
          twitter: formData.twitter,
        },
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save user");

      alert(
        formData._id ? "User updated successfully!" : "User added successfully!"
      );
      resetForm();
      window.location.reload();
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Failed to save user. Please try again.");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({
      ...user,
      github: user.socialLinks?.github || "",
      linkedin: user.socialLinks?.linkedin || "",
      facebook: user.socialLinks?.facebook || "",
      twitter: user.socialLinks?.twitter || "",
      password: "", // Don't pre-fill password
    });
    setShowForm(true);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/user/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      alert("User deleted successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      bio: "",
      email: "",
      phone: "",
      mainImage: "",
      aboutImage: "",
      password: "",
      role: "user",
      github: "",
      linkedin: "",
      facebook: "",
      twitter: "",
    });
    setShowForm(false);
  };

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Manage Users
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            {users.length} user{users.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
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
          Add User
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="inline-block w-12 h-12 border-2 border-neutral-800 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Users Table */}
          {users.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900 border border-neutral-800">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p className="text-neutral-500 text-lg font-light">
                No users found
              </p>
            </div>
          ) : (
            <div className="bg-neutral-900 border border-neutral-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-800">
                  <thead className="bg-neutral-950">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-neutral-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">
                              <span className="text-sm font-medium text-neutral-400">
                                {user.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-neutral-500">
                                {user.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-neutral-300">
                            {user.email}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {user.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-900/50"
                                : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="cursor-pointer px-3 py-1.5 border border-neutral-700 hover:border-neutral-600 transition-colors text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="cursor-pointer px-3 py-1.5 border border-red-900/50 hover:border-red-800 text-red-400 transition-colors text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* User Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-40 p-4"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-light text-white mb-6">
                {formData._id ? "Edit User" : "Add New User"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                      placeholder="Full Stack Developer"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors resize-none font-light"
                      placeholder="Brief description..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  {!formData._id && (
                    <div>
                      <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                        placeholder="••••••••"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white outline-none transition-colors font-light"
                    >
                      <option value="user" className="bg-neutral-900">
                        User
                      </option>
                      <option value="admin" className="bg-neutral-900">
                        Admin
                      </option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      Main Image URL
                    </label>
                    <input
                      type="url"
                      name="mainImage"
                      value={formData.mainImage}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      About Image URL
                    </label>
                    <input
                      type="url"
                      name="aboutImage"
                      value={formData.aboutImage}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-5 border-t border-neutral-800">
                  <h3 className="text-sm text-neutral-400 mb-4 uppercase tracking-wider font-light">
                    Social Links
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {["github", "linkedin", "facebook", "twitter"].map(
                      (social) => (
                        <div key={social}>
                          <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                            {social.charAt(0).toUpperCase() + social.slice(1)}
                          </label>
                          <input
                            type="url"
                            name={social}
                            value={formData[social]}
                            onChange={handleChange}
                            className="w-full px-0 py-3 bg-transparent border-b border-neutral-800 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light"
                            placeholder={`https://${social}.com/...`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="cursor-pointer flex-1 px-6 py-3 border border-neutral-800 hover:border-neutral-700 text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer flex-1 px-6 py-3 bg-white text-black hover:bg-neutral-200 text-sm font-medium transition-colors"
                  >
                    {formData._id ? "Update User" : "Add User"}
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
