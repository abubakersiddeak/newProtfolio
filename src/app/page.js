"use client";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

// import Loading from "./loading"; // তোমার Loader import করো
import AboutWithSkills from "./sections/About";
import Background from "./components/Background";
// import ScrollSection from "./components/ScrollSection";

export default function Home() {
  const [user, setUser] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        // setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // if (loading) return <Loading />; // এখানে Loader দেখাবে

  return (
    <div className=" min-h-screen relative">
      <Background />
      <Header user={user} />
      <Hero user={user} />
      <AboutWithSkills user={user} />
      {/* <ScrollSection /> */}
      <Projects />
      <Contact />

      <Footer />
    </div>
  );
}
