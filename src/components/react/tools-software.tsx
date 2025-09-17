import { useState } from "react";
import { motion } from "framer-motion";
import { useOverlayReady } from "./use-overlay-ready";

const toolsData = {
  languages: [
    "Python", "Vanilla JS", "Typescript", "Java", "HTML", "Vanilla CSS", "SQL", "C#", "C++"
  ],
  frameworks: [
    "React.js", "TailwindCSS", "Vite", "Next.js", "Bootstrap", "Node.js", "Astro", "Electron"
  ],
  software: [
    "Figma", "Flask", "Postman", "Git", "VS Code", "Vercel", "Firebase", "Framer", "Azure Cloud", "Django"
  ]
};

export const ToolsSoftware = () => {
  const [isMobile, setIsMobile] = useState(false);
  const overlayReady = useOverlayReady();

  
  if (typeof window !== 'undefined') {
    const mobile = window.innerWidth < 768;
    if (mobile !== isMobile) {
      setIsMobile(mobile);
    }
  }

  if (isMobile) {
    return (
      <motion.div 
        className="tools-container w-full bg-[#161711] rounded-xl p-4"
        initial={{ opacity: 0, y: 24 }}
        animate={overlayReady ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="tools-title text-xl text-white font-light">
            Tools & Software
          </span>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          
          <motion.div 
            className="tools-category"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h3 className="text-white/90 text-sm font-medium mb-3 tracking-wider">
              LANGUAGES
            </h3>
            <div className="flex flex-wrap gap-2">
              {toolsData.languages.map((tool, index) => (
                <motion.span
                  key={index}
                  className="bg-white/10 text-white/80 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          
          <motion.div 
            className="tools-category"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h3 className="text-white/90 text-sm font-medium mb-3 tracking-wider">
              FRAMEWORKS
            </h3>
            <div className="flex flex-wrap gap-2">
              {toolsData.frameworks.map((tool, index) => (
                <motion.span
                  key={index}
                  className="bg-white/10 text-white/80 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          
          <motion.div 
            className="tools-category"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <h3 className="text-white/90 text-sm font-medium mb-3 tracking-wider">
              SOFTWARE
            </h3>
            <div className="flex flex-wrap gap-2">
              {toolsData.software.map((tool, index) => (
                <motion.span
                  key={index}
                  className="bg-white/10 text-white/80 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-6 pt-4 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          <p className="text-[#a8977a] text-xs italic text-center">
            "the deeper you go, the more you realize how endless the sea of possibilities actually is."
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="tools-container h-full bg-[#161711] rounded-xl p-4"
      initial={{ opacity: 0, y: 24 }}
      animate={overlayReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div 
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <span className="tools-title text-xl text-white font-light">
          Tools & Software
        </span>
      </motion.div>

      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        
        <motion.div 
          className="tools-category"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="text-white/90 text-xs font-medium mb-2 tracking-wider">
            LANGUAGES
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {toolsData.languages.map((tool, index) => (
              <motion.span
                key={index}
                className="bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs font-medium hover:bg-white/20 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        
        <motion.div 
          className="tools-category"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h3 className="text-white/90 text-xs font-medium mb-2 tracking-wider">
            FRAMEWORKS
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {toolsData.frameworks.map((tool, index) => (
              <motion.span
                key={index}
                className="bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs font-medium hover:bg-white/20 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>

        
        <motion.div 
          className="tools-category"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <h3 className="text-white/90 text-xs font-medium mb-2 tracking-wider">
            SOFTWARE
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {toolsData.software.map((tool, index) => (
              <motion.span
                key={index}
                className="bg-white/10 text-white/80 px-2 py-1 rounded-md text-xs font-medium hover:bg-white/20 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-4 pt-3 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          <p className="text-[#a8977a] text-xs italic text-center">
            "the deeper you go, the more you realize how endless the sea of possibilities actually is."
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

