import { calculateAge, getApproxDOBFromAge } from '../../../src/app/utils/calculate-age';

describe('calculateAge utility', () => {
  it('returns correct age for a given birth date', () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 25);

    const age = calculateAge(birthDate);
    expect(age).to.eq(25);
  });

  it('returns null for undefined birth date', () => {
    const age = calculateAge(undefined);
    expect(age).to.eq(null);
  });

  it('getApproxDOBFromAge returns a date that matches age', () => {
    const age = 30;
    const approxDOB = getApproxDOBFromAge(age);

    const calculatedAge = calculateAge(approxDOB);
    expect(calculatedAge).to.eq(age);
  });
});
