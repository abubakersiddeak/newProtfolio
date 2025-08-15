"use client";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingVideo from "./loading";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState([]);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(0);

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

  const handleVideoEnd = () => {
    // ধীরে ধীরে ভিডিও ফেইড আউট
    let fadeDuration = 1000; // 1 সেকেন্ড
    let step = 50; // প্রতি 50ms এ অপাসিটি আপডেট হবে
    let opacityStep = step / fadeDuration;

    let fadeOutInterval = setInterval(() => {
      setVideoOpacity((prev) => {
        if (prev <= 0) {
          clearInterval(fadeOutInterval);
          return 0;
        }
        return prev - opacityStep;
      });
    }, step);

    // কনটেন্ট ফেইড ইন শুরু
    let fadeInInterval = setInterval(() => {
      setContentOpacity((prev) => {
        if (prev >= 1) {
          clearInterval(fadeInInterval);
          return 1;
        }
        return prev + opacityStep;
      });
    }, step);
  };

  return (
    <div className="relative">
      {/* ভিডিও */}
      {videoOpacity > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black"
          style={{ opacity: videoOpacity, transition: "opacity 50ms linear" }}
        >
          <LoadingVideo onVideoEnd={handleVideoEnd} />
        </div>
      )}

      {/* কনটেন্ট */}
      <div
        className="bg-slate-900 min-h-screen transition-opacity duration-300"
        style={{ opacity: contentOpacity }}
      >
        <Header user={user} />
        <Hero user={user} />
        <About user={user} />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
