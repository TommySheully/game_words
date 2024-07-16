import React, { Dispatch, useState } from 'react';
import clsx from 'clsx';
import { useCoordinates } from '@/hook/useCoordinates.ts';

type Props = {
  letters: string[];
  selectedWord: string
  onSelectedWordChange: Dispatch<React.SetStateAction<string>>;
};


const GameBoard: React.FC<Props> = ({ letters, onSelectedWordChange }) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]); // индексы выбранных букв

  const handleMouseDown = (index: number) => {
    onSelectedWordChange(letters[index]);
    setSelectedIndices([index]);
  };

  const handleMouseEnter = (index: number) => {
    if (selectedIndices.length > 0 && index !== selectedIndices[selectedIndices.length - 1]) {
      onSelectedWordChange(prev => prev + letters[index]);
      setSelectedIndices(prev => [...prev, index]);
    }
  };

  const handleMouseUp = () => {
    onSelectedWordChange('');
    setSelectedIndices([]);
  };

  const radius = 100;
  const coordinates = useCoordinates(letters, radius);

  return (
    <div className="flex justify-center items-center rounded-full p-8 w-[200px] h-[200px] border-[20px] border-back relative mt-[50px]">
      {coordinates.map(({ letter, x, y }, index) => (
        <div
          key={index}
          className={clsx(
            'flex justify-center items-center w-[60px] h-[60px] rounded-full select-none absolute bg-gray',
            selectedIndices.includes(index) ? 'bg-pink' : 'bg-gray'
          )}
          onMouseDown={() => handleMouseDown(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseUp={handleMouseUp}
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          <span className={clsx('text-4xl uppercase font-bold', selectedIndices.includes(index) ? 'text-white' : 'text-main')}>{letter}</span>
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
