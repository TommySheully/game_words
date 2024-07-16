import _ from 'lodash';
import { Words } from '@/store/context.tsx';

export const reductionToType = (arr: string[]): Words[] => {
  const lsValue = localStorage.getItem('words');
  const lsItems = lsValue ? JSON.parse(lsValue) as Words[] : [];
  return arr.map(e => ({ word: e, isGuess: _.some(lsItems, { word: e }) })).sort((a, b) => a.word.length - b.word.length);
};
