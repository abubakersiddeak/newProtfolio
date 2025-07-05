"use client";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitMessage(
        "Thank you for your message! I'll get back to you soon."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitMessage(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              Get In{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Touch
              </span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-xl text-slate-700 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Have a project in mind? Let's work together to bring your ideas to
              life.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <AnimatedSection delay={200}>
            <div className="space-y-6 sm:space-y-8">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Let's Connect
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 dark:bg-indigo-600 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white text-sm sm:text-base" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">
                      Email
                    </h4>
                    <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base">
                      john.doe@example.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 dark:bg-purple-600 rounded-full flex items-center justify-center">
                    <FaPhone className="text-white text-sm sm:text-base" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">
                      Phone
                    </h4>
                    <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 dark:bg-blue-600 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-sm sm:text-base" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">
                      Location
                    </h4>
                    <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 sm:pt-8">
                <h4 className="text-slate-900 dark:text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                  Follow Me
                </h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-colors border border-indigo-500/20 dark:border-indigo-500/20"
                  >
                    <FaGithub className="text-slate-700 dark:text-white hover:text-white text-sm sm:text-base" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-colors border border-indigo-500/20 dark:border-indigo-500/20"
                  >
                    <FaLinkedin className="text-slate-700 dark:text-white hover:text-white text-sm sm:text-base" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-colors border border-indigo-500/20 dark:border-indigo-500/20"
                  >
                    <FaTwitter className="text-slate-700 dark:text-white hover:text-white text-sm sm:text-base" />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={400}>
            <div className="bg-gray-50 dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-lg border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                Send Message
              </h3>

              {submitMessage && (
                <div
                  className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                    submitMessage.includes("Thank you")
                      ? "bg-indigo-600 dark:bg-indigo-600"
                      : "bg-red-600 dark:bg-red-600"
                  } text-white`}
                >
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-slate-900 dark:text-white font-semibold mb-2 text-sm sm:text-base"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg border border-indigo-500/20 dark:border-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-400 focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-slate-900 dark:text-white font-semibold mb-2 text-sm sm:text-base"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg border border-indigo-500/20 dark:border-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-400 focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-slate-900 dark:text-white font-semibold mb-2 text-sm sm:text-base"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg border border-indigo-500/20 dark:border-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-400 focus:outline-none transition-colors text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-slate-900 dark:text-white font-semibold mb-2 text-sm sm:text-base"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg border border-indigo-500/20 dark:border-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-400 focus:outline-none transition-colors resize-none text-sm sm:text-base"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
