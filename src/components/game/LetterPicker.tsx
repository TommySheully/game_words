import React, { Dispatch } from 'react';
import clsx from 'clsx';
import { useRotation } from '@/hook/useRotation.ts';

const RADIUS = 100;

type Props = {
  letters: string[];
  selectedWord: string;
  onSelectedWordChange: Dispatch<React.SetStateAction<string>>;
  onLetterClick: (letter: string) => void;
};

const LetterPicker = ({ letters, selectedWord, onSelectedWordChange, onLetterClick }: Props) => {
  const points = useRotation(letters.length, RADIUS);

  const handleMouseDown = (letter: string) => onSelectedWordChange(letter);
  const handleEnter = (letter: string) => selectedWord.length && letter !== selectedWord.at(-1) && onSelectedWordChange((prev) => prev + letter);

  const handleSelectLetter = (letter: string) => {
    onSelectedWordChange((prev) => prev + letter);
    onLetterClick(letter);
  };

  return (
    <div className="flex justify-center items-center rounded-full p-8 w-[200px] h-[200px] border-[20px] border-back relative my-[50px]">
      {points.map(({ x, y }, i) => (
        <div
          key={letters[i]}
          className={clsx(
            'flex justify-center items-center w-[60px] h-[60px] rounded-full select-none absolute',
            selectedWord.includes(letters[i]) ? 'bg-pink' : 'bg-gray',
          )}
          onTouchEnd={(event) => {
            event.preventDefault();
            handleSelectLetter(letters[i])
          }}

          onMouseDown={() => handleMouseDown(letters[i])}
          onMouseEnter={() => handleEnter(letters[i])}
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          <span className={clsx('text-4xl uppercase font-bold', selectedWord.includes(letters[i]) ? 'text-white' : 'text-main')}>
            {letters[i]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LetterPicker;
