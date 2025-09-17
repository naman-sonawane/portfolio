import { useState } from "react";
import { motion } from "framer-motion";
import { useOverlayReady } from "./use-overlay-ready";

export const Socials = () => {
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
        className="social-container bg-[#161711] rounded-xl p-3 flex flex-col items-center justify-center font-medium text-sm tracking-tight space-y-2"
        initial={{ opacity: 0, y: 24 }}
        animate={overlayReady ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.div 
          className="social-text"
        >
          <motion.a
            className="hover:text-amber-500/70 transition"
            target="_blank"
            href="https://github.com/naman-sonawane"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            GITHUB
          </motion.a>
        </motion.div>

        <motion.div 
          className="social-text"
        >
          <motion.a
            className="hover:text-amber-500/70 transition"
            target="_blank"
            href="https://www.linkedin.com/in/naman-sonawane/"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            LINKEDIN
          </motion.a>
        </motion.div>

        <motion.div 
          className="social-text"
        >
          <motion.a
            className="hover:text-amber-500/70 transition"
            target="_blank"
            href="https://devpost.com/naman-sonawane"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            DEVPOST
          </motion.a>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="social-container bg-[#161711] rounded-xl p-4 flex items-center justify-around font-medium  text-[15px] tracking-tight"
      initial={{ opacity: 0, y: 24 }}
      animate={overlayReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      <motion.div 
        className="social-text"
      >
        <motion.a
          className="hover:text-amber-500/70 transition"
          target="_blank"
          href="https://github.com/naman-sonawane"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          GITHUB
        </motion.a>
      </motion.div>

      <motion.div 
        className="social-text"
      >
        <motion.a
          className="hover:text-amber-500/70 transition"
          target="_blank"
          href="https://www.linkedin.com/in/naman-sonawane/"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          LINKEDIN
        </motion.a>
      </motion.div>

      <motion.div 
        className="social-text"
      >
        <motion.a
          className="hover:text-amber-500/70 transition"
          target="_blank"
          href="https://devpost.com/naman-sonawane"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          DEVPOST
        </motion.a>
      </motion.div>
    </motion.div>
  );
};
