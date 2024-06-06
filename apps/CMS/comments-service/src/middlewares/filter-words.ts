import { BadWordModel } from '@/models/bad-word.model';

export const filterWords = async (target: string) => {
  try {
    const splittedTarget = target.split(' ');
    const badWords = await BadWordModel.find();
    const badWordsSet = new Set(badWords.map((bw) => bw.word.toLowerCase()));
    const filteredTarget = splittedTarget.map((word) => (badWordsSet.has(word.toLowerCase()) ? '***' : word)).join(' ');
    return filteredTarget;
  } catch (error) {
    throw new Error('Failed to filter words');
  }
};
