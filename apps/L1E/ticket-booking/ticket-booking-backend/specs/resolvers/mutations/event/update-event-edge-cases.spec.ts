import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';

describe('Update Event Mutation - Edge Cases', () => {
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

  test('Should update event with special characters', async () => {
    const updateData = {
      _id: testEvent._id.toString(),
      title: 'Event with Special Chars: @#$%^&*()',
      location: 'Location with Special Chars: @#$%^&*()'
    };

    const updatedEvent = await eventMutations.updateEvent({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedEvent.title).toBe('Event with Special Chars: @#$%^&*()');
    expect(updatedEvent.location).toBe('Location with Special Chars: @#$%^&*()');
  });
});
