import mongoose from 'mongoose';

interface UserData {
  [key: string]: unknown;
  _id?: string;
  email?: string;
  role?: string;
}

export const userStorage = new Map<string, UserData>();

const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomHex = Math.random().toString(16).substring(2, 10);
  return timestamp + randomHex.padStart(16, '0');
};

function MockUser(this: UserData, data: UserData) {
  const id = generateObjectId();
  Object.assign(this, {
    _id: id,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'USER',
    ...data
  });
  
  if (data) {
    userStorage.set(this._id as string, { ...this });
  }
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
MockUser.prototype.save = jest.fn().mockImplementation(function(this: UserData) {
  this.updatedAt = new Date();
  userStorage.set(this._id as string, { ...this });
  return Promise.resolve(this);
});

const findUserByEmail = (email: string): UserData | null => {
  for (const user of userStorage.values()) {
    if (user.email === email) return user;
  }
  return null;
};

const findUserByQuery = (query: UserData): UserData | null => {
  if (query.email) return findUserByEmail(query.email as string);
  if (query._id) return userStorage.get(query._id as string) || null;
  return null;
};

MockUser.findOne = jest.fn().mockImplementation((query: UserData) => {
  if (!query) return Promise.resolve(null);
  return Promise.resolve(findUserByQuery(query));
});

MockUser.findById = jest.fn().mockImplementation((id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) return Promise.resolve(null);
  return Promise.resolve(userStorage.get(id) || null);
});

MockUser.find = jest.fn().mockImplementation((query: UserData) => {
  const users = Array.from(userStorage.values());
  if (!query || Object.keys(query).length === 0) return Promise.resolve(users);
  
  const filtered = users.filter(user => {
    return Object.entries(query).every(([key, value]) => user[key] === value);
  });
  return Promise.resolve(filtered);
});

MockUser.create = jest.fn().mockImplementation((_data: UserData) => {
  const user = new (MockUser as unknown as new (_data: UserData) => UserData)(_data);
  return Promise.resolve(user);
});

const updateUser = (id: string, updates: UserData): UserData | null => {
  const user = userStorage.get(id);
  if (!user) return null;
  const updated = { ...user, ...updates, updatedAt: new Date() };
  userStorage.set(id, updated);
  return updated;
};

// eslint-disable-next-line complexity
MockUser.findByIdAndUpdate = jest.fn().mockImplementation((id: string, updates: UserData, options: { new?: boolean } = {}) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const user = userStorage.get(id);
  if (!user) {
    return Promise.resolve(null);
  }
  
  const updatedUser = updateUser(id, updates);
  return Promise.resolve(options.new ? updatedUser : user);
});

MockUser.findByIdAndDelete = jest.fn().mockImplementation((id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) return Promise.resolve(null);
  const user = userStorage.get(id);
  if (user) {
    userStorage.delete(id);
    return Promise.resolve(user);
  }
  return Promise.resolve(null);
});

MockUser.deleteOne = jest.fn().mockImplementation((query: UserData) => {
  if (query._id) {
    const user = userStorage.get(query._id as string);
    if (user) {
      userStorage.delete(query._id as string);
      return Promise.resolve({ deletedCount: 1 });
    }
  }
  return Promise.resolve({ deletedCount: 0 });
});

const deleteUsers = (query: UserData): number => {
  let count = 0;
  const entries = Array.from(userStorage.entries());
  
  for (const [id, user] of entries) {
    const matches = Object.entries(query).every(([key, value]) => user[key] === value);
    if (matches) {
      userStorage.delete(id);
      count++;
    }
  }
  return count;
};

MockUser.deleteMany = jest.fn().mockImplementation((query: UserData) => {
  if (!query || Object.keys(query).length === 0) {
    const count = userStorage.size;
    userStorage.clear();
    return Promise.resolve({ deletedCount: count });
  }
  
  const deletedCount = deleteUsers(query);
  return Promise.resolve({ deletedCount });
});

export const User = MockUser;