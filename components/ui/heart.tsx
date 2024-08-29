import React, { useEffect, useState } from 'react';
import { database, ref, set, onValue } from '../../lib/firebase'; 
import HeartIcon from '@/components/ui/hearticon'

const Counter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {

    const counterRef = ref(database, 'counter');


    const unsubscribe = onValue(counterRef, (snapshot) => {
      const data = snapshot.val();
      setCount(data || 0);
    });


    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    if (count !== null) {

      set(ref(database, 'counter'), count + 1);
    }
  };

  return (
    <div className="z-40 text-center justify-center items-center flex flex-col p-10">
      <HeartIcon onClick={handleClick}/>
      <p className="text-black dark:text-gray-100 pt-3">{count !== null ? count : 'Loading...'}</p>
    </div>
  );
};

export default Counter;
