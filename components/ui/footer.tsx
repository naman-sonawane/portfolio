import Counter from '@/components/ui/heart';
import React from 'react';

const Footer = () => {
    return (
        <footer className="relative flex items-center -bottom-30 pt-10 justify-between w-screen p-4 overflow-hidden">
            <div className="absolute inset-0 z-[1] mt-20 -bottom-30 dark:bg-gradient-to-b dark:from-transparent dark:to-black bg-gradient-to-b from-transparent to-slate-200">
            </div>

            <div className="text-center z-10 p-16 m-10 w-screen flex-col h-auto flex-grow">
                <p className="absolute left-1/2 transform -translate-x-1/2 text-bold text-black dark:text-slate-300 z-10">Made with ✨ by Naman</p>
                <Counter />
            </div>
        </footer>
    );
}

export default Footer;
