export function calculateAge(dob: Date | undefined): number | null {
 
  const today = new Date();
  const age = today.getFullYear() - dob!.getFullYear();
  return age;
}

export function getApproxDOBFromAge(age: number): Date {
  const today = new Date();
  return new Date(today.getFullYear() - age, today.getMonth(), today.getDate());
}
