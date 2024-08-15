"use client";
import { motion } from 'framer-motion';
import Starfield from "@/components/ui/starbg";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import React from 'react';
import { FloatingNav } from '@/components/ui/NavBar';
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Head from 'next/head'
import Footer from '@/components/ui/footer'
import Popup from '@/components/ui/certspopup'

export default function Work() {
  const [isDarkMode, setDarkMode] = React.useState(true);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 2.0, ease: 'easeOut' } },
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
        <title>Work ⫽ Naman Sonawane</title>
      </Head>

      <main className={`relative ${isDarkMode ? 'dark' : ''}`}>
        <div className="flex justify-center w-auto z-[5000] h-screen sm:h-auto sm:w-screen px-auto md:w-auto md:h-screen lg:w-auto lg:h-screen absolute items-center">
          <FloatingNav navItems={navItems} isDarkMode={isDarkMode} className="z-10" />
        </div>
        
        <div className="fixed bottom-0 right-0 z-[999] border-slate-500 border-opacity-25 border-2 m-10 p-2 rounded-[10px] scale-100 hover:scale-110 transition-transform duration-300 ease-in-out flex w-min h-min">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />
        </div>

        <div className="h-full flex justify-center items-center flex-col mx-auto sm:px-10 px-5">
          <div className="max-w-7xl w-full relative">
            <div className="absolute inset-0 z-0">
              <Starfield
                starCount={2000}
                starColor={isDarkMode ? [255, 255, 255] : [0, 0, 0]}
                speedFactor={0.1}
                backgroundColor={isDarkMode === true ? 'black' : 'white'}
              />
            </div>
            <div className="relative z-10 h-screen flex items-center flex-col">
              <div className="flex-col sm:flex-row flex items-center pt-20 justify-center w-1/3 sm:w-full space-x-10">
                
                <div className="flex-col sm:flex-row items-center gap-20 flex justify-center">
                  <div className="flex-col items-start w-min">
                  <motion.h1
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                    className={`text-3xl sm:text-2xl md:text-3xl w-min top-24 md:top-50 sm:top-32 lg:top-24 whitespace-nowrap transform -translate-y-1/2 italic lg:text-3xl transition-colors duration-1000 text-black dark:text-white font-bold`}
                  >
                    Certifications
                  </motion.h1>
                  <h6 className="text-black dark:text-slate-300 w-full">
                    Working with Python is a real thrill for me! These badges showcase the credentials I've earned in Python programming after great persistence. Every project feels like a new adventure, and I love seeing what I can come up with next. ⛰️
                  </h6>
                  </div>
                  <div className="flex flex-col items-center space-y-4 mt-8">
                    <div className="flex justify-center space-x-4">
                      <img
                        src="https://images.credly.com/size/340x340/images/b790eb12-ecb3-4b94-89be-61aa40c92e7c/image.png"
                        alt="PCEP Badge"
                        className="w-32 h-32"
                      />
                      <img
                        src="https://images.credly.com/size/340x340/images/4e248e82-9e87-4a63-9263-250fafe5fb1f/image.png"
                        alt="PCAP Badge"
                        className="w-32 h-32"
                      />
                    </div>
                    <img
                      src="https://images.credly.com/size/340x340/images/37e26478-d80c-43e8-80eb-ec492f3a26c1/image.png"
                      alt="PCPP Badge"
                      className="w-32 h-32"
                    />
                  </div>
                </div>
              </div><div className="pt-20 flex-col text-center items-center flex justify-center">
                <h6 className="text-black dark:text-slate-300 w-full sm:w-2/3">
                  Dabbling into the latest tech like AI and Azure Cloud brings fresh excitement and innovation to my work.
                </h6>
                <Popup />
                </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
