import Filter from 'bad-words';
export const filterWords = async (comment: string) => {
  try {
    const filter = new Filter();
    return filter.clean(comment);
  } catch (error) {
    throw new Error('Failed to filter');
  }
};
