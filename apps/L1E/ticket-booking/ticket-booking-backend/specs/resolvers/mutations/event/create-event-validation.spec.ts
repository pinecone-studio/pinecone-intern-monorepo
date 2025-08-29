import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';

describe('Create Event Mutation - Validation Tests', () => {

  test('Should handle invalid date format gracefully', async () => {
    const eventData = {
      title: 'Invalid Date Event',
      description: 'Testing invalid date',
      date: 'invalid-date-format',
      location: 'Test Location'
    };

    await expect(eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData))
      .rejects.toThrow();
  });

  test('Should handle database error during creation', async () => {
    const mockSave = jest.spyOn(Event.prototype, 'save').mockRejectedValueOnce(new Error('Database error'));
    
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };

    await expect(eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData))
      .rejects.toThrow('Database error');
    
    mockSave.mockRestore();
  });

  test('Should handle different types of database errors', async () => {
    const mockSave = jest.spyOn(Event.prototype, 'save').mockRejectedValueOnce(new Error('Connection timeout'));
    
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };

    await expect(eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData))
      .rejects.toThrow('Connection timeout');
    
    mockSave.mockRestore();
  });

  test('Should handle validation error during creation', async () => {
    const mockSave = jest.spyOn(Event.prototype, 'save').mockRejectedValueOnce(new Error('Validation failed'));
    
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };

    await expect(eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData))
      .rejects.toThrow('Validation failed');
    
    mockSave.mockRestore();
  });

  test('Should handle network error during creation', async () => {
    const mockSave = jest.spyOn(Event.prototype, 'save').mockRejectedValueOnce(new Error('Network timeout'));
    
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };

    await expect(eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData))
      .rejects.toThrow('Network timeout');
    
    mockSave.mockRestore();
  });
});
