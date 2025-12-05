"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const container = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // GSAP Animations
  useGSAP(
    () => {
      gsap.from(".contact-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 70%",
        },
      });

      gsap.from(".contact-info", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 75%",
        },
      });

      gsap.from(".contact-form", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 75%",
        },
      });
    },
    { scope: container }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitMessage(
          "Message sent successfully! I'll get back to you soon."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitMessage(
          data.error || "Failed to send message. Please try again."
        );
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  const contactInfo = [
    {
      label: "Email",
      value: "abubakersiddeak@gmail.com",
      href: "mailto:abubakersiddeak@gmail.com",
    },
    {
      label: "Phone",
      value: "+880 1560045388",
      href: "tel:+8801560045388",
    },
    {
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={container}
      className=" relative min-h-screen flex items-center py-10 text-white overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <div className="contact-header mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="header-line w-12 h-px bg-gradient-to-r from-white/40 to-transparent" />
            <span className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-neutral-400 tracking-[0.2em] uppercase font-light">
              Get In Touch
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white leading-tight tracking-tight overflow-hidden">
            Let's work together on your{" "}
            <span className="text-neutral-400">next project</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            {contactInfo.map((item, index) => (
              <div key={item.label} className="contact-info">
                {item.href ? (
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 5 }}
                    className="block group"
                  >
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      {item.label}
                    </p>
                    <p className="text-sm sm:text-base text-neutral-200 group-hover:text-white transition-colors font-light">
                      {item.value}
                    </p>
                  </motion.a>
                ) : (
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2 font-light">
                      {item.label}
                    </p>
                    <p className="text-sm sm:text-base text-neutral-200 font-light">
                      {item.value}
                    </p>
                  </div>
                )}
                {index < contactInfo.length - 1 && (
                  <div className="mt-6 h-px bg-neutral-800/50" />
                )}
              </div>
            ))}

            {/* Additional Info */}
            <div className="contact-info pt-6 border-t border-neutral-800/50">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3 font-light">
                Response Time
              </p>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                I typically respond within 24-48 hours. For urgent inquiries,
                please call directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              {/* Success/Error Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 text-sm font-light ${
                    submitMessage.includes("successfully")
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {submitMessage}
                </motion.div>
              )}

              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs text-neutral-400 uppercase tracking-wider mb-3 font-light"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-700 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs text-neutral-400 uppercase tracking-wider mb-3 font-light"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-700 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs text-neutral-400 uppercase tracking-wider mb-3 font-light"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-700 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors font-light text-sm sm:text-base"
                  placeholder="Project inquiry"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs text-neutral-400 uppercase tracking-wider mb-3 font-light"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-0 py-3 bg-transparent border-b border-neutral-700 focus:border-neutral-400 text-white placeholder-neutral-600 outline-none transition-colors resize-none font-light text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer w-full sm:w-auto px-8 py-4 bg-white text-black text-sm font-medium tracking-wide transition-all duration-300 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
