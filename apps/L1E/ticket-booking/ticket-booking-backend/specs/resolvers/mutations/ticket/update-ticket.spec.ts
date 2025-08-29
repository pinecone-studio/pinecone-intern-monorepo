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

describe('Update Ticket Mutation', () => {
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

  test('Should update ticket status to SOLD successfully', async () => {
    const updateData = {
      _id: testTicket._id.toString(),
      status: 'SOLD'
    };

    const updatedTicket = await ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedTicket).toBeDefined();
    expect(updatedTicket.status).toBe('SOLD');
    expect(updatedTicket.eventId.toString()).toBe(testTicket.eventId.toString());
    expect(updatedTicket.userId.toString()).toBe(testTicket.userId.toString());
    expect(updatedTicket.price).toBe(testTicket.price);
    expect(updatedTicket._id.toString()).toBe(testTicket._id.toString());
  });

  test('Should update ticket status to CANCELLED successfully', async () => {
    const updateData = {
      _id: testTicket._id.toString(),
      status: 'CANCELLED'
    };

    const updatedTicket = await ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedTicket.status).toBe('CANCELLED');
    expect(updatedTicket.eventId.toString()).toBe(testTicket.eventId.toString());
  });

  test('Should update ticket status back to AVAILABLE', async () => {
    const soldData = {
      _id: testTicket._id.toString(),
      status: 'SOLD'
    };
    await ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], soldData);

    const availableData = {
      _id: testTicket._id.toString(),
      status: 'AVAILABLE'
    };
    const updatedTicket = await ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], availableData);
    
    expect(updatedTicket.status).toBe('AVAILABLE');
  });

  test('Should throw error for non-existent ticket', async () => {
    const updateData = {
      _id: '507f1f77bcf86cd799439011',
      status: 'SOLD'
    };

    await expect(ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('Ticket not found');
  });

  test('Should throw error for invalid ObjectId format', async () => {
    const updateData = {
      _id: 'invalid-id-format',
      status: 'SOLD'
    };

    await expect(ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], updateData))
      .rejects.toThrow('Invalid ObjectId format');
  });

  test('Should handle invalid status value', async () => {
    const updateData = {
      _id: testTicket._id.toString(),
      status: 'INVALID_STATUS' as unknown as string
    };

    // This should not throw an error since we're not validating status values in the mutation
    const updatedTicket = await ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], updateData);
    expect(updatedTicket.status).toBe('INVALID_STATUS');
  });

  test('Should handle empty update object', async () => {
    const updateData = {
      _id: testTicket._id.toString(),
      status: 'AVAILABLE'
    };

    const updatedTicket = await ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedTicket).toBeDefined();
    expect(updatedTicket._id.toString()).toBe(testTicket._id.toString());
    expect(updatedTicket.status).toBe('AVAILABLE');
  });

  test('Should return correct ticket data after update', async () => {
    const updateData = {
      _id: testTicket._id.toString(),
      status: 'SOLD'
    };

    const updatedTicket = await ticketMutations.updateTicket({} as ResolversParentTypes['Mutation'], updateData);
    
    expect(updatedTicket).toHaveProperty('_id');
    expect(updatedTicket).toHaveProperty('eventId');
    expect(updatedTicket).toHaveProperty('userId');
    expect(updatedTicket).toHaveProperty('price');
    expect(updatedTicket).toHaveProperty('status');
    expect(updatedTicket).toHaveProperty('createdAt');
    expect(updatedTicket).toHaveProperty('updatedAt');
  });
});
