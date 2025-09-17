import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import NavHeart from "./heart";
import { useOverlayReady } from "./use-overlay-ready";

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const overlayReady = useOverlayReady();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      className="navbar-container bg-[#161711] h-[70px] w-full flex items-center justify-between rounded-xl px-4  logo-[15px] tracking-tight"
      initial={{ opacity: 0, y: -16 }}
      animate={overlayReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <motion.span 
        className="nav-logo text-2xl instrument lighter"
      >
        Naman Sonawane
      </motion.span>

      <motion.div 
        className="flex items-center gap-x-8"
      >
        <motion.a
          href="/"
          className="nav-links"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          ABOUT
        </motion.a>
        <motion.a
          href="/work"
          className="nav-links"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          WORK
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/naman-sonawane"
          target="_blank"
          className="nav-links"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          CONTACT
        </motion.a>
        {!isMobile && (
          <motion.div 
            className="ml-2"
            whileHover={{ scale: 1.1 }}
          >
            <NavHeart className="nav-links" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
