// components/Counter.tsx
import React, { useEffect, useState } from 'react';
import { database, ref, set, onValue } from '../../lib/firebase'; // Adjust the import path as needed
import HeartIcon from '@/components/ui/hearticon'

const Counter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Create a reference to the 'counter' node in the database
    const counterRef = ref(database, 'counter');

    // Listen for changes to the 'counter' node
    const unsubscribe = onValue(counterRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data || 0);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    if (count !== null) {
      // Update the 'counter' node with the new value
      set(ref(database, 'counter'), count + 1);
    }
  };

  return (
    <div className="z-40 text-center justify-center items-center flex flex-col p-10">
      <HeartIcon onClick={handleClick}/>
      <p className="text-black dark:text-slate-300">{count !== null ? count : 'Loading...'}</p>
    </div>
  );
};

export default Counter;
