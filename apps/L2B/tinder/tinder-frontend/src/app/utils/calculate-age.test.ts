import calculateAge from './calculate-age';

describe('calculateAge', () => {
  it('calculates age correctly when birthday has already passed this year', () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 25);
    birthDate.setMonth(birthDate.getMonth() - 1); // Make sure it's already passed
    expect(calculateAge(birthDate.toISOString())).toBe(25);
  });

  it('calculates age correctly when birthday has not yet happened this year', () => {
    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 25);
    birthDate.setMonth(birthDate.getMonth() + 1); // Make sure it's in the future
    expect(calculateAge(birthDate.toISOString())).toBe(24);
  });
});
