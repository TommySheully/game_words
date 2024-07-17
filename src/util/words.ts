import _ from 'lodash';

export function getUniqLetters(word: string | string[]): string[] {
  const set = new Set<string>();
  _.castArray(word).forEach((w) => w.split('').forEach((l) => set.add(l)));
  return Array.from(set);
}
