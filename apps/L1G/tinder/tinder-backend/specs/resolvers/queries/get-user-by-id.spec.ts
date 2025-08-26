import { getUser } from 'src/resolvers/queries';
import { GraphQLResolveInfo } from 'graphql';

// Track populate calls
const populateCalls: string[] = [];
let finalResolveValue: any = null;

jest.mock('src/models/user.ts', () => ({
  Usermodel: {
    findById: jest.fn((id) => {
      // Reset for each test
      populateCalls.length = 0;
      
      return {
        populate: jest.fn((field) => {
          populateCalls.push(field);
          return {
            populate: jest.fn((field) => {
              populateCalls.push(field);
              return {
                populate: jest.fn((field) => {
                  populateCalls.push(field);
                  return {
                    populate: jest.fn((field) => {
                      populateCalls.push(field);
                      // Return a promise that resolves to the final value
                      return Promise.resolve(finalResolveValue);
                    })
                  };
                })
              };
            })
          };
        })
      };
    })
  }
}));

describe('get user by id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    populateCalls.length = 0;
    finalResolveValue = null;
  });

  it('should return user by id', async () => {
    const mockUser = {
      id: '1',
      name: 'test user',
      email: 'test@example.com',
      interests: [
        {
          _id: 'interest1',
          interestName: 'Reading'
        }
      ]
    };

    finalResolveValue = mockUser;

    const result = await getUser!({}, { _id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result.id).toBe('1');
    expect(result.name).toBe('test user');
    expect(result.email).toBe('test@example.com');
    expect(result.interests).toBeDefined();
    
    // Verify the populate calls were made in the correct order
    expect(populateCalls).toEqual(['interests', 'likedBy', 'likedTo', 'matchIds']);
  });

  it('should throw error when user not found', async () => {
    finalResolveValue = null;

    await expect(
      getUser!({}, { _id: '2' }, {}, {} as GraphQLResolveInfo)
    ).rejects.toThrow('User not found');
  });
});