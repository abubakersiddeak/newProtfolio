"use client";
import { useState, useRef } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Background from "../components/Background";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const formRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.1 });

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 800], [5, -5]);
  const rotateY = useTransform(x, [0, 800], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate data transmission
    await animate(formRef.current, { opacity: [1, 0.3, 1] }, { duration: 0.8 });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitMessage("TRANSMISSION SUCCESSFUL • RESPONSE INCOMING");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitMessage("TRANSMISSION FAILED • RETRY CONNECTION");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden bg-transparent "
    >
      {/* Animated scanning lines */}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/30"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 tracking-tighter font-mono">
            _CONTACT_NODE
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 font-mono tracking-wider text-sm md:text-base">
            INITIATE_DIRECT_LINK
          </p>
        </motion.div>

        <div
          className="grid lg:grid-cols-2 gap-10 md:gap-14"
          onMouseMove={handleMouseMove}
        >
          {/* Contact Terminal Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900/80 border border-cyan-400/20 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-cyan-400/10"
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <h3 className="text-cyan-400 font-mono text-lg md:text-xl tracking-tight">
                CONTACT_TERMINAL
              </h3>
            </div>

            <div className="space-y-6 md:space-y-8">
              <motion.div
                className="flex items-center gap-4 p-3 border border-cyan-400/10 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-cyan-400/10 rounded-lg text-cyan-400">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <h4 className="text-gray-300 font-mono text-xs tracking-wider">
                    DATA_TRANSFER
                  </h4>
                  <a
                    href="mailto:abubakersiddeak@gmail.com"
                    className="text-white hover:text-cyan-400 transition-colors font-mono text-sm md:text-base"
                  >
                    abubakersiddeak@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-3 border border-purple-500/10 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <FaPhone className="text-lg" />
                </div>
                <div>
                  <h4 className="text-gray-300 font-mono text-xs tracking-wider">
                    VOICE_LINK
                  </h4>
                  <div className="space-y-1">
                    <a
                      href="tel:+8801560045388"
                      className="block text-white hover:text-purple-400 transition-colors font-mono text-sm md:text-base"
                    >
                      +880 1560045388
                    </a>
                    <a
                      href="tel:+8801790884776"
                      className="block text-white hover:text-purple-400 transition-colors font-mono text-sm md:text-base"
                    >
                      +880 1790884776
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-3 border border-blue-400/10 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-blue-400/10 rounded-lg text-blue-400">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <div>
                  <h4 className="text-gray-300 font-mono text-xs tracking-wider">
                    LOCATION_DATA
                  </h4>
                  <p className="text-white font-mono text-sm md:text-base">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Message Transmission Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-900/80 border border-cyan-400/20 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-2xl shadow-cyan-400/10"
            style={{ rotateX, rotateY }}
            ref={formRef}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <h3 className="text-cyan-400 font-mono text-lg md:text-xl tracking-tight">
                MESSAGE_TRANSMITTER
              </h3>
            </div>

            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`mb-6 p-4 rounded-lg font-mono text-xs md:text-sm ${
                  submitMessage.includes("SUCCESS")
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {submitMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-gray-400 font-mono text-xs tracking-wider mb-2">
                    IDENTIFIER
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 text-white font-mono border border-cyan-400/20 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all"
                    placeholder="ENTER_NAME"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-gray-400 font-mono text-xs tracking-wider mb-2">
                    TRANSMITTER_ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 text-white font-mono border border-cyan-400/20 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all"
                    placeholder="USER@DOMAIN.COM"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-gray-400 font-mono text-xs tracking-wider mb-2">
                  SUBJECT_LINE
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 text-white font-mono border border-cyan-400/20 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all"
                  placeholder="MESSAGE_SUBJECT"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <label className="block text-gray-400 font-mono text-xs tracking-wider mb-2">
                  MESSAGE_CONTENT
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-900/50 text-white font-mono border border-cyan-400/20 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition-all resize-none"
                  placeholder="ENTER_MESSAGE_DATA"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono tracking-wider flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <path
                        className="fill-current text-black/50"
                        d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8z"
                      />
                      <path
                        className="fill-current"
                        d="M12 20c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 9.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
                      />
                    </svg>
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    INITIATE_TRANSMISSION
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
