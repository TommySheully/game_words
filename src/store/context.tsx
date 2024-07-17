import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

import type { FC, ReactNode } from 'react';
import { levels } from '@/assets/levels';
import { reductionToType } from '@/util/reductionToType.ts';


export type Status = 'game'|'info'|'warning'
export type Level = '1'|'2'|'3'
export type Words = {word: string, open: boolean}

export type GameContextProps = {
  status: Status;
  setLevel: Dispatch<SetStateAction<Level>>;
  setStatus: Dispatch<SetStateAction<Status>>;
  setWords: Dispatch<SetStateAction<Words[]>>;

  level: Level
  words: Words[]
};

type IAuthProviderProps = {
  children: ReactNode;
};

const GameContext = createContext<GameContextProps>({} as GameContextProps);

export const GameProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<Status>("game");
  const [level, setLevel] = useState<Level>(localStorage.getItem('level') as Level || '1');
  const [words, setWords] = useState<Words[]>(reductionToType(levels[level]));

  useEffect(() => {
    localStorage.setItem('level', level);
    setWords(reductionToType(levels[level]))
    setStatus('game')
  }, [level]);

  useEffect(() => {
     localStorage.setItem('words', JSON.stringify(words.filter(e => e.open)));
  }, [words]);

  const value: GameContextProps = useMemo(
    () => ({ status, words, level, setLevel, setStatus, setWords, }),
    [status, setStatus, words, level, setLevel, setWords],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
