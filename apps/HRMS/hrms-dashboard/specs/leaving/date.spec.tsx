import { formatDate } from '../../src/app/leaving/_components/Date';

describe('formatDate function', () => {
  it("should format today's date correctly", () => {
    const today = new Date();
    const expected = `Өнөөдөр - ${today.getMonth() + 1}/${today.getDate()}`;
    expect(formatDate(today.toISOString())).toEqual(expected);
  });

  it('should format past dates correctly', () => {
    const pastDate = new Date('2024-05-10');
    const expected = `${pastDate.getMonth() + 1}/${pastDate.getDate()} - Баасан`;
    expect(formatDate(pastDate.toISOString())).toEqual(expected);
  });

  it('should handle day of week correctly', () => {
    const date = new Date('2024-05-15');
    const expected = `5/15 - Лхагва`;
    expect(formatDate(date.toISOString())).toEqual(expected);
  });
});
