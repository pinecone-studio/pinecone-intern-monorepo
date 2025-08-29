import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';

describe('Update Event Mutation - Validation Tests', () => {
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

  test('Should throw error for non-existent event', async () => {
    const updateData = {
      _id: '507f1f77bcf86cd799439011', // Non-existent ObjectId
      title: 'Updated Title'
    };

    await expect(eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('Event not found');
  });

  test('Should handle invalid date format in update', async () => {
    const updateData = {
      _id: testEvent._id.toString(),
      date: 'Invalid Date'
    };

    await expect(eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow();
  });

  test('Should handle database error during update', async () => {
    const originalFindByIdAndUpdate = Event.findByIdAndUpdate;
    Event.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Database error'));
    
    const updateData = {
      _id: testEvent._id.toString(),
      title: 'Updated Event Title'
    };

    await expect(eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('Database error');
    
    Event.findByIdAndUpdate = originalFindByIdAndUpdate;
  });

  test('Should handle different types of database errors', async () => {
    const originalFindByIdAndUpdate = Event.findByIdAndUpdate;
    Event.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Connection timeout'));
    
    const updateData = {
      _id: testEvent._id.toString(),
      title: 'Updated Event Title'
    };

    await expect(eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('Connection timeout');
    
    Event.findByIdAndUpdate = originalFindByIdAndUpdate;
  });

  test('Should handle invalid ObjectId format', async () => {
    const updateData = {
      _id: 'invalid-object-id',
      title: 'Updated Event Title'
    };

    await expect(eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('Invalid ObjectId format');
  });
});
