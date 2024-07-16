import { useGameContext } from '@/store/context.tsx';
import { Letter } from '@/components/Letter.tsx';
import React, { useEffect, useMemo, useState } from 'react';
import GameBoard from '@/components/GameBoard.tsx';
import _ from 'lodash';

export default function Game() {
  const { words, level, setWords } = useGameContext();
  const [selectedWord, setSelectedWord] = useState<string>('');

  const letters = useMemo(() => _.chain(words)
    .map(e => e.word.split(''))
    .flatten()
    .uniq()
    .value(), [words]);

  useEffect(() => {
    if (_.find(words, { 'word': selectedWord })) {
      setWords( words.map(e => e.word === selectedWord ? { ...e, isGuess: true } : e));
    }
  }, [selectedWord]);

  return (
    <div className="flex flex-col items-center justify-start w-full p-2 gap-6 h-full">

      <div className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-4xl pb-2">Уровень {level}</h2>
        {words.map((e, i) => (<div key={i} className="flex justify-center gap-2 w-full">
          {e.word.split('')
            .map(l => <Letter letter={l} isGuess={e.isGuess} />,
            )}
        </div>))
        }
      </div>

      <div className="flex justify-center gap-2 w-full h-[40px]">
        {selectedWord.split('').map((l, index) => (
          <div key={index} className="flex justify-center items-center p-2 rounded-lg h-[40px] w-[40px] bg-gray">
          <span className="text-3xl uppercase font-bold text-main">{l}</span>
        </div>
        ))}
      </div>

      <GameBoard onSelectedWordChange={setSelectedWord} selectedWord={selectedWord} letters={letters} />

    </div>
  );
}
