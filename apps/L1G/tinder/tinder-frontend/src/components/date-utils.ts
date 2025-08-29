export type ValidationResult = {
  isValid: boolean;
  error: string;
};

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MIN_YEAR = 1900;
export const MIN_AGE = 18;

export const calculateAge = (birthDate: Date, currentDate = new Date()): number => {
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const validateDate = (date: Date | undefined, currentDate = new Date()): ValidationResult => {
  if (!date) {
    return { isValid: false, error: 'Please select your date of birth.' };
  }

  if (calculateAge(date, currentDate) < MIN_AGE) {
    return { isValid: false, error: `You must be at least ${MIN_AGE} years old.` };
  }

  return { isValid: true, error: '' };
};

export const generateYearOptions = (currentYear: number): number[] => Array.from({ length: currentYear - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i);
