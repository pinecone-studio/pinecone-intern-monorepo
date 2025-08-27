import { eventQueries } from '../../../../src/resolvers/queries/event/event.queries';
import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';

describe('Get Event Query', () => {
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

  afterEach(async () => {
    if (testEvent?._id) {
      await Event.deleteOne({ _id: testEvent._id });
    }
  });

  test('Should get event by ID successfully', async () => {
    const queryArgs = {
      _id: testEvent._id.toString()
    };

    const retrievedEvent = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedEvent).toBeDefined();
    expect(retrievedEvent._id.toString()).toBe(testEvent._id.toString());
    expect(retrievedEvent.title).toBe(testEvent.title);
    expect(retrievedEvent.description).toBe(testEvent.description);
    expect(retrievedEvent.location).toBe(testEvent.location);
    expect(retrievedEvent.date).toEqual(testEvent.date);
  });

  test('Should return null for non-existent event', async () => {
    const queryArgs = {
      _id: '507f1f77bcf86cd799439011'
    };

    const retrievedEvent = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedEvent).toBeNull();
  });

  test('Should handle invalid ObjectId format', async () => {
    const queryArgs = {
      _id: 'invalid-id-format'
    };

    const retrievedEvent = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedEvent).toBeNull();
  });

  test('Should retrieve event with special characters', async () => {
    const specialEventData = {
      title: 'Event with Special Chars: @#$%^&*()',
      description: 'Description with special chars: @#$%^&*()',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Location with special chars: @#$%^&*()'
    };
    const specialEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], specialEventData);

    const queryArgs = {
      _id: specialEvent._id.toString()
    };

    const retrievedEvent = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedEvent).toBeDefined();
    expect(retrievedEvent.title).toBe(specialEventData.title);
    expect(retrievedEvent.description).toBe(specialEventData.description);
    expect(retrievedEvent.location).toBe(specialEventData.location);

    await Event.deleteOne({ _id: specialEvent._id });
  });

  test('Should retrieve event with future date', async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    
    const futureEventData = {
      title: 'Future Event',
      description: 'This is a future event',
      date: futureDate.toISOString(),
      location: 'Future Location'
    };
    const futureEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], futureEventData);

    const queryArgs = {
      _id: futureEvent._id.toString()
    };

    const retrievedEvent = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedEvent).toBeDefined();
    expect(retrievedEvent.date).toEqual(futureDate);
    expect(retrievedEvent.title).toBe('Future Event');

    await Event.deleteOne({ _id: futureEvent._id });
  });

  test('Should return event with all expected fields', async () => {
    const queryArgs = {
      _id: testEvent._id.toString()
    };

    const retrievedEvent = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedEvent).toHaveProperty('_id');
    expect(retrievedEvent).toHaveProperty('title');
    expect(retrievedEvent).toHaveProperty('description');
    expect(retrievedEvent).toHaveProperty('location');
    expect(retrievedEvent).toHaveProperty('date');
    expect(retrievedEvent).toHaveProperty('createdBy');
    expect(retrievedEvent).toHaveProperty('createdAt');
    expect(retrievedEvent).toHaveProperty('updatedAt');
  });

  test('Should handle empty string ID', async () => {
    const queryArgs = {
      _id: ''
    };

    const retrievedEvent = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedEvent).toBeNull();
  });

  test('Should handle null ID', async () => {
    const queryArgs = {
      _id: null as unknown as string
    };

    const retrievedEvent = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedEvent).toBeNull();
  });

  test('Should handle null _id parameter', async () => {
    const queryArgs = {
      _id: null as any
    };

    const result = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(result).toBeNull();
  });

  test('Should handle database error gracefully', async () => {
    const mockFindById = jest.spyOn(Event, 'findById').mockRejectedValueOnce(new Error('Database error'));
    
    const queryArgs = {
      _id: '507f1f77bcf86cd799439011'
    };

    const result = await eventQueries.getEvent({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(result).toBeNull();
    mockFindById.mockRestore();
  });
});
