import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';

describe('Create Event Mutation - Edge Cases', () => {

  test('Should create event with special characters in title and location', async () => {
    const eventData = {
      title: 'Test Event with Special Characters: @#$%^&*()',
      description: 'Event with special characters',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Location with special chars: @#$%^&*()'
    };

    const createdEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
    
    expect(createdEvent.title).toBe(eventData.title);
    expect(createdEvent.location).toBe(eventData.location);

    await Event.deleteOne({ _id: createdEvent._id });
  });

  test('Should handle invalid date format', async () => {
    const eventData = {
      title: 'Test Event',
      description: 'Test event description',
      date: 'invalid-date-format',
      location: 'Test Location'
    };

    await expect(eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData))
      .rejects.toThrow('Invalid date format');
  });

  test('Should handle database error during creation', async () => {
    const originalSave = Event.prototype.save;
    Event.prototype.save = jest.fn().mockRejectedValue(new Error('Database connection failed'));
    
    const eventData = {
      title: 'Test Event',
      description: 'Test event description',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };

    await expect(eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData))
      .rejects.toThrow('Database connection failed');
    
    Event.prototype.save = originalSave;
  });
});
