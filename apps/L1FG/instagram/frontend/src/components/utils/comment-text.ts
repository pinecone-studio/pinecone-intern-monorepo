/* eslint-disable complexity */
export const commentText = (quantity: number) => {
  try {
    if (typeof quantity !== 'number') {
      throw new Error('Not a number');
    }
    if (quantity <= 0) return;
    if (quantity == 1) return 'View one comment';
    return `View ${quantity} comments`;
  } catch (error) {
    return;
  }
};
