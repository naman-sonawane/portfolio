import { useEffect, useState } from "react";

export const useOverlayReady = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const anyWindow = window as unknown as { __nsUncovered?: boolean };
    if (anyWindow.__nsUncovered) {
      setReady(true);
      return;
    }
    const onUncovered = () => setReady(true);
    window.addEventListener('ns-overlay-uncovered', onUncovered, { once: true });
    
    const t = setTimeout(() => setReady(true), 1500);
    return () => {
      window.removeEventListener('ns-overlay-uncovered', onUncovered);
      clearTimeout(t);
    };
  }, []);

  return ready;
};

export default useOverlayReady;


