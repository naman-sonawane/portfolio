"use client";
import { motion } from 'framer-motion';
import Footer from '@/components/ui/footer';
import Starfield from "@/components/ui/starbg";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import React from 'react';
import { FloatingNav } from '@/components/ui/NavBar';
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Head from 'next/head';

export default function Contact() {
  const [isDarkMode, setDarkMode] = React.useState(true);
  const [hoveredLogo, setHoveredLogo] = React.useState<string | null>(null);
  const [displayText, setDisplayText] = React.useState('CONTACT');

  let hoverTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const handleMouseEnter = (logoName: string) => {
    setHoveredLogo(logoName);


    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    hoverTimeout.current = setTimeout(() => {
      setDisplayText(logoName.toUpperCase());
    }, 300); // 300ms delay for text change
  };

  const handleMouseLeave = () => {

    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => {
      setDisplayText('CONTACT');
    }, 200); // 200ms delay for text change
    setHoveredLogo(null);
  };

  const navItems = [
    {
      name: "About",
      link: "/about",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Work",
      link: "/work",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <>
      <Head>
        <title>Contact ⫽ Naman Sonawane</title>
      </Head>

      <main className={`h-screen relative ${isDarkMode ? 'dark' : ''}`}>
        <div className="flex justify-center w-auto z-[5000] h-screen sm:h-auto sm:w-screen px-auto md:w-auto md:h-screen lg:w-auto lg:h-screen absolute items-center">
          <FloatingNav navItems={navItems} isDarkMode={isDarkMode} className="z-10" />
        </div>
        
        <div className="fixed bottom-0 right-0 z-[999] border-gray-500 border-opacity-25 border-2 m-10 p-2 rounded-[10px] scale-100 hover:scale-110 transition-transform duration-300 ease-in-out flex w-min h-min">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />
        </div>

        <div className="h-full flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
          <div className="max-w-7xl w-full relative">
            <div className="absolute inset-0 z-0">
              <Starfield
                starCount={2000}
                starColor={isDarkMode ? [255, 255, 255] : [0, 0, 0]}
                speedFactor={0.1}
                backgroundColor={isDarkMode === true ? 'black' : 'white'}
              />
            </div>
            <div className="z-10 flex justify-center items-center">
              {}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4 z-20">
                <a 
                  href="https://www.linkedin.com/in/naman-sonawane/"
                  onMouseEnter={() => handleMouseEnter('linkedin')}
                  onMouseLeave={handleMouseLeave}
                >
                  <img className="w-20 h-auto p-2 bg-black rounded-full hover:p-4 transition-all" src="/linkedinlogo.svg" />
                </a>
                <a 
                  href="https://github.com/naman-sonawane/"
                  onMouseEnter={() => handleMouseEnter('github')}
                  onMouseLeave={handleMouseLeave}
                >
                  <img className="w-20 h-auto p-2 bg-black rounded-full hover:p-4 transition-all" src="/githublogo.svg" />
                </a>
              </div>
              
              {}
              <div className={`bg-rainbow-gradient animate-breathing-gradient z-10 -skew-x-12 w-9/12 h-20 p-1 relative`}>
                <div className="bg-white dark:bg-[#000] min-h-full w-auto"></div>
              </div>
              
              {}
              <h1
                className={`text-4xl font-bold text-stroke italic absolute bottom-0 left-1/2 transform -translate-x-1/2 z-1 transition-all duration-500 ${hoveredLogo ? 'translate-y-3/4' : 'bottom-40 translate-y-2/3'}`}
                style={{ transform: hoveredLogo ? 'translate(-50%, 60%)' : '' }}
              >
                {displayText}
              </h1>
            </div>
          </div>
          <div className="w-3/4 items-left flex">
          <motion.div
            className="relative flex pt-10 text-left w-full lg:w-1/2 md:w-1/2"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl sm:text-lg md:text-lg text-slate-600 lg:text-xl text-slate-500 dark:text-slate-300" > Feel free to connect with me on LinkedIn or check out my work on Github ✌️</p>
          </motion.div>
          </div>
        </div>

        {}
        <Footer className="absolute bottom-0 left-0 w-fullpy-4 px-6 text-center z-20" />
      </main>
    </>
  );
}
