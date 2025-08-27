import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';

describe('Delete Event Mutation', () => {
  let testEvent: EventType;

  beforeEach(async () => {
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };
    testEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
  });

  test('Should delete event successfully', async () => {
    const deleteData = {
      _id: testEvent._id.toString()
    };

    const deletedEvent = await eventMutations.deleteEvent({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedEvent).toBeDefined();
    expect(deletedEvent._id.toString()).toBe(testEvent._id.toString());
    expect(deletedEvent.title).toBe(testEvent.title);
    expect(deletedEvent.description).toBe(testEvent.description);
    expect(deletedEvent.location).toBe(testEvent.location);
    expect(deletedEvent.date).toEqual(testEvent.date);

    const eventInDb = await Event.findById(testEvent._id);
    expect(eventInDb).toBeNull();
  });

  test('Should throw error for non-existent event', async () => {
    const deleteData = {
      _id: '507f1f77bcf86cd799439011'
    };

    await expect(eventMutations.deleteEvent({} as ResolversParentTypes['Mutation'], deleteData))
      .rejects.toThrow('Event not found');
  });

  test('Should throw error for invalid ObjectId format', async () => {
    const deleteData = {
      _id: 'invalid-id-format'
    };

    await expect(eventMutations.deleteEvent({} as ResolversParentTypes['Mutation'], deleteData))
      .rejects.toThrow();
  });

  test('Should handle deletion of event with special characters', async () => {
    const specialEventData = {
      title: 'Event with Special Chars: @#$%^&*()',
      description: 'Description with special chars: @#$%^&*()',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Location with special chars: @#$%^&*()'
    };
    const specialEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], specialEventData);

    const deleteData = {
      _id: specialEvent._id.toString()
    };

    const deletedEvent = await eventMutations.deleteEvent({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedEvent.title).toBe('Event with Special Chars: @#$%^&*()');
    expect(deletedEvent.description).toBe('Description with special chars: @#$%^&*()');
    expect(deletedEvent.location).toBe('Location with special chars: @#$%^&*()');

    const specialEventInDb = await Event.findById(specialEvent._id);
    expect(specialEventInDb).toBeNull();
  });

  test('Should handle deletion of event with future date', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    
    const futureEventData = {
      title: 'Future Event',
      description: 'This is a future event',
      date: futureDate.toISOString(),
      location: 'Future Location'
    };
    const futureEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], futureEventData);

    const deleteData = {
      _id: futureEvent._id.toString()
    };

    const deletedEvent = await eventMutations.deleteEvent({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedEvent.date).toEqual(futureDate);
    expect(deletedEvent._id.toString()).toBe(futureEvent._id.toString());

    const futureEventInDb = await Event.findById(futureEvent._id);
    expect(futureEventInDb).toBeNull();
  });

  test('Should return correct event data after deletion', async () => {
    const deleteData = {
      _id: testEvent._id.toString()
    };

    const deletedEvent = await eventMutations.deleteEvent({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedEvent).toHaveProperty('_id');
    expect(deletedEvent).toHaveProperty('title');
    expect(deletedEvent).toHaveProperty('description');
    expect(deletedEvent).toHaveProperty('location');
    expect(deletedEvent).toHaveProperty('date');
    expect(deletedEvent).toHaveProperty('createdBy');
    expect(deletedEvent).toHaveProperty('createdAt');
    expect(deletedEvent).toHaveProperty('updatedAt');
  });

  test('Should handle deletion of multiple events', async () => {
    const events = [];
    for (let i = 0; i < 3; i++) {
      const eventData = {
        title: `Test Event ${i + 1}`,
        description: `Description for event ${i + 1}`,
        date: new Date(2024, 11, 31, 23, 59, 59).toISOString(),
        location: `Location ${i + 1}`
      };
      const event = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
      events.push(event);
    }

    for (const event of events) {
      const deleteData = {
        _id: event._id.toString()
      };
      const deletedEvent = await eventMutations.deleteEvent({} as ResolversParentTypes['Mutation'], deleteData);
      expect(deletedEvent._id.toString()).toBe(event._id.toString());
    }

    for (const event of events) {
      const eventInDb = await Event.findById(event._id);
      expect(eventInDb).toBeNull();
    }
  });
});
