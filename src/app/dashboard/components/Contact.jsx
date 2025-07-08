import React from "react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-sky-400">Get in Touch</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Have a project in mind or just want to chat? Feel free to reach out!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            href="mailto:your.email@example.com"
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <FaEnvelope className="mr-2" /> Email Me
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <FaLinkedin className="mr-2" /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
