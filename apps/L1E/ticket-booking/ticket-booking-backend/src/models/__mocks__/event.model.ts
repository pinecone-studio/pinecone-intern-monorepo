import mongoose from 'mongoose';

interface EventData {
  [key: string]: unknown;
  _id?: string;
  title?: string;
  date?: Date;
}

const eventStorage = new Map<string, EventData>();

const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomHex = Math.random().toString(16).substring(2, 10);
  return timestamp + randomHex.padStart(16, '0');
};

function MockEvent(this: EventData, data: EventData) {
  const id = generateObjectId();
  Object.assign(this, {
    _id: id,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data
  });
  
  if (data) {
    eventStorage.set(this._id as string, { ...this });
  }
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
MockEvent.prototype.save = jest.fn().mockImplementation(function(this: EventData) {
  this.updatedAt = new Date();
  eventStorage.set(this._id as string, { ...this });
  return Promise.resolve(this);
});

const findEventByQuery = (query: EventData): EventData | null => {
  for (const event of eventStorage.values()) {
    const matches = Object.entries(query).every(([key, value]) => event[key] === value);
    if (matches) {
      return event;
    }
  }
  return null;
};

MockEvent.findOne = jest.fn().mockImplementation((query: EventData) => {
  if (!query) return Promise.resolve(null);
  return Promise.resolve(findEventByQuery(query));
});

MockEvent.findById = jest.fn().mockImplementation((id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const event = eventStorage.get(id);
  return Promise.resolve(event || null);
});

MockEvent.find = jest.fn().mockImplementation((query: EventData) => {
  const events = Array.from(eventStorage.values());
  
  if (!query || Object.keys(query).length === 0) {
    return Promise.resolve(events);
  }
  
  const filtered = events.filter(event => {
    return Object.entries(query).every(([key, value]) => event[key] === value);
  });
  
  return Promise.resolve(filtered);
});

MockEvent.create = jest.fn().mockImplementation((_data: EventData) => {
  const event = new (MockEvent as unknown as new (_data: EventData) => EventData)(_data);
  return Promise.resolve(event);
});

const updateEvent = (id: string, updates: EventData): EventData | null => {
  const event = eventStorage.get(id);
  if (!event) return null;
  
  const updated = { ...event, ...updates, updatedAt: new Date() };
  eventStorage.set(id, updated);
  return updated;
};

// eslint-disable-next-line complexity
MockEvent.findByIdAndUpdate = jest.fn().mockImplementation((id: string, updates: EventData, options: { new?: boolean } = {}) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const event = eventStorage.get(id);
  if (!event) {
    return Promise.resolve(null);
  }
  
  const updatedEvent = updateEvent(id, updates);
  return Promise.resolve(options.new ? updatedEvent : event);
});

MockEvent.findByIdAndDelete = jest.fn().mockImplementation((id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const event = eventStorage.get(id);
  if (event) {
    eventStorage.delete(id);
    return Promise.resolve(event);
  }
  
  return Promise.resolve(null);
});

MockEvent.deleteOne = jest.fn().mockImplementation((query: EventData) => {
  if (query._id) {
    const event = eventStorage.get(query._id as string);
    if (event) {
      eventStorage.delete(query._id as string);
      return Promise.resolve({ deletedCount: 1 });
    }
  }
  
  return Promise.resolve({ deletedCount: 0 });
});

const deleteEventsByQuery = (query: EventData): number => {
  let deletedCount = 0;
  const entries = Array.from(eventStorage.entries());
  for (const [id, event] of entries) {
    const matches = Object.entries(query).every(([key, value]) => event[key] === value);
    if (matches) {
      eventStorage.delete(id);
      deletedCount++;
    }
  }
  return deletedCount;
};

MockEvent.deleteMany = jest.fn().mockImplementation((query: EventData) => {
  if (!query || Object.keys(query).length === 0) {
    const count = eventStorage.size;
    eventStorage.clear();
    return Promise.resolve({ deletedCount: count });
  }
  
  const deletedCount = deleteEventsByQuery(query);
  return Promise.resolve({ deletedCount });
});

export const Event = MockEvent;