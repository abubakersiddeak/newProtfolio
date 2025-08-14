"use client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className=" bg-slate-900 transition-colors duration-300">
      <Header user={user} />
      <Hero user={user} />
      <About user={user} />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
