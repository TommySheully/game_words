import _ from 'lodash';
import { useMemo } from 'react';

export const useRotation = (n: number, radius: number) =>
  useMemo(
    () =>
      _.times(n, (i) => {
        const angle = ((2 * Math.PI) / n) * i;
        return {
          x: Math.cos(angle) * radius + radius - 50,
          y: Math.sin(angle) * radius + radius - 50,
        };
      }),
    [n, radius],
  );
