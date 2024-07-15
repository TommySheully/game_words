import { createContext, useContext, useMemo, useState } from 'react';

import type { FC, ReactNode } from 'react';

export type GameContextProps = {
  isLoading: boolean;
};

const GameContext = createContext<GameContextProps>({} as GameContextProps);

type IAuthProviderProps = {
  children: ReactNode;
};

export const GameProvider: FC<IAuthProviderProps> = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);


  const value: GameContextProps = useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [
      isLoading,
      setIsLoading,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);
