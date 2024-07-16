import React from 'react';
import { Button } from '@/components/Button.tsx';
import { Level, useGameContext } from '@/store/context.tsx';
import { reductionToType } from '@/util/reductionToType.ts';
import { levels } from '@/assets/levels';

type Props = {
  onUpdate: () => void
};

export const Update = ({ onUpdate }: Props) => {
  const { setWords, setLevel } = useGameContext()

  const handleUpdate = () => {
    const level = (localStorage.getItem('level') as Level) || '1';
    setLevel(level);
    setWords(reductionToType(levels[level]));
    onUpdate()
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">

      <div className="bg-gray p-4 rounded-md shadow-lg">
        <p className="text-lg font-bold mb-2">Две вкладки
          с игрой?</p>
        <p className="mb-4 text-main">Похоже, игра открыта в нескольких вкладках браузера. Чтобы продолжить играть в
          этой
          вкладке,
          обновите страницу.</p>
        <Button title="Обновить" onClick={handleUpdate} />
      </div>

    </div>
  );
};
