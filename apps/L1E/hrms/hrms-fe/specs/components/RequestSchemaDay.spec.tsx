import requestSchemaDay from '../../src/components/requestForm/RequestSchemaDay'; // Adjust the path according to your file structure

describe('requestSchemaDay', () => {
  it('should pass with a valid future date, lead, and notes', () => {
    const validData = {
      date: new Date(Date.now() + 1000 * 60 * 60 * 24),
      lead: 'valid lead',
      notes: 'Valid notes here',
    };

    const result = requestSchemaDay.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail when the date is in the past', () => {
    const invalidData = {
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      lead: 'valid lead',
      notes: 'Valid notes here',
    };

    const result = requestSchemaDay.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('өдөр сонгоно уу');
  });

  it('should fail when lead is an empty string', () => {
    const invalidData = {
      date: new Date(Date.now() + 1000 * 60 * 60 * 24),
      lead: '',
      notes: 'Valid notes here',
    };

    const result = requestSchemaDay.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('сонголт хийгээгүй байна');
  });

  it('should fail when notes are too short', () => {
    const invalidData = {
      date: new Date(Date.now() + 1000 * 60 * 60 * 24),
      lead: 'valid lead',
      notes: 'Hi',
    };

    const result = requestSchemaDay.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.errors[0].message).toBe('хоосон байна');
  });

  it('should pass when notes have the minimum length of 5 characters', () => {
    const validData = {
      date: new Date(Date.now() + 1000 * 60 * 60 * 24),
      lead: 'valid lead',
      notes: '12345',
    };

    const result = requestSchemaDay.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
