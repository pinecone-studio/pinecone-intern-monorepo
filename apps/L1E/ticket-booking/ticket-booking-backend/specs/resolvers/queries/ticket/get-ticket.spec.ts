import { ticketQueries } from '../../../../src/resolvers/queries/ticket/ticket.queries';
import { ticketMutations } from '../../../../src/resolvers/mutations/ticket/ticket.mutation';
import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { Ticket } from '../../../../src/models/ticket.model';
import { Event } from '../../../../src/models/event.model';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';
import type { UserType } from '../../../../src/models/user.model';
import type { TicketType } from '../../../../src/models/ticket.model';

describe('Get Ticket Query', () => {
  let testEvent: EventType;
  let testUser: UserType;
  let testTicket: TicketType;

  beforeEach(async () => {
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-12-31T23:59:59.000Z',
      location: 'Test Location'
    };
    testEvent = await eventMutations.createEvent({} as ResolversParentTypes['Mutation'], eventData);

    const userData = {
      email: `test${Date.now()}${Math.random()}@example.com`,
      fullName: 'Test User',
      password: 'password123',
      role: 'USER',
      phone: '1234567890'
    };
    testUser = await userMutations.createUser({} as ResolversParentTypes['Mutation'], userData);

    const ticketData = {
      eventId: testEvent._id.toString(),
      userId: testUser._id.toString(),
      price: 50.00
    };
    testTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
  });

  afterEach(async () => {
    if (testTicket?._id) {
      await Ticket.deleteOne({ _id: testTicket._id });
    }
    if (testEvent?._id) {
      await Event.deleteOne({ _id: testEvent._id });
    }
    if (testUser?._id) {
      await User.deleteOne({ _id: testUser._id });
    }
  });

  test('Should get ticket by ID successfully', async () => {
    const queryArgs = {
      _id: testTicket._id.toString()
    };

    const retrievedTicket = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedTicket).toBeDefined();
    expect(retrievedTicket._id.toString()).toBe(testTicket._id.toString());
    expect(retrievedTicket.eventId.toString()).toBe(testTicket.eventId.toString());
    expect(retrievedTicket.userId.toString()).toBe(testTicket.userId.toString());
    expect(retrievedTicket.price).toBe(testTicket.price);
    expect(retrievedTicket.status).toBe(testTicket.status);
  });

  test('Should return null for non-existent ticket', async () => {
    const queryArgs = {
      _id: '507f1f77bcf86cd799439011'
    };

    const retrievedTicket = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedTicket).toBeNull();
  });

  test('Should handle invalid ObjectId format', async () => {
    const queryArgs = {
      _id: 'invalid-id-format'
    };

    const retrievedTicket = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedTicket).toBeNull();
  });

  test('Should retrieve ticket with high price', async () => {
    const highPriceTicketData = {
      eventId: testEvent._id.toString(),
      userId: testUser._id.toString(),
      price: 9999.99
    };
    const highPriceTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], highPriceTicketData);

    const queryArgs = {
      _id: highPriceTicket._id.toString()
    };

    const retrievedTicket = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedTicket).toBeDefined();
    expect(retrievedTicket.price).toBe(9999.99);
    expect(retrievedTicket._id.toString()).toBe(highPriceTicket._id.toString());

    await Ticket.deleteOne({ _id: highPriceTicket._id });
  });

  test('Should return ticket with all expected fields', async () => {
    const queryArgs = {
      _id: testTicket._id.toString()
    };

    const retrievedTicket = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedTicket).toHaveProperty('_id');
    expect(retrievedTicket).toHaveProperty('eventId');
    expect(retrievedTicket).toHaveProperty('userId');
    expect(retrievedTicket).toHaveProperty('price');
    expect(retrievedTicket).toHaveProperty('status');
    expect(retrievedTicket).toHaveProperty('createdAt');
    expect(retrievedTicket).toHaveProperty('updatedAt');
  });

  test('Should handle empty string ID', async () => {
    const queryArgs = {
      _id: ''
    };

    const retrievedTicket = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedTicket).toBeNull();
  });

  test('Should handle null ID', async () => {
    const queryArgs = {
      _id: null as unknown as string
    };

    const retrievedTicket = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], queryArgs);
    
    expect(retrievedTicket).toBeNull();
  });

  test('Should handle edge cases and errors', async () => {
    const nullIdResult = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], { _id: null as unknown as string });
    expect(nullIdResult).toBeNull();

    const mockFindById = jest.spyOn(Ticket, 'findById').mockRejectedValueOnce(new Error('Database error'));
    const dbErrorResult = await ticketQueries.getTicket({} as ResolversParentTypes['Query'], { _id: '507f1f77bcf86cd799439011' });
    expect(dbErrorResult).toBeNull();
    mockFindById.mockRestore();
  });
});
