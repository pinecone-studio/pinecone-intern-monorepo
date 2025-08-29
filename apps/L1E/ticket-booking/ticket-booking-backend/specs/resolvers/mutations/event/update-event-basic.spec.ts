import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';

describe('Update Event Mutation - Basic Tests', () => {
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

  test('Should update event title successfully', async () => {
    const updateData = {
      _id: testEvent._id.toString(),
      title: 'Updated Test Event'
    };

    const updatedEvent = await eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedEvent).toBeDefined();
    expect(updatedEvent.title).toBe('Updated Test Event');
    expect(updatedEvent.description).toBe(testEvent.description);
    expect(updatedEvent.location).toBe(testEvent.location);
    expect(updatedEvent.date).toEqual(testEvent.date);
    expect(updatedEvent._id.toString()).toBe(testEvent._id.toString());
  });

  test('Should update event description successfully', async () => {
    const updateData = {
      _id: testEvent._id.toString(),
      description: 'Updated description for the test event'
    };

    const updatedEvent = await eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedEvent.description).toBe('Updated description for the test event');
    expect(updatedEvent.title).toBe(testEvent.title);
  });

  test('Should update event location successfully', async () => {
    const updateData = {
      _id: testEvent._id.toString(),
      location: 'Updated Location'
    };

    const updatedEvent = await eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedEvent.location).toBe('Updated Location');
    expect(updatedEvent.title).toBe(testEvent.title);
  });

  test('Should update event date successfully', async () => {
    const newDate = '2025-01-15T12:00:00.000Z';
    const updateData = {
      _id: testEvent._id.toString(),
      date: newDate
    };

    const updatedEvent = await eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedEvent.date).toEqual(new Date(newDate));
    expect(updatedEvent.title).toBe(testEvent.title);
  });

  test('Should update multiple fields at once', async () => {
    const updateData = {
      _id: testEvent._id.toString(),
      title: 'Multi Updated Event',
      description: 'Updated description',
      date: '2025-02-20T15:30:00.000Z',
      location: 'Updated Location'
    };

    const updatedEvent = await eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedEvent.title).toBe('Multi Updated Event');
    expect(updatedEvent.description).toBe('Updated description');
    expect(updatedEvent.date).toEqual(new Date('2025-02-20T15:30:00.000Z'));
    expect(updatedEvent.location).toBe('Updated Location');
  });

  test('Should handle partial updates with undefined values', async () => {
    const updateData = {
      _id: testEvent._id.toString(),
      title: 'Partial Update',
      description: undefined,
      date: undefined,
      location: undefined
    };

    const updatedEvent = await eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedEvent.title).toBe('Partial Update');
    expect(updatedEvent.description).toBe(testEvent.description); // Should remain unchanged
    expect(updatedEvent.date).toEqual(testEvent.date); // Should remain unchanged
    expect(updatedEvent.location).toBe(testEvent.location); // Should remain unchanged
  });

  test('Should handle empty update object', async () => {
    const updateData = {
      _id: testEvent._id.toString()
    };

    const updatedEvent = await eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedEvent).toBeDefined();
    expect(updatedEvent._id.toString()).toBe(testEvent._id.toString());
  });
});
