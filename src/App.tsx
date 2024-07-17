import './App.css';
import { useGameContext } from '@/store/context.tsx';
import Game from '@/components/game/Game.tsx';
import { Info } from '@/components/Info.tsx';
import { Update } from '@/components/Update.tsx';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useSyncId = () => {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let sessionId = sessionStorage.getItem('sessionId')

    if (!sessionId) {
      sessionId = uuidv4()
      sessionStorage.setItem('sessionId', sessionId);
      localStorage.setItem('globalId', sessionId);
    }

    const globalId = localStorage.getItem('globalId');

    if (sessionId !== globalId) {
      setIsUpdated(true);
    }

    const handleFocus = () => {
      const currentGlobalId = localStorage.getItem('globalId');
      if (currentGlobalId !== sessionId) {
        setIsUpdated(true);
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return isUpdated;
};

function App() {
  const { status  } = useGameContext()

  const isUpdated = useSyncId();

  return (
    <div className="flex justify-center w-full min:h-[100vh]">
      <div className="w-full max-w-[640px] h-full">

        {status === "game" && <Game/>}
        {status === "info" && <Info/>}
        {isUpdated && <Update onUpdate={() => window.location.reload()} />}

      </div>
    </div>
  )
}

export default App
