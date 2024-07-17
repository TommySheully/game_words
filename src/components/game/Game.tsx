import { useGameContext } from '@/store/context.tsx';
import { Letter } from '@/components/game/Letter.tsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LetterPicker from '@/components/game/GameBoard.tsx';
import _ from 'lodash';
import { getUniqLetters } from '@/util/words.ts';

export default function Game() {
  const { words, level, setWords, setStatus } = useGameContext();
  const [selectedWord, setSelectedWord] = useState<string>('');

  const letters = useMemo(() => _.shuffle(getUniqLetters(words.map((w) => w.word))), [level]);

  const handleFinishWord = useCallback(() => {
    setWords(words.map((x) => (x.word === selectedWord ? { ...x, open: true } : x)));
    setSelectedWord('');
  }, [selectedWord, setWords, words]);
  useMouseUp(handleFinishWord);

  // Game over
  useEffect(() => {
    if (words.every((word) => word.open)) {
      setStatus('info');
      setWords([]);
    }
  }, [setStatus, setWords, words]);

  return (
    <div className="flex flex-col items-center justify-start w-full p-2 gap-6 h-full">
      <div className="flex flex-col gap-2 items-center w-full">
        <h2 className="text-4xl pb-2">Уровень {level}</h2>
        {words.map((e, i) => (
          <div key={`word-${e.word}-${i}`} className="flex justify-center gap-2 w-full">
            {e.word.split('').map((l, index) => (
              <Letter key={`letter-${index}`} letter={l} open={e.open} />
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 w-full h-[40px]">
        {selectedWord.split('').map((l, index) => (
          <div key={index} className="flex justify-center items-center p-2 rounded-lg h-[40px] w-[40px] bg-gray">
            <span className="text-3xl uppercase font-bold text-main">{l}</span>
          </div>
        ))}
      </div>

      <LetterPicker onSelectedWordChange={setSelectedWord} selectedWord={selectedWord} letters={letters} />
    </div>
  );
}

const useMouseUp = (callback: () => void) => {
  useEffect(() => {
    document.addEventListener('mouseup', callback);
    return () => document.removeEventListener('mouseup', callback);
  }, [callback]);
};
