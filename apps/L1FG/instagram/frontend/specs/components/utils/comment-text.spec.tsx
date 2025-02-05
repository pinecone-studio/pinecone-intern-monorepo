import { commentText } from '@/components/utils/comment-text';

describe('Comment text', () => {
  it('Should return undefined', () => {
    const belowZero = [-134, -43, 0];
    belowZero.forEach((num) => {
      expect(commentText(num)).toBeUndefined();
    });
  });
  it('Should return null when not a number', () => {
    const testMock = jest.fn((n) => {
      return commentText(n);
    });
    testMock({});
    expect(testMock).toHaveBeenCalledTimes(1);
    expect(testMock.mock.results[0].value).toBeUndefined();
  });
  it('SHould return "view one comment"', () => {
    expect(commentText(1)).toMatch('View one comment');
  });
  it('Shoudl return view comments', () => {
    const mocks = [2, 4, 5, 1349013, 1234123412341234];
    mocks.forEach((num) => {
      const toMatchText = `View ${num} comments`;
      expect(commentText(num)).toBe(toMatchText);
    });
  });
});
