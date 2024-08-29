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
import Footer from '@/components/ui/footer';
import { useRouter } from 'next/router'; // Import useRouter

export default function About() {
  const [isDarkMode, setDarkMode] = useState(true);
  const router = useRouter(); // Initialize router
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: 'easeOut' } },
  };

  const handleBadgeClick = () => {
    router.push('/work'); // Navigate to /work page
  };

  const navItems = [
    { name: "Work", link: "/work", icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    { name: "About", link: "/about", icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" /> },
    { name: "Contact", link: "/contact", icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" /> },
  ];

  return (
    <>
      <Head>
        <title>About ⫽ Naman Sonawane</title>
      </Head>

      <main className={`relative ${isDarkMode ? 'dark' : ''}`}>
        <div className="fixed top-0 left-0 w-full z-[5000] p-4 flex justify-center">
          <FloatingNav navItems={navItems} isDarkMode={isDarkMode} className="z-10" />
        </div>

        <div className="fixed bottom-0 right-0 z-[999] border-slate-500 border-opacity-25 border-2 m-10 p-2 rounded-[10px] transition-transform duration-300 ease-in-out flex w-min h-min">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />
        </div>

        <div className="flex flex-col items-center overflow-x-hidden mx-auto px-5">
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
                <div className="relative flex flex-col items-center">
                  {/* Badges Section */}
                  <div className="absolute flex flex-row gap-2 -bottom-8">
                    <a onClick={handleBadgeClick} className="cursor-pointer">
                      <img
                        src="https://images.credly.com/size/150x150/images/37e26478-d80c-43e8-80eb-ec492f3a26c1/image.png"
                        alt="PCEP Badge"
                        className="w-16 h-16 hover:drop-shadow-[0_0_8px_#ebcf34] transition-all"
                      />
                    </a>
                    <a onClick={handleBadgeClick} className="cursor-pointer">
                      <img
                        src="https://images.credly.com/size/150x150/images/4e248e82-9e87-4a63-9263-250fafe5fb1f/image.png"
                        alt="PCAP Badge"
                        className="w-16 h-16 hover:drop-shadow-[0_0_8px_#0c79f5] transition-all"
                      />
                    </a>
                    <a onClick={handleBadgeClick} className="cursor-pointer">
                      <img
                        src="https://images.credly.com/size/150x150/images/b790eb12-ecb3-4b94-89be-61aa40c92e7c/image.png"
                        alt="PCPP Badge"
                        className="w-16 h-16 hover:drop-shadow-[0_0_8px_#f5430c] transition-all"
                      />
                    </a>
                  </div>

                  {/* Profile Picture */}
                  <Tooltip title="Naman :)" followCursor>
                    <Image
                      src={pfp}
                      alt="Profile Picture"
                      className="rounded-full transition-transform w-60 h-60 duration-300 ease-in-out"
                    />
                  </Tooltip>
                </div>
                <div className="flex flex-col items-left w-2/3 lg:w-1/2 md:w-1/2 space-y-4">
                  <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className={`text-xl sm:text-2xl w-full md:text-3xl italic transition-colors duration-1000 text-black dark:text-white font-bold`}
                  >
                    I&apos;m a <p className="animate-breathing-gradient bg-rainbow-gradient bg-clip-text text-transparent">Full-Stack Developer</p> working in Toronto, CA.
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
