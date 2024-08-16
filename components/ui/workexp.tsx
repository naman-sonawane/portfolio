"use client";
import { motion } from 'framer-motion';
import Image from "next/image";

export default function WorkExperienceCards() {
  const experiences = [
    {
      title: "Programming Instructor",
      companyName: "Code Ninjas",
      description: "Engaging students with interactive and hands-on activities has always been a key part of my approach to helping them grow in their coding journey. I’ve found that promoting camps and other events effectively allows me to attract potential customers by showcasing the value of the program.",
      skills: [
        "https://www.svgrepo.com/show/452045/js.svg",
        "https://www.svgrepo.com/show/452091/python.svg",
        "https://www.svgrepo.com/show/353622/c-sharp.svg"
      ],
      duration: "March 2023 - Present",
    },
    {
      title: "Founder & Full Stack Developer",
      companyName: "Scripty",
      description: "Leveraging Artificial Intelligence models for Scripty, an AI-powered task automation assistant. Recieved $1,000 in AWS credits from Amazon to drive Scripty's growth as an AI venture.",
      skills: [
        "/electron.svg",
        "https://www.svgrepo.com/show/374167/vite.svg",
        "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg",
        "https://www.svgrepo.com/show/374146/typescript-official.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
      ],
      duration: "May 2024 - Present",
    },
    {
      title: "Web Developer + Organizer",
      companyName: "Hackathons Canada",
      description: "Developed a database to help programming enthusiasts find ongoing hackathons. Designed and developed the dashboard and landing page for Hack Canada, while also organizing the hackathon event.",
      skills: [
        "https://www.svgrepo.com/show/452202/figma.svg",
        "/next.svg",
        "https://www.svgrepo.com/show/374118/tailwind.svg",
      ],
      duration: "June 2024 - Present",
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex-col">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
        className="text-3xl sm:text-2xl md:text-3xl p-10 top-24 md:top-50 sm:top-32 lg:top-24 whitespace-nowrap transform -translate-y-1/2 italic lg:text-3xl transition-colors duration-1000 text-black dark:text-white font-bold"
      >
        Experience
      </motion.h1>
      <div className="max-w-6xl w-screen mx-auto px-4">
        {experiences.map((experience, index) => (
            <div className="hover:translate-x-4 transition-all transform">
          <motion.div
            key={index}
            className="group relative flex justify-center items-center shadow-lg overflow-hidden mb-8 p-6 w-full md:w-3/5 lg:w-3/5 transition-all transform"
            variants={cardVariants}
            initial="hidden"
            transition={{ duration: 2.0, ease: 'easeInOut' }}
            whileInView="visible"
            viewport={{ once: false }}
          >
            <div>
            <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-gray-700 to-gray-900 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{experience.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">@ {experience.companyName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">{experience.duration}</p>
              <p className="text-gray-700 dark:text-gray-200 mt-4">{experience.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.skills.map((skill, i) => (
                  <Image
                    key={i}
                    src={skill}
                    alt="Skill Icon"
                    width={24}
                    height={24}
                    className="object p-2 w-10 h-auto bg-slate-900 rounded-full"
                  />
                ))}
              </div>
            </div>
            </div>
          </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}