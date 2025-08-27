import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';

describe('Create Event Mutation', () => {

  test('Should create a new event successfully', async () => {
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };

    const createdEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
    
    expect(createdEvent).toBeDefined();
    expect(createdEvent.title).toBe(eventData.title);
    expect(createdEvent.description).toBe(eventData.description);
    expect(createdEvent.location).toBe(eventData.location);
    expect(createdEvent.date).toEqual(new Date(eventData.date));
    expect(createdEvent.createdBy).toBeDefined();
    expect(createdEvent._id).toBeDefined();
    expect(createdEvent.createdAt).toBeDefined();
    expect(createdEvent.updatedAt).toBeDefined();

    await Event.deleteOne({ _id: createdEvent._id });
  });

  test('Should create event without description', async () => {
    const eventData = {
      title: 'Test Event No Description',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };

    const createdEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
    
    expect(createdEvent.title).toBe(eventData.title);
    expect(createdEvent.description).toBeUndefined();
    expect(createdEvent.location).toBe(eventData.location);
    expect(createdEvent.date).toEqual(new Date(eventData.date));

    await Event.deleteOne({ _id: createdEvent._id });
  });

  test('Should create event with future date', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    
    const eventData = {
      title: 'Future Event',
      description: 'This is a future event',
      date: futureDate.toISOString(),
      location: 'Future Location'
    };

    const createdEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
    
    expect(createdEvent.date).toEqual(futureDate);
    expect(createdEvent.title).toBe('Future Event');

    await Event.deleteOne({ _id: createdEvent._id });
  });

  test('Should create event with past date', async () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    
    const eventData = {
      title: 'Past Event',
      description: 'This is a past event',
      date: pastDate.toISOString(),
      location: 'Past Location'
    };

    const createdEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
    
    expect(createdEvent.date).toEqual(pastDate);
    expect(createdEvent.title).toBe('Past Event');

    await Event.deleteOne({ _id: createdEvent._id });
  });

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

  test('Should create multiple events successfully', async () => {
    const events = [];
    
    for (let i = 0; i < 3; i++) {
      const eventData = {
        title: `Test Event ${i + 1}`,
        description: `Description for event ${i + 1}`,
        date: new Date(2024, 11, 31, 23, 59, 59).toISOString(),
        location: `Location ${i + 1}`
      };
      
      const createdEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
      events.push(createdEvent);
    }
    
    expect(events.length).toBe(3);
    expect(events[0].title).toBe('Test Event 1');
    expect(events[1].title).toBe('Test Event 2');
    expect(events[2].title).toBe('Test Event 3');

    // Clean up
    for (const event of events) {
      await Event.deleteOne({ _id: event._id });
    }
  });

  test('Should create event with minimum required fields', async () => {
    const eventData = {
      title: 'Minimal Event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Minimal Location'
    };

    const createdEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
    
    expect(createdEvent.title).toBe('Minimal Event');
    expect(createdEvent.location).toBe('Minimal Location');
    expect(createdEvent.description).toBeUndefined();

    await Event.deleteOne({ _id: createdEvent._id });
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
