import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import pfp from '@/public/pfp.png';
import Starfield from "@/components/ui/starbg";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FloatingNav } from '@/components/ui/NavBar';
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Head from 'next/head';
import Hobbies from '@/components/ui/hobbies';
import InfScroller from '@/components/ui/infscroller';
import Footer from '@/components/ui/footer'

export default function About() {
  const [isDarkMode, setDarkMode] = useState(true);
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: 'easeOut' } },
  };

  const navItems = [
    { name: "About", link: "/about", icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    { name: "Projects", link: "/projects", icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" /> },
  ];

  return (
    <>
      <Head>
        <title>About ⫽ Naman Sonawane</title>
      </Head>

      <main className={`min-h-screen relative overflow-auto ${isDarkMode ? 'dark' : ''}`}>
        <div className="fixed top-0 left-0 w-full z-[5000] p-4 flex justify-center">
          <FloatingNav navItems={navItems} isDarkMode={isDarkMode} className="z-10" />
        </div>

        <div className="fixed bottom-0 right-0 z-[999] border-slate-500 border-opacity-25 border-2 m-10 p-2 rounded-[10px] scale-100 hover:scale-110 transition-transform duration-300 ease-in-out z-10 flex w-min h-min">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />
        </div>

        <div className="flex flex-col items-center mx-auto px-5">
          <div className="max-w-7xl w-full relative">
            <div className="absolute inset-0 z-0">
              <Starfield
                starCount={2000}
                starColor={isDarkMode ? [255, 255, 255] : [0, 0, 0]}
                speedFactor={0.1}
                backgroundColor={isDarkMode ? 'black' : 'white'}
              />
            </div>
            <div className="relative z-10 h-screen flex justify-center flex-col items-center">
              <div className="flex-col sm:flex-row flex items-center justify-center w-auto space-x-10">
                <Tooltip title="Naman :)" followCursor>
                  <Image
                    src={pfp}
                    alt="Profile Picture"
                    className="rounded-full border-[10px] border-white dark:border-[#000000] transition-transform w-60 h-60 duration-300 ease-in-out hover:scale-110 hover:rotate-6"
                  />
                </Tooltip>
              <div className="flex flex-col items-left w-1/2 space-y-4">
                  <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className={`text-xl sm:text-2xl w-full md:text-3xl italic transition-colors duration-1000 text-black dark:text-white font-bold`}
                  >
                    I&apos;m a Full-Stack Developer working in Toronto, CA.
                  </motion.h1>
                  <h6 className="text-black dark:text-slate-400 w-2/3 sm:w-3/4">
                  I love diving into both backend and frontend work. Whether crafting UI/UX or sorting out server-side logic, I relish the challenge and creativity along the journey. I&apos;m a passionate self-learner and enjoy exploring new technologies.
                  </h6>
                </div>
              </div>
            </div>
            <div className="relative z-10 h-auto flex justify-center flex-col items-center text-center mt-16">
              <div className="relative flex flex-col items-center">
                <h1 className="text-3xl sm:text-2xl py-10 md:text-3xl absolute top-24 md:top-50 sm:top-32 lg:top-24 whitespace-nowrap transform -translate-y-1/2 italic lg:text-3xl transition-colors duration-1000 text-black dark:text-slate-500 font-bold">Hobbies</h1>
                <Hobbies />
              </div>
            </div>
            <div className="relative z-10 h-auto flex justify-center flex-col items-left mt-16">
              <div className="relative flex flex-col items-left">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className={`text-3xl sm:text-2xl md:text-3xl p-10 pt-40 top-24 md:top-50 sm:top-32 lg:top-24 whitespace-nowrap transform -translate-y-1/2 italic lg:text-3xl transition-colors duration-1000 text-black dark:text-white font-bold`}
                >
                  Technical
                </motion.h1>
                <InfScroller />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
