import { getusers } from 'src/resolvers/queries/getusers';
import { Usermodel } from 'src/models/user';

jest.mock('src/models/user');

interface MockUser {
  _id: string;
  email: string;
  name: string;
  interests?: Array<{ _id: string; interestName: string }> | null;
  images?: string[] | null;
  likedBy?: Array<{ _id: string; email: string; name: string }>;
  [key: string]: unknown;
}

function mockChain(result: MockUser[]) {
  (Usermodel.find as jest.Mock).mockReturnValue({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue(result),
          }),
        }),
      }),
    }),
  });
}

describe('getusers resolver - main', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns transformed user with likedBy', async () => {
    const users: MockUser[] = [{
      _id: '1', email: 'a@test.com', name: 'Alice',
      images: ['a.png'], likedBy: [{ _id: '2', email: 'b@test.com', name: 'Bob' }]
    }];
    mockChain(users);
    const res = await getusers();
    expect(res[0].likedBy[0].email).toBe('b@test.com');
  });

  it('returns [] when no users exist', async () => {
    mockChain([]);
    const res = await getusers();
    expect(res).toEqual([]);
  });

  it('handles users with interests', async () => {
    const users: MockUser[] = [{
      _id: '1', email: 'a@test.com', name: 'Alice',
      interests: [{ _id: 'i1', interestName: 'Reading' }]
    }];
    mockChain(users);
    const res = await getusers();
    expect(res[0].interests).toEqual([{ _id: 'i1', interestName: 'Reading' }]);
  });

  it('handles null images', async () => {
    const users: MockUser[] = [{ _id: '1', email: 'a@test.com', name: 'Alice', images: null }];
    mockChain(users);
    const res = await getusers();
    expect(res[0].images).toEqual([]);
  });

  it('handles users with multiple interests', async () => {
    const users: MockUser[] = [{
      _id: '1', 
      email: 'a@test.com', 
      name: 'Alice',
      interests: [
        { _id: 'i1', interestName: 'Reading' },
        { _id: 'i2', interestName: 'Gaming' }
      ]
    }];
    mockChain(users);
    const res = await getusers();
    expect(res[0].interests).toEqual([
      { _id: 'i1', interestName: 'Reading' },
      { _id: 'i2', interestName: 'Gaming' }
    ]);
  });

  it('handles users with empty interests array', async () => {
    const users: MockUser[] = [{
      _id: '1', 
      email: 'a@test.com', 
      name: 'Alice',
      interests: []
    }];
    mockChain(users);
    const res = await getusers();
    expect(res[0].interests).toBeUndefined();
  });

  it('handles users with null interests', async () => {
    const users: MockUser[] = [{
      _id: '1', 
      email: 'a@test.com', 
      name: 'Alice',
      interests: null
    }];
    mockChain(users);
    const res = await getusers();
    expect(res[0].interests).toBeUndefined();
  });

  it('handles users with undefined interests', async () => {
    const users: MockUser[] = [{
      _id: '1', 
      email: 'a@test.com', 
      name: 'Alice',
      interests: undefined
    }];
    mockChain(users);
    const res = await getusers();
    expect(res[0].interests).toBeUndefined();
  });

  it('transforms user with all populated fields', async () => {
    const users: MockUser[] = [{
      _id: '1',
      email: 'full@test.com',
      name: 'Full User',
      dateOfBirth: '1990-01-01',
      genderPreferences: 'Female',
      gender: 'Male',
      bio: 'Test bio',
      interests: [{ _id: 'i1', interestName: 'Reading' }],
      profession: 'Developer',
      schoolWork: 'University',
      images: ['img1.jpg', 'img2.jpg'],
      likedBy: [{ _id: '2', email: 'liked@test.com', name: 'Liked User' }],
      likedTo: [{ _id: '3', email: 'target@test.com', name: 'Target User' }],
      matchIds: [{ _id: '4', email: 'match@test.com', name: 'Match User' }]
    }];
    
    mockChain(users);
    const res = await getusers();
    
    expect(res[0]).toMatchObject({
      id: '1',
      email: 'full@test.com',
      name: 'Full User',
      dateOfBirth: '1990-01-01',
      genderPreferences: 'Female',
      gender: 'Male',
      bio: 'Test bio',
      profession: 'Developer',
      schoolWork: 'University'
    });
    expect(res[0].interests).toEqual([{ _id: 'i1', interestName: 'Reading' }]);
    expect(res[0].images).toEqual(['img1.jpg', 'img2.jpg']);
    expect(res[0].likedBy).toHaveLength(1);
    expect(res[0].likedTo).toHaveLength(1);
    expect(res[0].matchIds).toHaveLength(1);
  });
});