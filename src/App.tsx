import './App.css'
import { useGameContext } from '@/store/context.tsx';
import { useState } from 'react';
import Game from '@/components/Game.tsx';

function App() {
  const { isLoading, setIsLoading } = useGameContext()
  const [isGame, setIsGame] = useState(true);

  return (
    <div className="flex justify-center w-full min:h-[100vh]">
      <div className="w-full max-w-[640px] h-full border-2">

        {isGame && <Game/>}

      </div>
    </div>
  )
}

export default App
