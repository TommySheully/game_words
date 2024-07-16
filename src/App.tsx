import './App.css';
import { useGameContext } from '@/store/context.tsx';
import Game from '@/components/game/Game.tsx';
import { Info } from '@/components/Info.tsx';
import { Update } from '@/components/Update.tsx';

function App() {
  const { status  } = useGameContext()

  return (
    <div className="flex justify-center w-full min:h-[100vh]">
      <div className="w-full max-w-[640px] h-full border-2">

        {status === "game" && <Game/>}
        {status === "info" && <Info/>}
        {false  && <Update onUpdate={() => {}} />}

      </div>
    </div>
  )
}

export default App
