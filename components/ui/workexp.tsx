"use client";
import { motion } from 'framer-motion';
import Image from "next/image";

export default function WorkExperienceCards() {
  const experiences = [
    {
      title: "Software Engineer",
      description: "Developed and maintained web applications using React and Node.js.",
      skills: [
        "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg",
        "https://www.svgrepo.com/show/374118/tailwind.svg",
      ],
      duration: "2 years",
    },
    {
      title: "UX Designer",
      description: "Designed user interfaces and user experiences for mobile and web applications.",
      skills: [
        "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg",
        "https://www.svgrepo.com/show/374118/tailwind.svg",
      ],
      duration: "1.5 years",
    },
    {
      title: "Project Manager",
      description: "Led project teams to deliver complex software projects on time and within budget.",
      skills: [
        "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg",
        "https://www.svgrepo.com/show/374118/tailwind.svg",
      ],
      duration: "3 years",
    },
    {
      title: "Data Analyst",
      description: "Analyzed data to drive business decisions and insights using SQL and Python.",
      skills: [
        "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg",
        "https://www.svgrepo.com/show/374118/tailwind.svg",
      ],
      duration: "2.5 years",
    },
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: 'easeOut' } },
  };

  return (
    <div className="flex-col">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className={`text-3xl sm:text-2xl md:text-3xl p-10 top-24 md:top-50 sm:top-32 lg:top-24 whitespace-nowrap transform -translate-y-1/2 italic lg:text-3xl transition-colors duration-1000 text-black dark:text-white font-bold`}
      >
        Experience
      </motion.h1>
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="group cursor-pointer overflow-hidden relative h-96 rounded-[10px] shadow-xl bg-gradient-to-b from-gray-700 to-gray-900 transition-opacity duration-300 hover:opacity-80"
          >
            <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="flex flex-col space-y-2 z-10 p-4">
              <div className="flex space-x-2">
                {experience.skills.map((skill, i) => (
                  <Image
                    key={i}
                    src={skill}
                    alt="Skill Icon"
                    width={24}
                    height={24}
                    className="object-contain w-1/6 lg:w-1/12 h-auto"
                  />
                ))}
              </div>
              <div className="text content p-4 flex flex-col">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                  {experience.title}
                </h1>
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                  {experience.description}
                </p>
              </div>
            </div>
            <p className="absolute bottom-4 left-4 text-sm text-gray-400">
              {experience.duration}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
