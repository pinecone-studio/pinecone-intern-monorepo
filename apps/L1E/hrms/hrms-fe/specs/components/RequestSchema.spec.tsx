import requestSchema from '../../src/components/requestForm/RequestSchema';
import { ZodError } from 'zod';
describe('requestSchema validation', () => {
  it('should accept a valid input', () => {
    const validData = {
      date: new Date('2024-12-19T10:00:00Z'),
      startTime: '09:00',
      endTime: '17:00',
      lead: 'John Doe',
      notes: 'Some valid notes',
    };

    expect(() => requestSchema.parse(validData));
  });

  it('should throw an error for date in the past', () => {
    const invalidData = {
      date: new Date('2020-12-19T10:00:00Z'), // Date in the past
      startTime: '09:00',
      endTime: '17:00',
      lead: 'John Doe',
      notes: 'Some valid notes',
    };

    const error = () => requestSchema.parse(invalidData);
    expect(error).toThrowError(ZodError);
    expect(error).toThrow('өдөр сонгоно уу'); // "Please select a future date"
  });

  it('should throw an error if start time is empty', () => {
    const invalidData = {
      date: new Date('2024-12-19T10:00:00Z'),
      startTime: '', // Empty start time
      endTime: '17:00',
      lead: 'John Doe',
      notes: 'Some valid notes',
    };

    const error = () => requestSchema.parse(invalidData);
    expect(error).toThrowError(ZodError);
    expect(error).toThrow('Start time is required');
  });

  it('should throw an error if end time is empty', () => {
    const invalidData = {
      date: new Date('2024-12-19T10:00:00Z'),
      startTime: '09:00',
      endTime: '', // Empty end time
      lead: 'John Doe',
      notes: 'Some valid notes',
    };

    const error = () => requestSchema.parse(invalidData);
    expect(error).toThrowError(ZodError);
    expect(error).toThrow('End time is required');
  });

  it('should throw an error if lead is empty', () => {
    const invalidData = {
      date: new Date('2024-12-19T10:00:00Z'),
      startTime: '09:00',
      endTime: '17:00',
      lead: '', // Empty lead
      notes: 'Some valid notes',
    };

    const error = () => requestSchema.parse(invalidData);
    expect(error).toThrowError(ZodError);
    expect(error).toThrow('сонголт хийгээгүй байна'); // "No selection made"
  });

  it('should throw an error if notes are too short', () => {
    const invalidData = {
      date: new Date('2024-12-19T10:00:00Z'),
      startTime: '09:00',
      endTime: '17:00',
      lead: 'John Doe',
      notes: 'abc', // Too short (less than 5 characters)
    };

    const error = () => requestSchema.parse(invalidData);
    expect(error).toThrowError(ZodError);
    expect(error).toThrow('хоосон байна'); // "Too short"
  });
});
