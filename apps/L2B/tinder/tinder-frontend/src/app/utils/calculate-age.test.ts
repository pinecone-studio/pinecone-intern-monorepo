import calculateAge from './calculate-age';

describe('calculateAge', () => {
  const mockToday = new Date('2025-05-29');
  const realDate = Date;

  beforeAll(() => {
    // Mock global Date to control "today"
    global.Date = class extends Date {
      constructor(date?: string | number) {
        if (date) return super(date);
        return mockToday;
      }
    } as typeof Date;
  });

  afterAll(() => {
    global.Date = realDate;
  });

  it('calculates age correctly when birthday has already passed this year', () => {
    const birthDate = '2000-04-15'; // April 15 < May 29 → birthday has passed
    expect(calculateAge(birthDate)).toBe(25);
  });

  it('calculates age correctly when birthday has not yet happened this year', () => {
    const birthDate = '2000-09-10'; // September 10 > May 29 → birthday has not happened
    expect(calculateAge(birthDate)).toBe(24);
  });
});
