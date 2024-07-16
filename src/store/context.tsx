import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

import type { FC, ReactNode } from 'react';
import { levels } from '@/assets/levels';

export type GameContextProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;

  level: Level
  words: Words[]
};

const GameContext = createContext<GameContextProps>({} as GameContextProps);

type IAuthProviderProps = {
  children: ReactNode;
};

type Level = '1'|'2'|'3'
type Words = {word: string, isGuess: boolean}

const reductionToType = (arr: string[]) => {
  const lsValue = localStorage.getItem('words');
  const lsItems = lsValue ? JSON.parse(lsValue) : [];

  return arr.map(e => ({ word: e, isGuess: lsItems.includes(e) })).sort((a, b) => a.word.length - b.word.length);
};

export const GameProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [level, setLevel] = useState<Level>(localStorage.getItem('level') as Level || '1');
  const [words, setWords] = useState<Words[]>(reductionToType(levels[level]));

  useEffect(() => {
    localStorage.setItem('level', level);
  }, [level]);

  useEffect(() => {
     localStorage.setItem('words', JSON.stringify(words.filter(e => e.isGuess)));
  }, [words]);

  const value: GameContextProps = useMemo(
    () => ({
      isLoading,
      words,
      level,
      setIsLoading,
    }),
    [
      isLoading,
      setIsLoading,
      words,
      level,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
