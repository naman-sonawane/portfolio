import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';

interface Skill {
  title: string;
  iconUrl: string;
  link: string;
  color: string;
}

const skills: Skill[] = [
  // existing programming languages
  {
    title: "Python",
    iconUrl: "https://www.svgrepo.com/show/452091/python.svg",
    link: "https://www.python.org/",
    color: "#ffde57"
  },
  {
    title: "Vanilla JS",
    iconUrl: "https://www.svgrepo.com/show/452045/js.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    color: "#f7df1e"
  },
  {
    title: "Typescript",
    iconUrl: "https://www.svgrepo.com/show/374146/typescript-official.svg",
    link: "https://www.typescriptlang.org/",
    color: "#007acc"
  },
  {
    title: "Java",
    iconUrl: "https://www.svgrepo.com/show/452234/java.svg",
    link: "https://www.java.com/en/",
    color: "#f89820"
  },
  {
    title: "HTML",
    iconUrl: "/html.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    color: "#e34c26"
  },
  {
    title: "Vanilla CSS",
    iconUrl: "/css.svg",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    color: "#264de4"
  },
  {
    title: "SQL",
    iconUrl: "https://www.svgrepo.com/show/499816/database.svg",
    link: "https://www.mysql.com/",
    color: "#2695e4"
  },
  {
    title: "C#",
    iconUrl: "https://www.svgrepo.com/show/353622/c-sharp.svg",
    link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    color: "#9b4993"
  }
];

const frameworks: Skill[] = [
  {
    title: "React.js",
    iconUrl: "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg",
    link: "https://reactjs.org/",
    color: "#61DAFB"
  },
  {
    title: "TailwindCSS",
    iconUrl: "https://www.svgrepo.com/show/374118/tailwind.svg",
    link: "https://tailwindcss.com/",
    color: "#38B2AC"
  },
  {
    title: "Vite",
    iconUrl: "https://www.svgrepo.com/show/374167/vite.svg",
    link: "https://vitejs.dev/",
    color: "#646CFF"
  },
  {
    title: "Next.js",
    iconUrl: "/next.svg",
    link: "https://nextjs.org/",
    color: "#c2c2c2"
  },
  {
    title: "Bootstrap",
    iconUrl: "/bootstrap.svg",
    link: "https://getbootstrap.com/",
    color: "#8F12FD"
  },
  {
    title: "Node.js",
    iconUrl: "https://www.svgrepo.com/show/378837/node.svg",
    link: "https://nodejs.org/",
    color: "#8CC84B"
  },
  {
    title: "Astro",
    iconUrl: "https://astro.build/assets/press/astro-icon-light-gradient.svg",
    link: "https://astro.build/",
    color: "#FF5B9E"
  },
  {
    title: "Electron",
    iconUrl: "/electron.svg",
    link: "https://www.electronjs.org/",
    color: "#47848F"
  }
];

const tools: Skill[] = [
  {
    title: "Figma",
    iconUrl: "https://www.svgrepo.com/show/452202/figma.svg",
    link: "https://www.figma.com/",
    color: "#0acf83"
  },
  {
    title: "Flask",
    iconUrl: "/flask.svg",
    link: "https://flask.palletsprojects.com/en/3.0.x/",
    color: "#FFFFFF"
  },
  {
    title: "Git",
    iconUrl: "/git.svg",
    link: "https://git-scm.com/",
    color: "#F05032"
  },
  {
    title: "VS Code",
    iconUrl: "https://www.svgrepo.com/show/452129/vs-code.svg",
    link: "https://code.visualstudio.com/",
    color: "#007ACC"
  },
  {
    title: "Vercel",
    iconUrl: "/vercel.svg",
    link: "https://vercel.com/",
    color: "#FFFFFF"
  },
  {
    title: "Firebase",
    iconUrl: "https://www.svgrepo.com/show/373595/firebase.svg",
    link: "https://firebase.google.com/",
    color: "#FFC400"
  },
  {
    title: "Framer",
    iconUrl: "https://framerusercontent.com/images/h7FdBZniewu931bq7eEC8zTA4s.svg",
    link: "https://www.framer.com/",
    color: "#0099ff"
  },
  {
    title: "NPM",
    iconUrl: "https://www.svgrepo.com/show/452077/npm.svg",
    link: "https://www.npmjs.com/",
    color: "#CC3534"
  },
  {
    title: "Azure Cloud",
    iconUrl: "/azure.svg",
    link: "https://azure.microsoft.com/",
    color: "#0089FC"
  },
  {
    title: "Django",
    iconUrl: "https://www.svgrepo.com/show/373554/django.svg",
    link: "https://www.djangoproject.com/",
    color: "#05f54d"
  }
];

const InfScroller: React.FC = () => {
  return (
    <div className="space-y-16">
      <motion.div
        className="relative flex items-center pt-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 whitespace-nowrap text-black dark:text-white">
          <span className="text-sm font-thin text-black tracking-widest dark:text-slate-200">PROGRAMMING<br/>LANGUAGES</span>
        </div>
        <div className="flex-1 flex items-center justify-start ml-24">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {skills.map((skill) => (
              <Tooltip key={skill.title} title={skill.title} followCursor>
                <a href={skill.link} target="_blank" rel="noopener noreferrer" className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/8 flex flex-col items-center">
                  <div
                    className="flex items-center rounded-[10px] bg-slate-900 justify-center border border-gray-100 dark:border-gray-900 transition-colors duration-300"
                    style={{ borderColor: 'gray' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = skill.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'gray')}
                  >
                    <img src={skill.iconUrl} alt={skill.title} className="h-24 w-24 p-4" />
                  </div>
                  <p className="mt-2 text-sm text-center text-black dark:text-white">{skill.title}</p>
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative flex items-center pt-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 whitespace-nowrap text-black dark:text-white">
          <span className="text-sm font-thin text-black tracking-widest dark:text-slate-200">FRAMEWORKS</span>
        </div>
        <div className="flex-1 flex items-center justify-start ml-24">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {frameworks.map((skill) => (
              <Tooltip key={skill.title} title={skill.title} followCursor>
                <a href={skill.link} target="_blank" rel="noopener noreferrer" className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/8 flex flex-col items-center">
                  <div
                    className="flex items-center rounded-[10px] bg-slate-900 justify-center border border-gray-100 dark:border-gray-900 transition-colors duration-300"
                    style={{ borderColor: 'gray' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = skill.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'gray')}
                  >
                    <img src={skill.iconUrl} alt={skill.title} className="h-24 w-24 p-4" />
                  </div>
                  <p className="mt-2 text-sm text-center text-black dark:text-white">{skill.title}</p>
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative flex items-center pt-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 whitespace-nowrap text-black dark:text-white">
          <span className="text-sm font-thin text-black tracking-widest dark:text-slate-200">TECHNOLOGIES</span>
        </div>
        <div className="flex-1 flex items-center justify-start ml-24">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {tools.map((skill) => (
              <Tooltip key={skill.title} title={skill.title} followCursor>
                <a href={skill.link} target="_blank" rel="noopener noreferrer" className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/8 flex flex-col items-center">
                  <div
                    className="flex items-center rounded-[10px] bg-slate-900 justify-center border border-gray-100 dark:border-gray-900 transition-colors duration-300"
                    style={{ borderColor: 'gray' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = skill.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'gray')}
                  >
                    <img src={skill.iconUrl} alt={skill.title} className="h-24 w-24 p-4" />
                  </div>
                  <p className="mt-2 text-sm text-center text-black dark:text-white">{skill.title}</p>
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InfScroller;
