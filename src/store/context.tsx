import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

import type { FC, ReactNode } from 'react';
import { levels } from '@/assets/levels';
import _ from 'lodash';

export type GameContextProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setWords: Dispatch<SetStateAction<Words[]>>;

  level: Level
  words: Words[]
};

type IAuthProviderProps = {
  children: ReactNode;
};

type Level = '1'|'2'|'3'
export type Words = {word: string, isGuess: boolean}

const GameContext = createContext<GameContextProps>({} as GameContextProps);

const reductionToType = (arr: string[]) => {
  const lsValue = localStorage.getItem('words');
  const lsItems = lsValue ? JSON.parse(lsValue) as Words[] : [];
  return arr.map(e => ({ word: e, isGuess: _.some(lsItems, { word: e }) })).sort((a, b) => a.word.length - b.word.length);
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
      setWords,
    }),
    [
      isLoading,
      setIsLoading,
      words,
      level,
      setWords
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
