import { useGameContext } from '@/store/context.tsx';
import { Letter } from '@/components/Letter.tsx';
import React, { useState } from 'react';
import FF from '@/components/GameBoard.tsx';

export default function Game() {
  const { words, level } = useGameContext();
  const [trigger, setTrigger] = useState(false);
  const [userWord, setUserWord] = useState<string>('');

  return (
    <div className="flex flex-col items-center justify-center w-full p-2 gap-4">
      <h2 className="text-4xl">Уровень {level}</h2>
      <div className="flex flex-col gap-2 items-center w-full">
        {words.map((e) => (<div className="flex justify-center gap-2 w-full">
            {e.word.split('')
              .map(l => <Letter letter={l} isGuess={e.isGuess} />,
              )}
          </div>))
        }
      </div>
      <div>
        <FF letters={words[words.length -1].word.split('')} />
      </div>


    </div>
  );
}
