import { calculateAge, generateYearOptions, MIN_AGE, MIN_YEAR, MONTHS, validateDate } from '@/components/date-utils';

describe('Date Validation Utilities', () => {
  const mockCurrentDate = new Date('2024-08-28');

  describe('calculateAge', () => {
    it('should calculate age correctly for various scenarios', () => {
      expect(calculateAge(new Date('1990-05-15'), mockCurrentDate)).toBe(34);
      expect(calculateAge(new Date('1990-12-25'), mockCurrentDate)).toBe(33);
      expect(calculateAge(new Date('1990-08-28'), mockCurrentDate)).toBe(34);
      expect(calculateAge(new Date('1988-02-29'), mockCurrentDate)).toBe(36);
      expect(calculateAge(new Date('1990-08-15'), mockCurrentDate)).toBe(34);
      expect(calculateAge(new Date('1990-08-30'), mockCurrentDate)).toBe(33);
    });

    it('should use current date when no currentDate provided', () => {
      const age = calculateAge(new Date('1990-01-01'));
      expect(typeof age).toBe('number');
      expect(age).toBeGreaterThan(0);
    });
  });

  describe('validateDate', () => {
    it('should return invalid for undefined date', () => {
      const result = validateDate(undefined, mockCurrentDate);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please select your date of birth.');
    });

    it('should validate age requirements correctly', () => {
      const underAge = validateDate(new Date('2010-01-01'), mockCurrentDate);
      expect(underAge.isValid).toBe(false);
      expect(underAge.error).toBe(`You must be at least ${MIN_AGE} years old.`);

      const exactAge = validateDate(new Date('2006-08-28'), mockCurrentDate);
      expect(exactAge.isValid).toBe(true);
      expect(exactAge.error).toBe('');

      const validAge = validateDate(new Date('1990-01-01'), mockCurrentDate);
      expect(validAge.isValid).toBe(true);
      expect(validAge.error).toBe('');
    });

    it('should handle edge cases for 18th birthday', () => {
      const turnsToday = validateDate(new Date('2006-08-28'), mockCurrentDate);
      expect(turnsToday.isValid).toBe(true);

      const turnsTomorrow = validateDate(new Date('2006-08-29'), mockCurrentDate);
      expect(turnsTomorrow.isValid).toBe(false);
    });

    it('should use current date when no currentDate provided', () => {
      const result = validateDate(new Date('1990-01-01'));
      expect(result.isValid).toBe(true);
      expect(result.error).toBe('');
    });
  });

  describe('generateYearOptions', () => {
    it('should generate correct year ranges', () => {
      const years2024 = generateYearOptions(2024);
      expect(years2024).toHaveLength(2024 - MIN_YEAR + 1);
      expect(years2024[0]).toBe(MIN_YEAR);
      expect(years2024[years2024.length - 1]).toBe(2024);

      const years2030 = generateYearOptions(2030);
      expect(years2030).toHaveLength(2030 - MIN_YEAR + 1);
      expect(years2030[0]).toBe(MIN_YEAR);
      expect(years2030[years2030.length - 1]).toBe(2030);
    });

    it('should generate consecutive years in ascending order', () => {
      const years = generateYearOptions(2024);
      for (let i = 1; i < years.length; i++) {
        expect(years[i]).toBe(years[i - 1] + 1);
      }
    });

    it('should handle edge case when current year equals MIN_YEAR', () => {
      const years = generateYearOptions(MIN_YEAR);
      expect(years).toHaveLength(1);
      expect(years[0]).toBe(MIN_YEAR);
    });
  });

  describe('Constants', () => {
    it('should have correct MONTHS array', () => {
      expect(MONTHS).toHaveLength(12);
      expect(MONTHS[0]).toBe('January');
      expect(MONTHS[11]).toBe('December');
      expect(MONTHS).toEqual(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    });

    it('should have correct constant values', () => {
      expect(MIN_YEAR).toBe(1900);
      expect(typeof MIN_YEAR).toBe('number');
      expect(MIN_AGE).toBe(18);
      expect(typeof MIN_AGE).toBe('number');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle invalid and future dates', () => {
      const invalidDate = new Date('invalid');
      const age = calculateAge(invalidDate, mockCurrentDate);
      expect(isNaN(age)).toBe(true);

      const futureDate = new Date('2030-01-01');
      expect(calculateAge(futureDate, mockCurrentDate)).toBeLessThan(0);

      const futureValidation = validateDate(futureDate, mockCurrentDate);
      expect(futureValidation.isValid).toBe(false);
    });
  });
});
