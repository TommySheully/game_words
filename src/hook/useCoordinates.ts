import { useEffect, useState } from 'react';

export const useCoordinates = (letters: string[], radius: number) => {
  const [coordinates, setCoordinates] = useState<{
    letter: string;
    x: number;
    y: number
  }[]>([]);

  useEffect(() => {
    const angleIncrement = 360 / letters.length;
    const coordinates = letters.map((letter, index) => {
      const angle = angleIncrement * index;
      const x = Math.cos((angle * Math.PI) / 180) * radius + radius - 50;
      const y = Math.sin((angle * Math.PI) / 180) * radius + radius - 50;
      return { letter, x, y };
    });

    setCoordinates(coordinates);
  }, [letters, radius]);

  return coordinates;
};
