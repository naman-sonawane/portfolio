import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const cards = [
  { imageUrl: '/photography.jpg', label: 'Photography', direction: 'left', angle: 10 },
  { imageUrl: '/reading.jpg', label: 'Reading', direction: 'right', angle: -10 },
  { imageUrl: '/programming.png', label: 'Programming', direction: 'left', angle: 20 },
  { imageUrl: '/traveling.jfif', label: 'Traveling', direction: 'right', angle: -20 },
];

const cardVariants = {
  hidden: (direction) => ({
    x: direction === 'left' ? '-100vw' : '100vw',
    rotate: direction === 'left' ? -100 : 100,
    transition: { duration: 1, ease: 'easeInOut' }
  }),
  visible: (direction, angle) => ({
    opacity: 1,
    x: 0,
    rotate: direction === 'left' ? -10 : 10,
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] }
  }),
};

const Hobbies = () => {
  const [showCards, setShowCards] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowCards(true);
      } else {
        setShowCards(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showCards) {
      controls.start((direction) => cardVariants.visible(direction, 0));
    } else {
      controls.start((direction) => cardVariants.hidden(direction));
    }
  }, [showCards, controls]);

  return (
    <div className="grid grid-cols-2 mt-20">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="relative rounded-[10px]"
          custom={card.direction}
          variants={cardVariants}
          initial="hidden"
          animate={controls}
          style={{
            zIndex: index + 1,
          }}
        >
          <img src={card.imageUrl} alt={card.label} className="w-100 shadow-lg md:w-80 sm:w-50 h-auto" />
          <div className="absolute bottom-0 left-0 right-0 text-center bg-white dark:bg-black p-2">
            <span className="text-black italic dark:text-white">{card.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Hobbies;
