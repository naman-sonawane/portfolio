import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from '@/public/logo';

interface FloatingNavProps {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  isDarkMode: boolean;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, className, isDarkMode }) => {
  return (
    <div
      className={cn(
        "fixed z-[5000] flex m-10 items-center justify-center rounded-[10px] shadow-lg",
        className,
        "bg-white dark:bg-black",
        "bg-opacity-40 dark:bg-opacity-40", // Semi-transparent background
        "backdrop-blur-md dark:backdrop-blur-md", // Blur effect
        "border border-slate-300 dark:border-white border-opacity-20 dark:border-opacity-30",
        "w-min top-0 left-0 sm:w-[1/2vw] sm:left-auto sm:top-auto sm:right-0 sm:flex-row sm:bottom-0 sm:h-auto",
        "md:flex md:flex-col md:top-1/2 md:-translate-y-1/2",
        "lg:top-1/2 lg:-translate-y-1/2 lg:w-min lg:h-min lg:flex-col lg:justify-center lg:items-center"
      )}
    >
      <Logo 
        className="w-12 m-4 lg:mx-auto"
        iconColor={isDarkMode ? '#ededed' : '#292929'} 
      />

      {navItems.map((navItem, idx) => (
        <Link
          key={`link-${idx}`}
          href={navItem.link}
          className={cn(
            "flex items-center m-2 p-2 text-neutral-600 dark:text-neutral-50",
            "hover:text-green-500 dark:hover:text-green-400 transition-all duration-200 cursor-pointer",
            "rounded-lg hover:bg-opacity-20 dark:hover:bg-opacity-20", // Slight background on hover
            "transition-colors duration-200" // Smooth color transitions
          )}
        >
          {navItem.icon && <span className="block sm:hidden">{navItem.icon}</span>}
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </Link>
      ))}
    </div>
  );
};
