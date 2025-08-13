import { profileFormSchema } from '@/components/schema/ProfileFormSchema';

describe('profileFormSchema', () => {
  it('should validate correctly for valid data', async () => {
    const validData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      birthDate: new Date('2000-01-01'),
      genderPreference: 'male',
      bio: 'This is a short bio.',
      interests: ['music', 'sports'],
      profession: 'Software Engineer',
      school: 'Some University',
    };

    const result = await profileFormSchema.safeParseAsync(validData);

    expect(result.success).toBe(true);
  });

  it('should fail validation when required fields are missing or incorrect', async () => {
    const invalidData = {
      name: '', // Invalid: empty string
      email: 'invalid-email', // Invalid: not a valid email
      birthDate: 'invalid-date', // Invalid: not a valid date
      genderPreference: '', // Invalid: empty string
      bio: 'This is a bio that exceeds the 200 characters limit. '.repeat(10), // Invalid: bio too long
      interests: ['music', 'sports'],
      profession: 'Engineer', // Valid, but profession can still be tested
      school: 'Some University',
    };

    const result = await profileFormSchema.safeParseAsync(invalidData);

    // Validate each field error
    expect(result.success).toBe(false);

    // Adjusting expectations to match Zod's error structure
    expect(result.error.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['name'],
          message: 'String must contain at least 2 character(s)',
          code: 'too_small',
        }),
        expect.objectContaining({
          path: ['email'],
          message: 'Please enter a valid email',
          code: 'invalid_string',
        }),
        expect.objectContaining({
          path: ['birthDate'],
          message: 'A date of birth is required.',
          code: 'invalid_type',
        }),
        expect.objectContaining({
          path: ['genderPreference'],
          message: 'String must contain at least 1 character(s)',
          code: 'too_small',
        }),
        expect.objectContaining({
          path: ['bio'],
          message: 'Bio must be less than 200 characters',
          code: 'too_big',
        }),
      ])
    );
  });

  // Test for an optional array field (interests)
  it('should pass validation when interests are optional', async () => {
    const validDataWithoutInterests = {
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      birthDate: new Date('1990-05-15'),
      genderPreference: 'female',
      bio: 'A valid bio.',
      interests: [], // empty array is valid
      profession: 'Designer',
      school: 'Some College',
    };

    const result = await profileFormSchema.safeParseAsync(validDataWithoutInterests);

    expect(result.success).toBe(true); // Should pass without interests
  });

  // Test for optional field (interests) with values
  it('should pass validation when interests contain valid values', async () => {
    const validDataWithInterests = {
      name: 'Jack Smith',
      email: 'jacksmith@example.com',
      birthDate: new Date('1985-12-12'),
      genderPreference: 'male',
      bio: 'This is a bio.',
      interests: ['reading', 'coding'], // valid interests
      profession: 'Writer',
      school: 'Some University',
    };

    const result = await profileFormSchema.safeParseAsync(validDataWithInterests);

    expect(result.success).toBe(true);
  });

  // Test for profession max length validation
  it('should fail if profession exceeds the max length of 100 characters', async () => {
    const invalidProfessionData = {
      name: 'Sarah Lee',
      email: 'sarahlee@example.com',
      birthDate: new Date('1995-03-25'),
      genderPreference: 'female',
      bio: 'Valid bio.',
      interests: ['music'],
      profession: 'A'.repeat(101), // Invalid: profession too long
      school: 'Some School',
    };

    const result = await profileFormSchema.safeParseAsync(invalidProfessionData);

    expect(result.success).toBe(false);
    expect(result.error.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['profession'],
          message: 'Profession must be less than 100 characters',
        }),
      ])
    );
  });

  it('should fail if school name exceeds the max length of 100 characters', async () => {
    const invalidSchoolData = {
      name: 'Mark Johnson',
      email: 'markjohnson@example.com',
      birthDate: new Date('1992-08-30'),
      genderPreference: 'male',
      bio: 'Valid bio.',
      interests: ['art'],
      profession: 'Artist',
      school: 'S'.repeat(101),
    };

    const result = await profileFormSchema.safeParseAsync(invalidSchoolData);

    expect(result.success).toBe(false);
    expect(result.error.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['school'],
          message: 'School must be less than 100 characters',
        }),
      ])
    );
  });
});
