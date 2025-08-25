import { mapSimpleUser } from 'src/resolvers/queries/getusers';

interface MockUser {
  _id: string;
  email: string;
  name: string;
  interests?: Array<{ _id: string; interestName: string }> | null;
  images?: string[] | null;
  [key: string]: unknown;
}

describe('mapSimpleUser function coverage', () => {
  it('should handle user with populated interests array', () => {
    const userWithInterests: MockUser = {
      _id: 'user1',
      email: 'test@example.com',
      name: 'Test User',
      interests: [
        { _id: 'interest1', interestName: 'Photography' },
        { _id: 'interest2', interestName: 'Travel' }
      ]
    };

    const result = mapSimpleUser(userWithInterests as never);
    
    expect(result.interests).toEqual([
      { _id: 'interest1', interestName: 'Photography' },
      { _id: 'interest2', interestName: 'Travel' }
    ]);
  });

  it('should handle user with empty interests array', () => {
    const userWithEmptyInterests: MockUser = {
      _id: 'user1',
      email: 'test@example.com',
      name: 'Test User',
      interests: []
    };

    const result = mapSimpleUser(userWithEmptyInterests as never);
    expect(result.interests).toBeUndefined();
  });

  it('should handle user with null interests', () => {
    const userWithNullInterests: MockUser = {
      _id: 'user1',
      email: 'test@example.com',
      name: 'Test User',
      interests: null
    };

    const result = mapSimpleUser(userWithNullInterests as never);
    expect(result.interests).toBeUndefined();
  });

  it('should handle user with undefined interests', () => {
    const userWithUndefinedInterests: MockUser = {
      _id: 'user1',
      email: 'test@example.com',
      name: 'Test User',
      interests: undefined
    };

    const result = mapSimpleUser(userWithUndefinedInterests as never);
    expect(result.interests).toBeUndefined();
  });

  it('should handle user with null images', () => {
    const userWithNullImages: MockUser = {
      _id: 'user1',
      email: 'test@example.com',
      name: 'Test User',
      images: null
    };

    const result = mapSimpleUser(userWithNullImages as never);
    expect(result.images).toEqual([]);
  });

  it('should handle user with undefined images', () => {
    const userWithUndefinedImages: MockUser = {
      _id: 'user1',
      email: 'test@example.com',
      name: 'Test User',
      images: undefined
    };

    const result = mapSimpleUser(userWithUndefinedImages as never);
    expect(result.images).toEqual([]);
  });
});