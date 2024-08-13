import React from 'react';
import Tooltip from '@mui/material/Tooltip';

interface Skill {
  title: string;
  iconUrl: string;
  link: string;
  color: string;
}

const skills: Skill[] = [
  {
    title: "Python",
    iconUrl: "https://www.svgrepo.com/show/452091/python.svg",
    link: "https://www.python.org/",
    color: "#ffde57"
  },
  {
    title: "JavaScript",
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
    title: "CSS",
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
    iconUrl: "https://www.svgrepo.com/show/353689/electron.svg",
    link: "https://www.electronjs.org/",
    color: "#47848F"
  }
];

const InfScroller: React.FC = () => {
  return (
    <div>
      <div className="relative flex items-center">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 whitespace-nowrap text-black dark:text-white">
          <span className="text-sm font-thin text-black tracking-widest dark:text-slate-200 w-min">PROGRAMMING<br/>LANGUAGES</span>
        </div>
        <div className="flex-1 flex items-center justify-start ml-24">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {skills.map((skill) => (
              <Tooltip key={skill.title} title={skill.title} followCursor>
                <a href={skill.link} target="_blank" rel="noopener noreferrer" className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/8">
                  <div
                    className="flex items-center rounded-full bg-slate-900 justify-center border border-gray-100 dark:border-gray-900 transition-colors duration-300"
                    style={{ borderColor: 'gray' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = skill.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'gray')}
                  >
                    <img src={skill.iconUrl} alt={skill.title} className="h-16 w-16 p-4" />
                  </div>
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
      <div className="relative pt-10 flex items-center">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 whitespace-nowrap text-black dark:text-white">
          <span className="text-sm font-thin text-black tracking-widest dark:text-slate-200 w-min">FRAMEWORKS</span>
        </div>
        <div className="flex-1 flex items-center justify-start ml-24">
          <div className="flex flex-wrap gap-4 lg:grid-cols-2 justify-center md:justify-start">
            {frameworks.map((skill) => (
              <Tooltip key={skill.title} title={skill.title} followCursor>
                <a href={skill.link} target="_blank" rel="noopener noreferrer" className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/8">
                  <div
                    className="flex items-center rounded-full bg-slate-900 justify-center border border-gray-100 dark:border-gray-900 transition-colors duration-300"
                    style={{ borderColor: 'gray' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = skill.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'gray')}
                  >
                    <img src={skill.iconUrl} alt={skill.title} className="h-16 w-16 p-4" />
                  </div>
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfScroller;
