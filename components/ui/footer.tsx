import { useState } from "react";
import Image from 'next/image';
import planet from '@/public/planet.png';
import React from 'react';

const Footer = () => {
    const [isClick, setClick] = useState(false);

    return (
        <footer className="relative flex items-center absolute -bottom-30 justify-between w-screen p-4 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-10 -bottom-30">
                <Image
                    src={planet}
                    alt="Planet Background"
                    objectFit="cover"
                />
            </div>

            <div className="z-20 flex items-center p-16 m-10">
                {/* Heart */}
            </div>

            <div className="text-center w-screen h-auto flex-grow">
                <p className="absolute left-1/2 transform -translate-x-1/2 text-bold text-black dark:text-slate-300 z-10">Made with ✨ by Naman</p>
            </div>
        </footer>
    );
}

export default Footer;
