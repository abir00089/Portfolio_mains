import React, { useEffect } from "react";
import { motion } from "motion/react";

const NewAboutPage = ({ onBack }) => {
  // Ensure we start at the top of the page when this mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-300 font-sans pb-20">
      {/* Navbar / Back Button */}
      <div className="sticky top-0 z-50 p-6 backdrop-blur-md bg-[#090a0f]/80 border-b border-white/5">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <img src="/assets/arrow-right.svg" alt="back" className="w-5 h-5 rotate-180" />
          <span className="font-medium text-lg">Back to Portfolio</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-32 md:pt-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Sup, I'm <span className="text-[#27E4F5]">Abir</span>
            </h1>
            <img
              src="/assets/shinchan.gif"
              alt="Shin-chan dancing"
              className="w-16 h-16 md:w-20 md:h-20 object-contain relative right-3 bottom-3 "
            />
          </div>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-white/10 relative">
            <img 
              src="/assets/profile-pic.jpeg" 
              alt="Abir" 
              className="w-full h-full object-cover" 
            />
          </div>
        </motion.div>

        {/* About Details Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">About</h2>
          <div className="space-y-6 text-lg leading-relaxed text-neutral-300 font-light">
            <p>
              I’m a <strong className="text-[#27E4F5] font-semibold">developer and builder</strong> from India who learns best by doing. I enjoy diving straight into problems, figuring things out hands-on, and refining along the way.
            </p>
            <p>
              From backend systems to AI-powered applications, I focus on <strong className="text-[#27E4F5] font-semibold">building products that are practical, scalable, and actually work</strong> in the real world.
            </p>
            <p>
              Beyond coding, I’m passionate about <strong className="text-[#27E4F5] font-semibold">communities and open source</strong>.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>
          
          <div className="mb-6">
            <h3 className="text-neutral-500 text-sm font-semibold uppercase tracking-wider mb-2">Programming & Technical</h3>
            <p className="text-lg text-neutral-300">
              Node JS, Express JS, TypeScript, JavaScript, MySQL, PostgreSQL, MongoDB, Prisma, Drizzle, React JS, Next JS, HTML, CSS, Tailwind CSS
            </p>
          </div>

          <div>
            <h3 className="text-neutral-500 text-sm font-semibold uppercase tracking-wider mb-2">Tools & Platforms</h3>
            <p className="text-lg text-neutral-300">
              Git, GitHub, Firebase, VS Code, Figma, Adobe Creative Cloud Tools
            </p>
          </div>
        </motion.section>

        {/* Gears Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">My Gears</h2>
          <p className="text-neutral-500 text-sm mb-6">The weapons I use to ship code and build cool stuff</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold text-lg">Asus TUF Gaming F15 </h3>
              <p className="text-neutral-400 text-sm mt-1">
                i5 11th Gen HX • 16GB DDR4 RAM • 512GB Gen 4 SSD • NVIDIA RTX 30 SERIES GPU • 144Hz Display
              </p>
            </div>
            
            

            <div>
              <h3 className="text-white font-bold text-lg">Protronics Hydra 10 Mechanical Keyboard</h3>
              <p className="text-neutral-400 text-sm mt-1">
                Blue switches for that satisfying clicky experience
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg">Protronics Tode IV Mouse</h3>
              <p className="text-neutral-400 text-sm mt-1">
                Precision for Coding
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default NewAboutPage;
