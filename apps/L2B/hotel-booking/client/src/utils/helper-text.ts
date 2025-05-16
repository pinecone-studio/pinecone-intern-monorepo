export const getHelperText = (age: number | null) => {
  return age !== null ? `${age} years old` : 'Your date of birth is used to calculate your age.';
};
