import { ticketMutations } from '../../../../src/resolvers/mutations/ticket/ticket.mutation';
import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { Ticket } from '../../../../src/models/ticket.model';
import { Event } from '../../../../src/models/event.model';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';
import type { UserType } from '../../../../src/models/user.model';

describe('Create Ticket Mutation - Basic Tests', () => {
  let testEvent: EventType;
  let testUser: UserType;

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
  });

  afterEach(async () => {
    if (testEvent?._id) {
      await Event.deleteOne({ _id: testEvent._id });
    }
    if (testUser?._id) {
      await User.deleteOne({ _id: testUser._id });
    }
  });

  test('Should create a new ticket successfully', async () => {
    const ticketData = {
      eventId: testEvent._id.toString(),
      userId: testUser._id.toString(),
      price: 50.00
    };

    const createdTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
    
    expect(createdTicket).toBeDefined();
    expect(createdTicket.eventId.toString()).toBe(testEvent._id.toString());
    expect(createdTicket.userId.toString()).toBe(testUser._id.toString());
    expect(createdTicket.price).toBe(50.00);
    expect(createdTicket.status).toBe('AVAILABLE');
    expect(createdTicket._id).toBeDefined();
    expect(createdTicket.createdAt).toBeDefined();
    expect(createdTicket.updatedAt).toBeDefined();

    await Ticket.deleteOne({ _id: createdTicket._id });
  });

  test('Should create ticket with decimal price', async () => {
    const ticketData = {
      eventId: testEvent._id.toString(),
      userId: testUser._id.toString(),
      price: 99.99
    };

    const createdTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
    
    expect(createdTicket.price).toBe(99.99);
    expect(createdTicket.status).toBe('AVAILABLE');

    await Ticket.deleteOne({ _id: createdTicket._id });
  });

  test('Should create ticket with zero price', async () => {
    const ticketData = {
      eventId: testEvent._id.toString(),
      userId: testUser._id.toString(),
      price: 0
    };

    const createdTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
    
    expect(createdTicket.price).toBe(0);
    expect(createdTicket.status).toBe('AVAILABLE');

    await Ticket.deleteOne({ _id: createdTicket._id });
  });

  test('Should create multiple tickets for same event and user', async () => {
    const tickets = [];
    
    for (let i = 0; i < 3; i++) {
      const ticketData = {
        eventId: testEvent._id.toString(),
        userId: testUser._id.toString(),
        price: 50 + i * 10
      };
      
      const createdTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
      tickets.push(createdTicket);
    }
    
    expect(tickets.length).toBe(3);
    expect(tickets[0].price).toBe(50);
    expect(tickets[1].price).toBe(60);
    expect(tickets[2].price).toBe(70);
    expect(tickets[0].status).toBe('AVAILABLE');
    expect(tickets[1].status).toBe('AVAILABLE');
    expect(tickets[2].status).toBe('AVAILABLE');

    for (const ticket of tickets) {
      await Ticket.deleteOne({ _id: ticket._id });
    }
  });
});
