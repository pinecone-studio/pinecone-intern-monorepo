import { timeAgoCompact } from '@/utils/date-utils';

describe('date', () => {
  it('should return "just now" for the same date', async () => {
    const now = new Date();
    const result = await timeAgoCompact(now);
    expect(result).toBe('just now');
  });
  it('should return "1m" for a date 1 minute ago', () => {
    const oneMinuteAgo = new Date(new Date().getTime() - 1000 * 60);
    const result = timeAgoCompact(oneMinuteAgo);
    expect(result).toBe('1m');
  });
  it('should return "2h" for a date 2 hours ago', () => {
    const twoHoursAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 2);
    const result = timeAgoCompact(twoHoursAgo);
    expect(result).toBe('2h');
  });
  it('should return the correct value for 1 day ago', () => {
    const oneDayAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
    const result = timeAgoCompact(oneDayAgo);
    expect(result).toBe('1d');
  });
});
