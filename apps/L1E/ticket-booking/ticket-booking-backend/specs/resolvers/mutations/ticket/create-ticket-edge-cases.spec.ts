import { ticketMutations } from '../../../../src/resolvers/mutations/ticket/ticket.mutation';
import { eventMutations } from '../../../../src/resolvers/mutations/event/event.mutation';
import { userMutations } from '../../../../src/resolvers/mutations/user/user.mutation';
import { Ticket } from '../../../../src/models/ticket.model';
import { Event } from '../../../../src/models/event.model';
import { User } from '../../../../src/models/user.model';
import { ResolversParentTypes } from '../../../../src/generated';
import type { EventType } from '../../../../src/models/event.model';
import type { UserType } from '../../../../src/models/user.model';

describe('Create Ticket Mutation - Edge Cases', () => {
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

  test('Should handle invalid event ID', async () => {
    const ticketData = {
      eventId: '507f1f77bcf86cd799439011',
      userId: testUser._id.toString(),
      price: 50.00
    };

    const createdTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
    expect(createdTicket).toBeDefined();
    expect(createdTicket.eventId.toString()).toBe('507f1f77bcf86cd799439011');

    await Ticket.deleteOne({ _id: createdTicket._id });
  });

  test('Should handle invalid user ID', async () => {
    const ticketData = {
      eventId: testEvent._id.toString(),
      userId: '507f1f77bcf86cd799439011',
      price: 50.00
    };

    const createdTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
    expect(createdTicket).toBeDefined();
    expect(createdTicket.userId.toString()).toBe('507f1f77bcf86cd799439011');

    await Ticket.deleteOne({ _id: createdTicket._id });
  });

  test('Should handle negative price', async () => {
    const ticketData = {
      eventId: testEvent._id.toString(),
      userId: testUser._id.toString(),
      price: -10.00
    };

    const createdTicket = await ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData);
    expect(createdTicket).toBeDefined();
    expect(createdTicket.price).toBe(-10.00);

    await Ticket.deleteOne({ _id: createdTicket._id });
  });

  test('Should handle database error during creation', async () => {
    const mockSave = jest.spyOn(Ticket.prototype, 'save').mockRejectedValueOnce(new Error('Database error'));
    
    const ticketData = {
      eventId: testEvent._id.toString(),
      userId: testUser._id.toString(),
      price: 50.00
    };

    await expect(ticketMutations.createTicket({} as ResolversParentTypes['Mutation'], ticketData))
      .rejects.toThrow('Database error');
    
    mockSave.mockRestore();
  });
});
