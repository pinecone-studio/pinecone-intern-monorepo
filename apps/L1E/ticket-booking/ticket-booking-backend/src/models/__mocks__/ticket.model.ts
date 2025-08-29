import mongoose from 'mongoose';

interface TicketData {
  [key: string]: unknown;
  _id?: string;
  status?: string;
  price?: number;
}

const ticketStorage = new Map<string, TicketData>();

const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomHex = Math.random().toString(16).substring(2, 10);
  return timestamp + randomHex.padStart(16, '0');
};

function MockTicket(this: TicketData, data: TicketData) {
  const id = generateObjectId();
  Object.assign(this, {
    _id: id,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'AVAILABLE',
    ...data
  });
  
  if (data) {
    ticketStorage.set(this._id as string, { ...this });
  }
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
MockTicket.prototype.save = jest.fn().mockImplementation(function(this: TicketData) {
  this.updatedAt = new Date();
  ticketStorage.set(this._id as string, { ...this });
  return Promise.resolve(this);
});

const findTicketByQuery = (query: TicketData): TicketData | null => {
  for (const ticket of ticketStorage.values()) {
    const matches = Object.entries(query).every(([key, value]) => ticket[key] === value);
    if (matches) {
      return ticket;
    }
  }
  return null;
};

MockTicket.findOne = jest.fn().mockImplementation((query: TicketData) => {
  if (!query) return Promise.resolve(null);
  return Promise.resolve(findTicketByQuery(query));
});

MockTicket.findById = jest.fn().mockImplementation((id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const ticket = ticketStorage.get(id);
  return Promise.resolve(ticket || null);
});

MockTicket.find = jest.fn().mockImplementation((query: TicketData) => {
  const tickets = Array.from(ticketStorage.values());
  
  if (!query || Object.keys(query).length === 0) {
    return Promise.resolve(tickets);
  }
  
  const filtered = tickets.filter(ticket => {
    return Object.entries(query).every(([key, value]) => ticket[key] === value);
  });
  
  return Promise.resolve(filtered);
});

MockTicket.create = jest.fn().mockImplementation((_data: TicketData) => {
  const ticket = new (MockTicket as unknown as new (_data: TicketData) => TicketData)(_data);
  return Promise.resolve(ticket);
});

const updateTicket = (id: string, updates: TicketData): TicketData | null => {
  const ticket = ticketStorage.get(id);
  if (!ticket) return null;
  
  const updated = { ...ticket, ...updates, updatedAt: new Date() };
  ticketStorage.set(id, updated);
  return updated;
};

// eslint-disable-next-line complexity
MockTicket.findByIdAndUpdate = jest.fn().mockImplementation((id: string, updates: TicketData, options: { new?: boolean } = {}) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const ticket = ticketStorage.get(id);
  if (!ticket) {
    return Promise.resolve(null);
  }
  
  const updatedTicket = updateTicket(id, updates);
  return Promise.resolve(options.new ? updatedTicket : ticket);
});

MockTicket.findByIdAndDelete = jest.fn().mockImplementation((id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const ticket = ticketStorage.get(id);
  if (ticket) {
    ticketStorage.delete(id);
    return Promise.resolve(ticket);
  }
  
  return Promise.resolve(null);
});

MockTicket.deleteOne = jest.fn().mockImplementation((query: TicketData) => {
  if (query._id) {
    const ticket = ticketStorage.get(query._id as string);
    if (ticket) {
      ticketStorage.delete(query._id as string);
      return Promise.resolve({ deletedCount: 1 });
    }
  }
  
  return Promise.resolve({ deletedCount: 0 });
});

const deleteTicketsByQuery = (query: TicketData): number => {
  let deletedCount = 0;
  const entries = Array.from(ticketStorage.entries());
  for (const [id, ticket] of entries) {
    const matches = Object.entries(query).every(([key, value]) => ticket[key] === value);
    if (matches) {
      ticketStorage.delete(id);
      deletedCount++;
    }
  }
  return deletedCount;
};

MockTicket.deleteMany = jest.fn().mockImplementation((query: TicketData) => {
  if (!query || Object.keys(query).length === 0) {
    const count = ticketStorage.size;
    ticketStorage.clear();
    return Promise.resolve({ deletedCount: count });
  }
  
  const deletedCount = deleteTicketsByQuery(query);
  return Promise.resolve({ deletedCount });
});

export const Ticket = MockTicket;