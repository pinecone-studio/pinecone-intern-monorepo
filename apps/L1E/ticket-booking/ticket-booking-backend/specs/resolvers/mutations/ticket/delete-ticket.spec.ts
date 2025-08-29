import { ticketMutations } from '../../../../src/resolvers/mutations/ticket/ticket.mutation';
import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { Ticket } from '../../../../src/models/ticket.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';
import type { UserType } from '../../../../src/models/user.model';
import type { TicketType } from '../../../../src/models/ticket.model';

describe('Delete Ticket Mutation', () => {
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

  test('Should delete ticket successfully', async () => {
    const deleteData = {
      _id: testTicket._id.toString()
    };

    const deletedTicket = await ticketMutations.deleteTicket({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedTicket).toBeDefined();
    expect(deletedTicket._id.toString()).toBe(testTicket._id.toString());
    expect(deletedTicket.eventId.toString()).toBe(testTicket.eventId.toString());
    expect(deletedTicket.userId.toString()).toBe(testTicket.userId.toString());
    expect(deletedTicket.price).toBe(testTicket.price);
    expect(deletedTicket.status).toBe(testTicket.status);

    const ticketInDb = await Ticket.findById(testTicket._id);
    expect(ticketInDb).toBeNull();
  });

  test('Should throw error for non-existent ticket', async () => {
    const deleteData = {
      _id: '507f1f77bcf86cd799439011'
    };

    await expect(ticketMutations.deleteTicket({} as ResolversParentTypes['Mutation'], deleteData))
      .rejects.toThrow('Ticket not found');
  });

  test('Should throw error for invalid ObjectId format', async () => {
    const deleteData = {
      _id: 'invalid-id-format'
    };

    await expect(ticketMutations.deleteTicket({} as ResolversParentTypes['Mutation'], deleteData))
      .rejects.toThrow();
  });

  test('Should handle deletion of ticket with different statuses', async () => {
    const updateData = {
      _id: testTicket._id.toString(),
      status: 'SOLD'
    };
    await ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], updateData);

    const deleteData = {
      _id: testTicket._id.toString()
    };

    const deletedTicket = await ticketMutations.deleteTicket({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedTicket.status).toBe('SOLD');
    expect(deletedTicket._id.toString()).toBe(testTicket._id.toString());

    const ticketInDb = await Ticket.findById(testTicket._id);
    expect(ticketInDb).toBeNull();
  });

  test('Should handle deletion of multiple tickets', async () => {
    const tickets = [testTicket];
    for (let i = 0; i < 2; i++) {
      const ticketData = {
        eventId: testEvent._id.toString(),
        userId: testUser._id.toString(),
        price: 60 + i * 10
      };
      const ticket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
      tickets.push(ticket);
    }

    for (const ticket of tickets) {
      const deleteData = {
        _id: ticket._id.toString()
      };
      const deletedTicket = await ticketMutations.deleteTicket({} as ResolversParentTypes['Mutation'], deleteData);
      expect(deletedTicket._id.toString()).toBe(ticket._id.toString());
    }

    for (const ticket of tickets) {
      const ticketInDb = await Ticket.findById(ticket._id);
      expect(ticketInDb).toBeNull();
    }
  });

  test('Should return correct ticket data after deletion', async () => {
    const deleteData = {
      _id: testTicket._id.toString()
    };

    const deletedTicket = await ticketMutations.deleteTicket({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedTicket).toHaveProperty('_id');
    expect(deletedTicket).toHaveProperty('eventId');
    expect(deletedTicket).toHaveProperty('userId');
    expect(deletedTicket).toHaveProperty('price');
    expect(deletedTicket).toHaveProperty('status');
    expect(deletedTicket).toHaveProperty('createdAt');
    expect(deletedTicket).toHaveProperty('updatedAt');
  });

  test('Should handle deletion of ticket with high price', async () => {
    const highPriceTicketData = {
      eventId: testEvent._id.toString(),
      userId: testUser._id.toString(),
      price: 9999.99
    };
    const highPriceTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], highPriceTicketData);

    const deleteData = {
      _id: highPriceTicket._id.toString()
    };

    const deletedTicket = await ticketMutations.deleteTicket({} as ResolversParentTypes['Mutation'], deleteData);
    
    expect(deletedTicket.price).toBe(9999.99);
    expect(deletedTicket._id.toString()).toBe(highPriceTicket._id.toString());

    const highPriceTicketInDb = await Ticket.findById(highPriceTicket._id);
    expect(highPriceTicketInDb).toBeNull();
  });
});
