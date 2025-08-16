"use client";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Loading from "./loading"; // তোমার Loader import করো

export default function Home() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Loading />; // এখানে Loader দেখাবে

  return (
    <div className="bg-slate-900 min-h-screen">
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
