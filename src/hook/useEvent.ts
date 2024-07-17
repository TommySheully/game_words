import { useEffect } from 'react';

export const useEvent = (event: string, callback: () => void) => {
  useEffect(() => {
    document.addEventListener(event, callback);
    return () => {
      document.removeEventListener(event, callback);
    }
  }, [callback]);
};
