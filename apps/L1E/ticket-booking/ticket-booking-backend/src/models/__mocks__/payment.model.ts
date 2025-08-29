import mongoose from 'mongoose';

interface PaymentData {
  [key: string]: unknown;
  _id?: string;
  status?: string;
  amount?: number;
}

const paymentStorage = new Map<string, PaymentData>();

const generateObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomHex = Math.random().toString(16).substring(2, 10);
  return timestamp + randomHex.padStart(16, '0');
};

function MockPayment(this: PaymentData, data: PaymentData) {
  const id = generateObjectId();
  Object.assign(this, {
    _id: id,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'PENDING',
    ...data
  });
  
  if (data) {
    paymentStorage.set(this._id as string, { ...this });
  }
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
MockPayment.prototype.save = jest.fn().mockImplementation(function(this: PaymentData) {
  this.updatedAt = new Date();
  paymentStorage.set(this._id as string, { ...this });
  return Promise.resolve(this);
});

const findPaymentByQuery = (query: PaymentData): PaymentData | null => {
  for (const payment of paymentStorage.values()) {
    const matches = Object.entries(query).every(([key, value]) => payment[key] === value);
    if (matches) {
      return payment;
    }
  }
  return null;
};

MockPayment.findOne = jest.fn().mockImplementation((query: PaymentData) => {
  if (!query) return Promise.resolve(null);
  return Promise.resolve(findPaymentByQuery(query));
});

MockPayment.findById = jest.fn().mockImplementation((id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const payment = paymentStorage.get(id);
  return Promise.resolve(payment || null);
});

MockPayment.find = jest.fn().mockImplementation((query: PaymentData) => {
  const payments = Array.from(paymentStorage.values());
  
  if (!query || Object.keys(query).length === 0) {
    return Promise.resolve(payments);
  }
  
  const filtered = payments.filter(payment => {
    return Object.entries(query).every(([key, value]) => payment[key] === value);
  });
  
  return Promise.resolve(filtered);
});

MockPayment.create = jest.fn().mockImplementation((_data: PaymentData) => {
  const payment = new (MockPayment as unknown as new (_data: PaymentData) => PaymentData)(_data);
  return Promise.resolve(payment);
});

const updatePayment = (id: string, updates: PaymentData): PaymentData | null => {
  const payment = paymentStorage.get(id);
  if (!payment) return null;
  
  const updated = { ...payment, ...updates, updatedAt: new Date() };
  paymentStorage.set(id, updated);
  return updated;
};

// eslint-disable-next-line complexity
MockPayment.findByIdAndUpdate = jest.fn().mockImplementation((id: string, updates: PaymentData, options: { new?: boolean } = {}) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const payment = paymentStorage.get(id);
  if (!payment) {
    return Promise.resolve(null);
  }
  
  const updatedPayment = updatePayment(id, updates);
  return Promise.resolve(options.new ? updatedPayment : payment);
});

MockPayment.findByIdAndDelete = jest.fn().mockImplementation((id: string) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return Promise.resolve(null);
  }
  
  const payment = paymentStorage.get(id);
  if (payment) {
    paymentStorage.delete(id);
    return Promise.resolve(payment);
  }
  
  return Promise.resolve(null);
});

MockPayment.deleteOne = jest.fn().mockImplementation((query: PaymentData) => {
  if (query._id) {
    const payment = paymentStorage.get(query._id as string);
    if (payment) {
      paymentStorage.delete(query._id as string);
      return Promise.resolve({ deletedCount: 1 });
    }
  }
  
  return Promise.resolve({ deletedCount: 0 });
});

const deletePaymentsByQuery = (query: PaymentData): number => {
  let deletedCount = 0;
  const entries = Array.from(paymentStorage.entries());
  for (const [id, payment] of entries) {
    const matches = Object.entries(query).every(([key, value]) => payment[key] === value);
    if (matches) {
      paymentStorage.delete(id);
      deletedCount++;
    }
  }
  return deletedCount;
};

MockPayment.deleteMany = jest.fn().mockImplementation((query: PaymentData) => {
  if (!query || Object.keys(query).length === 0) {
    const count = paymentStorage.size;
    paymentStorage.clear();
    return Promise.resolve({ deletedCount: count });
  }
  
  const deletedCount = deletePaymentsByQuery(query);
  return Promise.resolve({ deletedCount });
});

export const Payment = MockPayment;