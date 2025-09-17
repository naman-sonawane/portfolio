import { useState } from "react";
import { motion } from "framer-motion";
import { useOverlayReady } from "./use-overlay-ready";

interface Certification {
  name: string;
  image: string;
  url: string;
}

const certifications: Certification[] = [
  {
    name: "Certified Professional Python Programmer",
    image: "/PCPP.png",
    url: "https://www.credly.com/badges/25ab02d0-2662-4a94-a5ef-28ee7ddc710d/public_url"
  },
  {
    name: "Certified Associate Python Programmer",
    image: "/PCAP.png",
    url: "https://www.credly.com/badges/7fb0fec3-eac9-4d58-9efd-bf9665301705/public_url"
  },
  {
    name: "Certified Entry-Level Python Programmer",
    image: "/PCEP.png",
    url: "https://www.credly.com/badges/34923fe3-3193-4a8e-bad2-d8fa4575b7b7/public_url"
  },
  {
    name: "Azure Data Fundamentals",
    image: "/AzureDataFunda.png",
    url: "https://www.credly.com/badges/965700dd-65b1-4282-8fc4-a539b84d7a0e/public_url"
  },
  {
    name: "Azure AI Fundamentals",
    image: "/AzureAI.png",
    url: "https://www.credly.com/badges/b00b0667-d014-41f6-8bb5-47985ecdc6e9/public_url"
  },
  {
    name: "Azure Fundamentals",
    image: "/AzureFunda.png",
    url: "https://www.credly.com/badges/594e6cd4-a640-4e23-9f89-ddd2ef1f664b/public_url"
  },
  {
    name: "Databricks Lakehouse Fundamentals",
    image: "/Lakehouse.png",
    url: "https://credentials.databricks.com/82633c06-a728-40c9-95d3-6fee7d3cf855#acc.lAaCNmgb"
  },
  {
    name: "Databricks Generative AI Fundamentals",
    image: "/GenAI.png",
    url: "https://credentials.databricks.com/520eff16-3773-49ca-bb56-02f8d08dd69d#acc.Rb5mt3j6"
  },
  {
    name: "Postman API Fundamentals Student Expert",
    image: "/Postman.png",
    url: "https://badgr.com/public/assertions/lo6kFpJPS1mGhwT7cCh38Q"
  }
];


export const About = () => {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const overlayReady = useOverlayReady();

  
  if (typeof window !== 'undefined') {
    const mobile = window.innerWidth < 768;
    if (mobile !== isMobile) {
      setIsMobile(mobile);
    }
  }

  const handleCertClick = (url: string) => {
    window.open(url, '_blank');
  };

  if (isMobile) {
    return (
      <motion.div 
        className="certifications-container w-full bg-[#161711] rounded-xl p-2"
        initial={{ opacity: 0, y: 24 }}
        animate={overlayReady ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.h3 
          className="certifications-heading description lighter text-sm font-medium mb-1"
        >
          Certifications
        </motion.h3>
        <motion.div 
          className="flex flex-col gap-y-1"
          initial="hidden"
          animate={overlayReady ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } }
          }}
        >
          
          <motion.div className="grid grid-cols-5 gap-x-1">
            {certifications.slice(0, 5).map((cert, index) => (
              <motion.button
                key={index}
                className="cert-icon flex items-center justify-center rounded-lg hover:bg-[#2a2a2a] transition-colors cursor-pointer p-1 aspect-[4/3]"
                onClick={() => handleCertClick(cert.url)}
                aria-label={cert.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeInOut' } } }}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                  decoding="async"
                  width={48}
                  height={48}
                />
              </motion.button>
            ))}
          </motion.div>
          
          <div className="flex justify-center">
            <motion.div 
              className="grid grid-cols-4 gap-x-4"
              initial="hidden"
              animate={overlayReady ? "show" : "hidden"}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            >
              {certifications.slice(5, 9).map((cert, index) => (
                <motion.button
                  key={index + 5}
                  className="cert-icon flex items-center justify-center rounded-lg hover:bg-[#2a2a2a] transition-colors cursor-pointer p-1 aspect-[4/3]"
                  onClick={() => handleCertClick(cert.url)}
                  aria-label={cert.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeInOut' } } }}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-12 h-12 object-contain"
                    loading="lazy"
                    decoding="async"
                    width={48}
                    height={48}
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="certifications-container bg-[#161711] rounded-xl p-4 relative"
      initial={{ opacity: 0, y: 24 }}
      animate={overlayReady ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.h3 
        className="certifications-heading description lighter text-sm font-medium mb-4"
      >
        Certifications
      </motion.h3>
      
      <motion.div 
        className="absolute bottom-4 left-4 right-4"
      >
        <motion.div 
          className="flex flex-wrap gap-2 justify-start"
          initial="hidden"
          animate={overlayReady ? "show" : "hidden"}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="cert-icon flex items-center justify-center rounded-lg hover:bg-[#2a2a2a] transition-colors cursor-pointer p-1 relative"
              onClick={() => handleCertClick(cert.url)}
              onMouseEnter={() => setHoveredCert(cert.name)}
              onMouseLeave={() => setHoveredCert(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeInOut' } } }}
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-18 h-18 object-contain"
                loading="lazy"
                decoding="async"
                width={72}
                height={72}
              />
              {hoveredCert === cert.name && (
                <motion.div 
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10"
                >
                  {cert.name}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};