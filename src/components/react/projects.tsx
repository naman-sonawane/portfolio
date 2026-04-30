import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useOverlayReady } from "./use-overlay-ready";

type Project = "helpidontknowhowtonetworkin" | "instalearn" | "eve" | "kinesis";

const projectData = {
  "helpidontknowhowtonetworkin": {
    name: "helpidontknowhowtonetworkin.tech",
    description: "Facial recognition networking assistant using LinkedIn data to facilitate meaningful connections at events",
    tools: "TYPESCRIPT • TENSORFLOW.JS • MONGODB • LLAMA • NODE.JS",
    image: "/helpidontknow.png",
    link: "https://dorahacks.io/buidl/26364/milestones",
    award: "Best Gen AI Hack"
  },
  instalearn: {
    name: "InstaLearn",
    description: "Personalized learning platform using ML that replaces social media feeds with educational content",
    tools: "REACT • NODE.JS • MONGODB • GEMINI • TAILWIND",
    image: "/instalearn.png",
    link: "https://devpost.com/software/instalearn-sxvyz1",
    award: "Winner"
  },
  kinesis: {
    name: "Kinesis",
    description: "AI personal trainer that brings quality coaching to your home with real-time posture tracking",
    tools: "REACT • TENSORFLOW • MONGODB • GEMINI • 3D",
    image: "/kinesis.png",
    link: "https://github.com/sakufish/kinesis",
    award: undefined
  },
  eve: {
    name: "Eve",
    description: "Personal safety network on campus through real-time alerts on incidents with AI deterrent and safe routing",
    tools: "NEXT.JS • POSTGRESQL • PWA • GOOGLE MAPS • ELEVENLABS • TAILWIND",
    image: "/eve.png",
    link: "https://devpost.com/software/evo-cadujv",
    award: "Best Social Hack"
  }
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project>("helpidontknowhowtonetworkin");
  const [isHovered, setIsHovered] = useState(false);
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

  const handleChangeProject = (project: Project) => {
    if (selectedProject === project) return;
    setSelectedProject(project);
  };

  const handleBannerClick = () => {
    window.open(projectData[selectedProject].link, '_blank');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (isMobile) {
    return (
      <motion.div 
        className="project-container w-full h-full bg-[#161711] rounded-xl p-3 flex flex-col"
        initial={{ opacity: 0, y: 24 }}
        animate={overlayReady ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      >
        <motion.div 
          className="flex items-center justify-between mb-3 flex-shrink-0"
        >
          <span className="project-title text-lg text-white">
            Projects
          </span>
        </motion.div>
         
        <motion.div 
          className="flex-1 overflow-y-auto space-y-3" 
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.4) transparent'
          }}
        >
          {Object.entries(projectData).map(([key, project], index) => (
            <motion.div 
              key={key} 
              className="project-item"
            >
              <motion.div
                onClick={() => window.open(project.link, '_blank')}
                className="relative h-32 rounded-xl cursor-pointer overflow-hidden transition-transform duration-200"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-black"
                  whileHover={{ opacity: 0.4 }}
                />
                
                <motion.div 
                  className="absolute inset-0 p-2 flex flex-col justify-end text-white z-10"
                >
                  <div className="mb-1">
                    <h3 className="text-sm font-semibold mb-1">{project.name}</h3>
                    <p className="text-xs mb-1 leading-tight">{project.description}</p>
                    <div className="text-[9px] font-medium tracking-wider opacity-80 mb-1">
                      {project.tools}
                    </div>
                    {project.award && (
                      <motion.div 
                        className="bg-none border-[1px] border-amber-400 text-amber-400 px-1 py-0.5 rounded-full text-[9px] font-medium inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>{project.award.toUpperCase()}</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="project-container h-full bg-[#161711] rounded-xl p-3 xl:p-4 flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={overlayReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      
      <motion.div 
        className="flex items-center justify-between flex-shrink-0 mb-3"
      >
        <span className="project-title text-xl xl:text-2xl instrument lighter">
          Projects
        </span>
      </motion.div>

      <motion.div
        className="project-banner relative rounded-xl cursor-pointer overflow-hidden transition-transform duration-200 flex-shrink-0 min-h-[150px] h-[34%] xl:h-[40%]"
        key={selectedProject}
        onClick={handleBannerClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage: `url(${projectData[selectedProject].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div 
          className="banner-overlay absolute inset-0 bg-black"
          animate={{ opacity: isHovered ? 0.5 : 0.7 }}
        />
        
        <motion.div 
          className="banner-content absolute inset-0 p-3 xl:p-5 flex flex-col justify-end text-white z-10"
        >
          <div className="mb-2">
            <motion.p 
              key={`desc-${selectedProject}`}
              className="text-xs xl:text-sm leading-snug mb-2"
            >
              {projectData[selectedProject].description}
            </motion.p>
            <motion.div 
              key={`tools-${selectedProject}`}
              className="text-[10px] xl:text-xs font-medium tracking-wide opacity-80"
            >
              {projectData[selectedProject].tools}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <div
        className="mt-3 flex-1 min-h-0 overflow-y-auto pr-1"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.4) transparent'
        }}
      >
        <div className="project-line h-[1px] mb-2 w-full bg-white/30"></div>

        <motion.div 
          className="project-text mb-2"
          whileHover={{ x: 4 }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <motion.span
              onClick={() => handleChangeProject("helpidontknowhowtonetworkin")}
              className={`cursor-pointer hover:text-white/70 transition-all duration-200 text-white text-xs xl:text-sm leading-snug ${
                selectedProject === "helpidontknowhowtonetworkin" ? "font-semibold text-white" : "text-white/80"
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              helpidontknowhowtonetworkin.tech
            </motion.span>
            {projectData["helpidontknowhowtonetworkin"].award && (
              <motion.div 
                className="bg-none border-[1px] border-amber-400 text-amber-400 px-1.5 py-0.5 rounded-full text-[9px] xl:text-[10px] font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <span>{projectData["helpidontknowhowtonetworkin"].award.toUpperCase()}</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="project-line h-[1px] mb-2 w-full bg-white/30"></div>

        <motion.div 
          className="project-text mb-2"
          whileHover={{ x: 4 }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <motion.span
              onClick={() => handleChangeProject("instalearn")}
              className={`cursor-pointer hover:text-white/70 transition-all duration-200 text-white text-xs xl:text-sm ${
                selectedProject === "instalearn" ? "font-semibold text-white" : "text-white/80"
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              InstaLearn
            </motion.span>
            {projectData.instalearn.award && (
              <motion.div 
                className="bg-none border-[1px] border-amber-400 text-amber-400 px-1.5 py-0.5 rounded-full text-[9px] xl:text-[10px] font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <span>{projectData.instalearn.award.toUpperCase()}</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="project-line h-[1px] mb-2 w-full bg-white/30"></div>

        <motion.div 
          className="project-text mb-2"
          whileHover={{ x: 4 }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <motion.span
              onClick={() => handleChangeProject("eve")}
              className={`cursor-pointer hover:text-white/70 transition-all duration-200 text-white text-xs xl:text-sm ${
                selectedProject === "eve" ? "font-semibold text-white" : "text-white/80"
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              Eve
            </motion.span>
            {projectData.eve.award && (
              <motion.div 
                className="bg-none border-[1px] border-amber-400 text-amber-400 px-1.5 py-0.5 rounded-full text-[9px] xl:text-[10px] font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <span>{projectData.eve.award.toUpperCase()}</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="project-line h-[1px] mb-2 w-full bg-white/30"></div>

        <motion.div 
          className="project-text mb-2"
          whileHover={{ x: 4 }}
        >
          <motion.span
            onClick={() => handleChangeProject("kinesis")}
            className={`cursor-pointer hover:text-white/70 transition-all duration-200 text-white text-xs xl:text-sm ${
              selectedProject === "kinesis" ? "font-semibold text-white" : "text-white/80"
            }`}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            Kinesis
          </motion.span>
        </motion.div>

      </div>
    </motion.div>
  );
};