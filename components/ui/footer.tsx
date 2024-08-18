import React from 'react';
import { motion } from 'framer-motion';
import Counter from '@/components/ui/heart';

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <motion.footer
            className={`relative flex items-center -bottom-30 pt-10 justify-between w-screen p-4 overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
        >
            <div className="absolute inset-0 z-[1] mt-20 -bottom-30 dark:bg-gradient-to-b dark:from-transparent dark:to-black bg-gradient-to-b from-transparent to-slate-200">
            </div>

            <div className="text-center z-10 p-16 m-10 w-screen flex-col h-auto flex-grow">
                <p className="absolute left-1/2 transform -translate-x-1/2 text-bold text-black dark:text-slate-300 z-10">Made with ✨ by Naman</p>
                <Counter />
            </div>
        </motion.footer>
    );
}

export default Footer;
