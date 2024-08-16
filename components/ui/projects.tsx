"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import {motion} from 'framer-motion'

export default function Projects() {
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: 'easeOut' } },
      };

      const projects = [
        {
            title: "FocusZone",
            href: "https://twitter.com/mannupaaji",
            description: "Customizable Tailwind CSS and Framer Motion Components.",
            className: "bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500"
        },
        {
            title: "SkillSage",
            href: "https://example.com",
            description: "Description of project 2.",
            className: "bg-gradient-to-br from-green-500 via-yellow-500 to-red-500"
        },
        {
            title: "Directory Sorter",
            href: "https://example.com",
            description: "Description of project 3.",
            className: "bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500"
        },
        {
            title: "This website!",
            href: "https://example.com",
            description: "Description of project 4.",
            className: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500"
        },
        {
            title: "Project 5",
            href: "https://example.com",
            description: "Description of project 5.",
            className: "bg-gradient-to-br from-gray-500 via-blue-500 to-teal-500"
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
      <div className="h-min p-10 w-full flex items-center justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 flex justify-center items-center gap-8 mb-6">
      {projects.map((project, index) => (
        <PinContainer
        key={index}
        title={project.title}
        href={project.href}
        className="pt-5"
        >
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[16rem] h-[16rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
              {project.title}
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500 ">
                {project.description}
              </span>
            </div>
            <div className="flex flex-1 w-full rounded-[8px] mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
          </div>
        </PinContainer>
        ))}
      </div>
      </div>
      </div>
    );
  }