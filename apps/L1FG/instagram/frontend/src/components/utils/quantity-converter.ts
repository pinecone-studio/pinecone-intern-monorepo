/* eslint-disable complexity */
export const quantityConverter = ({ quantity, text }: { quantity: number; text: string }) => {
  try {
    if (typeof quantity !== 'number') {
      throw new Error('Not a number');
    }
    if (quantity <= 0) return;
    if (quantity == 1) return `1 ${text}`;
    return `${quantity} ${text}s`;
  } catch (error) {
    return;
  }
};
