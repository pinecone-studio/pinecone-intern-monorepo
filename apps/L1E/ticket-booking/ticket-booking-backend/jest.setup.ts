process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ticket-booking-test';

jest.mock('./src/models/user.model');
jest.mock('./src/models/event.model');
jest.mock('./src/models/ticket.model');
jest.mock('./src/models/payment.model');
jest.mock('mongoose');

beforeAll(async () => {
  jest.spyOn(console, 'error').mockImplementation(() => { /* Silent */ });
  jest.spyOn(console, 'log').mockImplementation(() => { /* Silent */ });
});

afterAll(async () => {
  jest.restoreAllMocks();
});