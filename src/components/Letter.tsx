import React from 'react';
import clsx from 'clsx';


type Props = {
  letter: string
  isGuess?: boolean
}
export const Letter = ({ letter, isGuess }: Props) => {
  return (
    <div className={clsx("flex justify-center items-center p-2 rounded-lg aspect-square w-[50px]", isGuess ? 'bg-green' : "bg-gray")}>
     <span className="text-4xl uppercase font-bold text-white">{isGuess && letter}</span>
    </div>
  );
};
