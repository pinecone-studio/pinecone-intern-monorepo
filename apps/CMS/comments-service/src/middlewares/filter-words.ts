import Filter from 'bad-words';

export const filterWords = async (comment: string): Promise<string> => {
  const filter = new Filter();
  return filter.clean(comment);
};
