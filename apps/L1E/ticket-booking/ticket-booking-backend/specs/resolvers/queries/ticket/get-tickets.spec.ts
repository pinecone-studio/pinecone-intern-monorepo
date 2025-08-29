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

describe('Get Tickets Query', () => {
  let testEvent: EventType;
  let testUser: UserType;
  let testTickets: TicketType[];

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


    testTickets = [];
    for (let i = 0; i < 3; i++) {
      const ticketData = {
        eventId: testEvent._id.toString(),
        userId: testUser._id.toString(),
        price: 50.00 + (i * 10)
      };
      const ticket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
      testTickets.push(ticket);
    }
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  const cleanupTestData = async () => {
    await Promise.all([
      ...testTickets.filter(t => t?._id).map(t => Ticket.deleteOne({ _id: t._id })),
      testEvent?._id ? Event.deleteOne({ _id: testEvent._id }) : Promise.resolve(),
      testUser?._id ? User.deleteOne({ _id: testUser._id }) : Promise.resolve()
    ]);
  };

  test('Should get all tickets successfully', async () => {
    const retrievedTickets = await ticketQueries.getTickets({} as ResolversParentTypes['Query']);
    
    expect(retrievedTickets).toBeDefined();
    expect(Array.isArray(retrievedTickets)).toBe(true);
    expect(retrievedTickets.length).toBeGreaterThanOrEqual(3);
    

    const testTicketIds = testTickets.map(ticket => ticket._id.toString());
    const retrievedTicketIds = retrievedTickets.map(ticket => ticket._id.toString());
    
    testTicketIds.forEach(id => {
      expect(retrievedTicketIds).toContain(id);
    });
  });

  test('Should return empty array when no tickets exist', async () => {

    await Ticket.deleteMany({});
    
    const retrievedTickets = await ticketQueries.getTickets({} as ResolversParentTypes['Query']);
    
    expect(retrievedTickets).toBeDefined();
    expect(Array.isArray(retrievedTickets)).toBe(true);
    expect(retrievedTickets.length).toBe(0);
  });

  test('Should return tickets with all expected fields', async () => {
    const retrievedTickets = await ticketQueries.getTickets({} as ResolversParentTypes['Query']);
    
    expect(retrievedTickets.length).toBeGreaterThan(0);
    
    const firstTicket = retrievedTickets[0];
    expect(firstTicket).toHaveProperty('_id');
    expect(firstTicket).toHaveProperty('eventId');
    expect(firstTicket).toHaveProperty('userId');
    expect(firstTicket).toHaveProperty('price');
    expect(firstTicket).toHaveProperty('status');
    expect(firstTicket).toHaveProperty('createdAt');
    expect(firstTicket).toHaveProperty('updatedAt');
  });

  test('Should handle database error gracefully', async () => {
    const originalFind = Ticket.find;
    Ticket.find = jest.fn().mockRejectedValue(new Error('Database connection failed'));
    
    const result = await ticketQueries.getTickets({} as ResolversParentTypes['Query']);
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
    
    Ticket.find = originalFind;
  });
});
