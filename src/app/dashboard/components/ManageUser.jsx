"use client";
import { useState, useEffect } from "react";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
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
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
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

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save user");

      window.location.reload();
    } catch (err) {
      console.error("Error saving user:", err);
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
    });
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/user/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto text-white bg-gray-900 min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-6 text-[#00ff0d] drop-shadow-[_#00ff0d]">
        ⚡ Manage Users
      </h1>

      {/* Users Table */}
      <div className="mt-8 overflow-x-auto border border-[#00fff7] rounded-lg ">
        <table className="min-w-full bg-black">
          <thead>
            <tr className="bg-[#0f0f0f]">
              <th className="p-2 text-left text-[#00fff7]">Name</th>
              <th className="p-2 text-left text-[#00fff7]">Email</th>
              <th className="p-2 text-[#00fff7]">Role</th>
              <th className="p-2 text-[#00fff7]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-700 hover:bg-[#1a1a1a] transition"
              >
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 bg-[#00ffaa] text-black rounded hover:brightness-125 "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 bg-[#00fff7] text-black rounded hover:brightness-125 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0f0f0f] p-6 rounded-xl shadow-[0_0_4px_#00ff0d] mt-10"
      >
        {[
          { name: "name", placeholder: "Name", type: "text" },
          { name: "title", placeholder: "Title", type: "text" },
          { name: "bio", placeholder: "Bio", type: "textarea", span: true },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "phone", placeholder: "Phone", type: "text" },
          { name: "mainImage", placeholder: "Main Image URL", type: "text" },
          { name: "aboutImage", placeholder: "About Image URL", type: "text" },
        ].map((field, idx) =>
          field.type === "textarea" ? (
            <textarea
              key={idx}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className={`p-2 border rounded bg-black text-white border-[#00fff7] ${
                field.span ? "col-span-1 sm:col-span-2" : ""
              }`}
            />
          ) : (
            <input
              key={idx}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="p-2 border rounded bg-black text-white border-[#00fff7]"
              required={["name", "email"].includes(field.name)}
            />
          )
        )}

        {!formData._id && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded bg-black text-white border-[#00ffc8]"
            required
          />
        )}

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="p-2 border rounded bg-black text-white border-[#00bbff]"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Social Links */}
        {["github", "linkedin", "facebook", "twitter"].map((social, idx) => (
          <input
            key={idx}
            name={social}
            placeholder={`${
              social.charAt(0).toUpperCase() + social.slice(1)
            } URL`}
            value={formData[social]}
            onChange={handleChange}
            className="p-2 border rounded bg-black text-white border-[#00fff7]"
          />
        ))}

        <button
          type="submit"
          className="cursor-pointer col-span-1 sm:col-span-2 bg-[#11cff9] text-black p-2 rounded hover:brightness-125 "
        >
          {formData._id ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
}
