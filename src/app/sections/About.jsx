import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
              About <span className="text-indigo-600 dark:text-indigo-400">Me</span>
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <AnimatedSection delay={200}>
            <div className="relative flex justify-center">
              {/* Professional photo - Responsive Square */}
              <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto relative">
                <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-600 rounded-2xl sm:rounded-3xl animate-pulse transform rotate-2 sm:rotate-3"></div>
                <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl transform -rotate-1 sm:-rotate-2 shadow-2xl">
                  <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-indigo-500/20 dark:border-indigo-500/20">
                    <img 
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop"
                      alt="John Doe - Professional Photo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent"></div>
                  </div>
                </div>
                
                {/* Decorative elements - Responsive */}
                <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-10 h-10 sm:w-16 sm:h-16 bg-indigo-600 dark:bg-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-2xl animate-float shadow-lg">
                  💻
                </div>
                <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-10 h-10 sm:w-16 sm:h-16 bg-purple-600 dark:bg-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-2xl animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                  🚀
                </div>
                <div className="absolute top-1/2 -right-6 sm:-right-10 w-8 h-8 sm:w-12 sm:h-12 bg-blue-600 dark:bg-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-lg animate-float shadow-lg" style={{ animationDelay: '2s' }}>
                  ⭐
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Full Stack Developer & UI/UX Designer
              </h3>
              <p className="text-slate-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                With over 5 years of experience in web development, I specialize in creating
                modern, responsive, and user-friendly applications. My passion lies in turning
                complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <p className="text-slate-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                I work with a variety of technologies including React, Node.js, Python, and
                modern design tools to deliver exceptional digital experiences. I believe in
                continuous learning and staying up-to-date with the latest industry trends.
              </p>
              
              {/* Personal stats - Responsive Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg text-center border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">50+</div>
                  <div className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">Projects Completed</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg text-center border border-purple-500/20 dark:border-purple-500/20 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                  <div className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">Years Experience</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg text-center border border-blue-500/20 dark:border-blue-500/20 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">30+</div>
                  <div className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">Happy Clients</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg text-center border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">24/7</div>
                  <div className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm">Support</div>
                </div>
              </div>
              
              {/* Skills Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg">
                  <h4 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2 text-sm sm:text-base">Frontend</h4>
                  <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base">React, Vue.js, HTML5, CSS3, JavaScript</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg border border-purple-500/20 dark:border-purple-500/20 shadow-lg">
                  <h4 className="text-purple-600 dark:text-purple-400 font-semibold mb-2 text-sm sm:text-base">Backend</h4>
                  <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base">Node.js, Python, Express.js, MongoDB</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg border border-blue-500/20 dark:border-blue-500/20 shadow-lg">
                  <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-2 text-sm sm:text-base">Tools</h4>
                  <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base">Git, Docker, AWS, Figma</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg border border-indigo-500/20 dark:border-indigo-500/20 shadow-lg">
                  <h4 className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2 text-sm sm:text-base">Mobile</h4>
                  <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base">React Native, Flutter</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;