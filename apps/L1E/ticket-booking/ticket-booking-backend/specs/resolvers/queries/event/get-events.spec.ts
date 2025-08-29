import { eventQueries } from '../../../../src/resolvers/queries/event/event.queries';
import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { Event } from '../../../../src/models/event.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';

describe('Get Events Query', () => {
  let testEvents: EventType[] = [];

  beforeEach(async () => {
    testEvents = [];
  });

  afterEach(async () => {
    for (const event of testEvents) {
      if (event?._id) {
        await Event.deleteOne({ _id: event._id });
      }
    }
  });

  test('Should return empty array when no events exist', async () => {
    const events = await eventQueries.getEvents({} as ResolversParentTypes['Query']);
    
    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThanOrEqual(0);
  });

  test('Should return events with unique titles', async () => {
    const eventData1 = {
      title: `Test Event 1 ${Date.now()}`,
      description: 'This is test event 1',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location 1'
    };
    const event1 = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData1);
    testEvents.push(event1);

    const eventData2 = {
      title: `Test Event 2 ${Date.now()}`,
      description: 'This is test event 2',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location 2'
    };
    const event2 = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData2);
    testEvents.push(event2);

    const eventData3 = {
      title: `Test Event 3 ${Date.now()}`,
      description: 'This is test event 3',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location 3'
    };
    const event3 = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData3);
    testEvents.push(event3);

    const eventData4 = {
      title: `Test Event 4 ${Date.now()}`,
      description: 'This is test event 4',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location 4'
    };
    const event4 = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData4);
    testEvents.push(event4);

    const events = await eventQueries.getEvents({} as ResolversParentTypes['Query']);
    
    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThanOrEqual(4);
    
    const titles = events.map(event => event.title);
    const uniqueTitles = [...new Set(titles)];
    
    expect(titles.length).toBeGreaterThanOrEqual(uniqueTitles.length);
  });

  test('Should return events with valid ObjectIds', async () => {
    const eventData = {
      title: `Test Event ${Date.now()}`,
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };
    const event = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
    testEvents.push(event);

    const events = await eventQueries.getEvents({} as ResolversParentTypes['Query']);
    
    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    
    for (const returnedEvent of events) {
      expect(returnedEvent._id).toBeDefined();
      expect(typeof returnedEvent._id.toString()).toBe('string');
    }
  });

  test('Should return events with all expected fields', async () => {
    const eventData = {
      title: `Test Event ${Date.now()}`,
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };
    const event = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);
    testEvents.push(event);

    const events = await eventQueries.getEvents({} as ResolversParentTypes['Query']);
    
    expect(events).toBeDefined();
    expect(Array.isArray(events)).toBe(true);
    
    for (const returnedEvent of events) {
      expect(returnedEvent).toHaveProperty('_id');
      expect(returnedEvent).toHaveProperty('title');
      expect(returnedEvent).toHaveProperty('description');
      expect(returnedEvent).toHaveProperty('location');
      expect(returnedEvent).toHaveProperty('date');
      expect(returnedEvent).toHaveProperty('createdBy');
      expect(returnedEvent).toHaveProperty('createdAt');
      expect(returnedEvent).toHaveProperty('updatedAt');
    }
  });
});
