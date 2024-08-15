"use client";
import Hero from "@/components/Hero";
import Starfield from "@/components/ui/starbg";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import React from 'react';
import { FloatingNav } from '@/components/ui/NavBar';
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import Head from 'next/head'
import Footer from '@/components/ui/footer'

export default function Home() {
  const [isDarkMode, setDarkMode] = React.useState(true);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
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
        <title>Home ⫽ Naman Sonawane</title>
    </Head>

    <main className={`h-screen relative ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-center w-auto z-[5000] h-screen sm:h-auto sm:w-screen px-auto md:w-auto md:h-screen lg:w-auto lg:h-screen absolute items-center">
        <FloatingNav navItems={navItems} isDarkMode={isDarkMode} className="z-10" /></div>
      
        <div className="fixed bottom-0 right-0 z-[999] border-slate-500 border-opacity-25 border-2 m-10 p-2 rounded-[10px] scale-100 hover:scale-110 transition-transform duration-300 ease-in-out flex w-min h-min">
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
          <div className="relative z-10">
            <Hero/>
          </div>
        </div>
      </div>
      <Footer/>
    </main>
    </>
  );
}
