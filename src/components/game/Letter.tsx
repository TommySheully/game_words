import React from 'react';
import clsx from 'clsx';


type Props = {
  letter: string
  open?: boolean
}

export const Letter = ({ letter, open }: Props) => {
  return (
    <div className={clsx("flex justify-center items-center p-2 rounded-lg aspect-square w-[50px]", open ? 'bg-green' : "bg-gray")}>
     <span className="text-4xl uppercase font-bold text-white">{open && letter}</span>
    </div>
  );
};
