import { sendMessage } from '../../../src/resolvers/mutations';
import { MessageModel } from '../../../src/models';
import { GraphQLResolveInfo } from 'graphql';
import { NextRequest } from 'next/server';

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'fixed-uuid'),
}));

jest.mock('../../../src/models', () => ({
    MessageModel: {
        create: jest.fn(),
    }
}));

const fakeNextRequest: NextRequest = {
    headers: new Headers(),
    nextUrl: new URL('http://localhost'),
    geo: {},
    ip: '127.0.0.1',
    cookies: {},
    method: 'GET',
} as any;

const fakeContext = {
    req: fakeNextRequest,
} as any;
describe('sendMessage Mutation Resolver', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('Should throw an error if input is not provided', async () => {
      await expect(
        sendMessage!({}, { input: undefined }, fakeContext, {} as GraphQLResolveInfo)
      ).rejects.toThrow('Input is required');
    });
  
    it('Should create a message successfully', async () => {
      const input = {
        chatID: '123',
        query: 'Hello AI!',
      };
  
      const fakeMessage = {
        id: 'fixed-uuid',
        chatID: input.chatID,
        query: input.query,
        response: `Echo: ${input.query}`,
        timestamp: new Date(),
      };
  
      (MessageModel.create as jest.Mock).mockResolvedValue(fakeMessage);
  
      const result = await sendMessage!({}, { input }, fakeContext, {} as GraphQLResolveInfo);
  
      expect(MessageModel.create).toHaveBeenCalledTimes(1);
      expect(MessageModel.create).toHaveBeenCalledWith({
        id: 'fixed-uuid',
        chatID: input.chatID,
        query: input.query,
        response: `Echo: ${input.query}`,
        timestamp: expect.any(Date),
      });
  
      expect(result).toEqual(fakeMessage);
    });
  });