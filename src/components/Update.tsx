import React from 'react';
import { Button } from '@/components/Button.tsx';
import { useGameContext } from '@/store/context.tsx';
import { reductionToType } from '@/util/reductionToType.ts';
import { levels } from '@/assets/levels';
import { popup } from '@/assets';

type Props = {
  onUpdate: () => void
};

export const Update = ({ onUpdate }: Props) => {
  const { setWords, setLevel } = useGameContext();

  const handleUpdate = () => {
    const level = parseInt(localStorage.getItem('level') || '0')
    setLevel(level);
    setWords(reductionToType(levels[level]));
    const sessionId = sessionStorage.getItem('sessionId');
    if (sessionId) {
      localStorage.setItem('globalId', sessionId);
    }
    onUpdate();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">

      <div className="flex flex-col justify-center max-w-[530px] p-10 gap-6 items-center bg-gray rounded-lg w-[90%] relative">

        <img src={popup} alt="backgraund" className="absolute top-[-19px] w-[384px] h-[113px]" />
        <span className="text-2xl font-bold absolute top-0 text-center">Две вкладки с игрой?</span>

        <span className="mt-[60px] font-bold text-xl text-main text-center">Похоже, игра открыта в нескольких вкладках браузера. Чтобы продолжить играть вэтой вкладке, обновите страницу.</span>
        <Button title="Обновить" onClick={handleUpdate} />
      </div>

    </div>
  );
};
