import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOverlayReady } from "./use-overlay-ready";

const workData = [
  {
    title: "Code Sensei (Coding Instructor)",
    company: "Code Ninjas",
    period: "Mar 2023 – Present",
    description: "Teach kids programming with JavaScript, Python, C#, and Lua using platforms like Roblox, Unity, and Scratch.",
    skills: ["Teaching", "Mentoring", "Team Leadership"]
  },
  {
    title: "Full Stack Engineer",
    company: "Scripty",
    period: "May 2024 – Present",
    description: "Building an AI-powered task automation assistant with $1,000 AWS credits from Amazon to drive growth.",
    skills: ["React.js", "REST APIs", "Groq", "AWS"]
  },
  {
    title: "VP of Product Design",
    company: "Hack Canada",
    period: "Jul 2025 – Present",
    description: "Design and oversee hackathon platforms attracting 1,200+ applications, 450+ participants, and 20+ sponsors.",
    skills: ["Product Design", "Web Development", "Event Management"]
  },
  {
    title: "Tech Executive",
    company: "EurekaHacks",
    period: "Sep 2024 – Apr 2025",
    description: "Built and maintained hackathon platform, coordinated technical teams, and supported 150+ participants.",
    skills: ["Next.js", "Figma", "Team Leadership"]
  },
  {
    title: "Organizer",
    company: "Apocalypse",
    period: "Mar 2024 – May 2024",
    description: "Planned and managed hackathon logistics and web development for a smooth event experience.",
    skills: ["Project Planning", "Web Development"]
  },
  {
    title: "UI/UX Developer",
    company: "Factful",
    period: "Mar 2023 – Feb 2024",
    description: "Designed intuitive interfaces and built AI-powered fact-checking tools to combat misinformation.",
    skills: ["UI/UX Design", "React.js", "Python"]
  }
];


export const WorkExperience = () => {
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

  if (isMobile) {
    return (
      <motion.div 
        className="work-container w-full bg-[#161711] rounded-xl p-6 flex flex-col"
        initial={{ opacity: 0, y: 24 }}
        animate={overlayReady ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <motion.div 
          className="flex items-center justify-between mb-6 flex-shrink-0"
        >
          <span className="work-title text-2xl text-white font-light">
            Experience
          </span>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {workData.map((work, index) => (
            <motion.div 
              key={index} 
              className="work-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.2 + index * 0.06 }}
            >
              <motion.div 
                className="border-l-2 border-white/20 pl-4 pb-4"
                whileHover={{ x: 4 }}
              >
                <div className="flex flex-col mb-3">
                  <div className="mb-3">
                    <h3 className="text-lg text-white font-medium mb-2">
                      {work.title}
                    </h3>
                    <p className="text-white/80 text-base mb-2">
                      @ {work.company}
                    </p>
                    <span className="text-white/60 text-sm font-light">
                      {work.period}
                    </span>
                  </div>
                </div>
                
                <p className="text-white/70 text-base mb-4 leading-relaxed">
                  {work.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {work.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      className="bg-white/10 text-white/80 px-3 py-1.5 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="work-container h-full bg-[#161711] rounded-xl p-4 flex flex-col max-h-full"
      initial={{ opacity: 0, y: 24 }}
      animate={overlayReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div 
        className="flex items-center justify-between mb-4 flex-shrink-0"
      >
        <span className="work-title text-xl text-white font-light">
          Experience
        </span>
      </motion.div>

      <motion.div 
        className="flex-1 overflow-y-auto min-h-0" 
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.4) transparent'
        }}
      >
        <motion.div 
          className="space-y-4 pr-2"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {workData.map((work, index) => (
            <motion.div 
              key={index} 
              className="work-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut', delay: 0.15 + index * 0.06 }}
            >
              <motion.div 
                className="border-l-2 border-white/20 pl-3 pb-3"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-base text-white font-medium mb-1">
                      {work.title}
                    </h3>
                    <p className="text-white/80 text-xs mb-1">
                      @ {work.company}
                    </p>
                  </div>
                  <span className="text-white/60 text-xs font-light">
                    {work.period}
                  </span>
                </div>
                
                <p className="text-white/70 text-xs mb-2 leading-relaxed">
                  {work.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {work.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      className="bg-white/10 text-white/80 px-2 py-0.5 rounded-full text-xs font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.25 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
