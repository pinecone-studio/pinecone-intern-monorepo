import { quantityConverter } from '@/components/utils/quantity-converter';

describe('Comment text', () => {
  it('Should return undefined', () => {
    const belowZero = [-134, -43, 0];
    belowZero.forEach((num) => {
      expect(quantityConverter({ quantity: num, text: 'comment' })).toBeUndefined();
    });
  });
  it('Should return null when not a number', () => {
    const testMock = jest.fn((n) => {
      return quantityConverter({ quantity: n, text: 'comment' });
    });
    testMock({});
    expect(testMock).toHaveBeenCalledTimes(1);
    expect(testMock.mock.results[0].value).toBeUndefined();
  });
  it('SHould return "view one comment"', () => {
    expect(quantityConverter({ quantity: 1, text: 'comment' })).toMatch('1 comment');
  });
  it('Shoudl return view comments', () => {
    const mocks = [2, 4, 5, 1349013, 1234123412341234];
    mocks.forEach((num) => {
      const toMatchText = `${num} comments`;
      expect(quantityConverter({ quantity: num, text: 'comment' })).toBe(toMatchText);
    });
  });
});
