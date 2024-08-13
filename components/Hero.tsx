import { motion } from 'framer-motion';
import React from 'react';
import { Spotlight } from './ui/Spotlight';
import ContactButton from './ui/contactbutton'
import Link from 'next/link'

const Hero = () => {
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2.0,
        ease: 'easeOut',
      },
    },
  };
  const textVariants2 = {
    hidden: {
      opacity: 0,
      y: -1000,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2.0,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="pb-20 pt-36 flex">
      <Spotlight
        className="-top-40 -left-40 md:-left-32 md:-top-30 h-screen"
        fill="white"
      />
      <Spotlight
        className="h-[80vh] w-[50vw] top-30 left-full md:top-20"
        fill="#c4a1e3"
      />
      <div className="pl-5">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-4xl sm:text-xl md:text-2xl text-slate-600 lg:text-3xl dark:text-slate-500 transition-colors duration-1000"
        >
          Hey, I&apos;m
        </motion.h1>
<h1
  className="
    text-4xl sm:text-3xl md:text-4xl lg:text-5xl
    text-black dark:text-white font-bold
    dark:hover:bg-clip-text hover:bg-clip-text hover:text-transparent dark:hover:text-transparent
    hover:bg-gradient-to-r dark:hover:bg-gradient-to-r
    hover:from-emerald-500 dark:hover:from-teal-300 hover:via-teal-400 dark:hover:via-teal-400 hover:to-indigo-500
    hover:tracking-wider dark:hover:tracking-wider dark:hover:to-indigo-500
    italic transition-all pt-3 duration-500
  "
>
  NAMAN SONAWANE.
</h1>
        <div className="relative flex flex-row">
          <span className="text-black text-sm sm:text-md md:text-lg lg:text-xl dark:text-white transition-all pt-3 duration-500 type-titles"></span>
          <Link href="/contact">
            <div className="absolute right-0 pt-3">
              <ContactButton />
            </div>
          </Link>
          </div>

      </div>
    </div>
  );
};

export default Hero;
