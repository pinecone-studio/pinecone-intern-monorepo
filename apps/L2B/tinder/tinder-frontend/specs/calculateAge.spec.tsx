import { calculateAge } from '@/app/utils/calculate-age';
import '@testing-library/jest-dom';

describe('calculateAge', () => {
  it('returns null if dob is undefined', () => {
    expect(calculateAge(undefined)).toBeNull();
  });

  it('calculates age correctly when birthday already passed this year', () => {
    const dob = new Date('2000-01-01');
    const result = calculateAge(dob);
    const expected = new Date().getFullYear() - 2000;
    expect(result).toBe(expected);
  });

  it('calculates age and decreases by 1 if birthday is later this year', () => {
    const today = new Date();
    const futureMonth = today.getMonth() + 1;
    const futureDay = today.getDate() + 1;
    const birthDate = new Date(today.getFullYear() - 20, futureMonth, futureDay); // 20 настай боловч төрсөн өдөр болоогүй

    const result = calculateAge(birthDate);
    expect(result).toBe(19);
  });
});
