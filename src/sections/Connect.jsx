import React from 'react';
import { motion } from 'motion/react';

const Connect = () => {
  const links = [
    { name: 'Resume', url: '#', isPrimary: true },
    { name: 'Github', url: 'https://github.com/abir00089', isPrimary: false },
    { name: 'Twitter', url: 'https://twitter.com/abir', isPrimary: false },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/abir-mondal-1005913b4', isPrimary: false },
    { name: 'Instagram', url: 'https://www.instagram.com/abir.myst?igsh=MXR2N3VpMnQwODdmcg==', isPrimary: false },
    { name: 'Email', url: 'mailto:abirmondal8926@gmail.com', isPrimary: false },
  ];

  return (
    <section className="c-space py-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 flex items-center">
          Connect<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27E4F5] to-[#ca2f8c]">.</span>
        </h2>
        
        <div className="flex flex-wrap gap-4">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:-translate-y-1 ${
                link.isPrimary 
                  ? 'bg-neutral-100 text-black hover:bg-white' 
                  : 'bg-[#161a31]/60 text-white border border-white/10 hover:border-white/30 hover:bg-[#161a31]'
              }`}
            >
              {link.name}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Connect;
