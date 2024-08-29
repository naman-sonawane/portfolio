"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { motion } from 'framer-motion';
import Image from "next/image";

export default function Projects() {
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: 'easeOut' } },
    };

    const projects = [
        {
            title: "FocusZone",
            href: "https://github.com/naman-sonawane/focus-zone",
            description: "An AI-powered productivity tool, designed to block distracting websites for enhanced focus. Supports any browser.",
            className: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500",
            skills: [
                "https://www.svgrepo.com/show/374146/typescript-official.svg", // Electron
                "https://www.svgrepo.com/show/374118/tailwind.svg", // Tailwind
                "https://www.svgrepo.com/show/374167/vite.svg", // Vite
                "https://www.svgrepo.com/show/452091/python.svg" // Python
            ]
        },
        {
            title: "SkillSage",
            href: "https://github.com/AahanGhode/SkillSage",
            description: "SkillSage provides flashcards, quizzes and comprehensive study guides by inputting any file type of a subject, using Groq AI.",
            className: "bg-gradient-to-br from-green-500 via-yellow-500 to-red-500",
            skills: [
                "https://www.svgrepo.com/show/378837/node.svg", // Node.js
                "https://svgl.app/library/groq.svg", // Groq AI
                "/css.svg" 
            ]
        },
        {
            title: "Directory Sorter",
            href: "https://github.com/naman-sonawane/directory-sorter/",
            description: "Designed to help organize a directory based on file type for development environments.",
            className: "bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500",
            skills: [
                "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg", // React
                "https://www.svgrepo.com/show/452091/python.svg" // Python
            ]
        },
        {
            title: "This website!",
            href: "https://namansonawane.vercel.app/",
            description: "Designed and developed this very portfolio website you're on right now :)",
            className: "bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500",
            skills: [
                "https://www.svgrepo.com/show/452045/js.svg", // JavaScript (Next.js dependency)
                "https://www.svgrepo.com/show/374118/tailwind.svg", // Tailwind
                "/framer.svg" 
            ]
        },
        {
            title: "Notes Webapp",
            href: "https://github.com/naman-sonawane/notes-webapp",
            description: "A simplistic notes webapp (one of my early projects :P), allowing you to save tasks, ideas, and lists to your local storage.",
            className: "bg-gradient-to-br from-gray-500 via-blue-500 to-teal-500",
            skills: [
                "https://www.svgrepo.com/show/452045/js.svg" // Vanilla JS
            ]
        }
    ];

    return (
        <div className="flex-col flex justify-center items-center">
            <motion.h1
                initial="hidden"
                transition={{ duration: 2.0, ease: 'easeInOut' }}
                whileInView="visible"
                viewport={{ once: false }}
                variants={textVariants}
                className="text-3xl sm:text-2xl md:text-3xl italic lg:text-3xl transition-colors duration-1000 text-black dark:text-white font-bold"
            >
                Projects
            </motion.h1>
            <div className="h-min p-10 w-full flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 flex justify-center items-center gap-8 mb-6">
                    {projects.map((project, index) => (
                        <PinContainer
                            key={index}
                            title={project.title}
                            href={project.href}
                            className="pt-5"
                        >
                            <div className="flex basis-full flex-col p-2 tracking-tight text-slate-100/50 sm:basis-1/2 w-[18rem] h-[16rem]">
                                <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                                    {project.title}
                                </h3>
                                <div className="text-base !m-0 !p-0 font-normal">
                                    <span className="text-slate-500">
                                        {project.description}
                                    </span>
                                </div>
                                <div className="flex absolute bottom-0 flex-wrap gap-2 mt-4">
                                    {project.skills.map((skill, i) => (
                                        <div key={i} className="bg-slate-900 rounded-full">
                                            <Image
                                                src={skill}
                                                alt="Skill Icon"
                                                width={24}
                                                height={24}
                                                className="object p-2 h-10 w-auto"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </PinContainer>
                    ))}
                </div>
            </div>
        </div>
    );
}
