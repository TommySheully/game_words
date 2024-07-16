import React from 'react';

type Props = {
  title: string;
  onClick: () => void;
}

export const Button = ({onClick, title}: Props) => <button className="bg-green hover:bg-green-700 text-white font-bold p-4 rounded-full" onClick={onClick}>
    <span className="text-4xl p-4">{title}</span>
  </button>
