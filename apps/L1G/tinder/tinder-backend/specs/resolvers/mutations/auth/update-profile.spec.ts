import { GraphQLResolveInfo } from 'graphql';
import { updateProfile } from 'src/resolvers/mutations/auth/update-profile';
import { Usermodel } from 'src/models/user';
import mongoose from 'mongoose';

jest.mock('src/models/user', () => ({
  Usermodel: { findById: jest.fn(), findOneAndUpdate: jest.fn() },
}));
jest.mock('src/models/interests.model', () => ({}));
interface MockUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  dateOfBirth?: string;
  genderPreferences?: string;
  bio?: string;
  interests?: mongoose.Types.ObjectId[];
  profession?: string;
  schoolWork?: string;
  images?: string[];
  gender?: string;
}
describe('updateProfile Resolver - 100% coverage', () => {
  const validId = new mongoose.Types.ObjectId().toHexString();
  const mockUser: MockUser = {
    _id: new mongoose.Types.ObjectId(validId),
    name: 'Test User',
    email: 'before@gmail.com',
    dateOfBirth: '1990-01-01',
    genderPreferences: 'Both',
    bio: 'Test Bio',
    interests: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    profession: 'Test Profession',
    schoolWork: 'Test School/Work',
    images: ['image1.jpg', 'image2.jpg'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (Usermodel.findById as jest.Mock).mockImplementation((id) =>
      id.toString() === validId ? Promise.resolve(mockUser) : Promise.resolve(null)
    );
    (Usermodel.findOneAndUpdate as jest.Mock).mockImplementation((filter, update) =>
      filter._id.toString() === validId
        ? Promise.resolve({ ...mockUser, ...update.$set })
        : Promise.resolve(null)
    );
  });

  it('updates full profile', async () => {
    const result = await updateProfile!({}, {
      id: validId,
      name: 'Updated Name',
      email: 'test@gmail.com',
      dateOfBirth: '1990-01-01',
      genderPreferences: 'Both',
      gender: 'Female',
      bio: 'Updated Bio',
      interests: [new mongoose.Types.ObjectId().toHexString(), new mongoose.Types.ObjectId().toHexString()],
      profession: 'Updated Profession',
      schoolWork: 'Updated School/Work',
      images: ['image1.jpg', 'image2.jpg'],
    }, {}, {} as GraphQLResolveInfo);
    expect(result.name).toBe('Updated Name');
    expect(result.email).toBe('test@gmail.com');
    expect(result.gender).toBe('Female');
    expect(Usermodel.findById).toHaveBeenCalled();
    expect(Usermodel.findOneAndUpdate).toHaveBeenCalled();
  });

  it('updates partial profile', async () => {
    const result = await updateProfile!({}, {
      id: validId,
      name: 'Updated Name',
      genderPreferences: 'Male',
      bio: 'Updated Bio',
      schoolWork: 'New School',
    }, {}, {} as GraphQLResolveInfo);

    expect(result.name).toBe('Updated Name');
    expect(result.genderPreferences).toBe('Male');
    expect(result.bio).toBe('Updated Bio');
    expect(result.schoolWork).toBe('New School');
    expect(result.email).toBe('before@gmail.com'); 
  });
  it('updates only one field', async () => {
    const nameRes = await updateProfile!({}, { id: validId, name: 'Only Name' }, {}, {} as GraphQLResolveInfo);
    expect(nameRes.name).toBe('Only Name');
    const emailRes = await updateProfile!({}, { id: validId, email: 'new@gmail.com' }, {}, {} as GraphQLResolveInfo);
    expect(emailRes.email).toBe('new@gmail.com');
  });
  it('updates interests as strings and objects', async () => {
    const objInterests = [{ _id: new mongoose.Types.ObjectId().toHexString() }];
    const strInterests = [new mongoose.Types.ObjectId().toHexString()];
    const resultObj = await updateProfile!(
      {},
      { id: validId, interests: objInterests.map((i) => i._id) },
      {},
      {} as GraphQLResolveInfo
    );
    const resultStr = await updateProfile!({}, { id: validId, interests: strInterests }, {}, {} as GraphQLResolveInfo);
    expect(resultObj.interests).toHaveLength(1);
    expect(resultStr.interests).toHaveLength(1);
  });

  it('handles undefined interests', async () => {
    const result = await updateProfile!({}, { id: validId, name: 'Test', interests: undefined }, {}, {} as GraphQLResolveInfo);
    expect(result.name).toBe('Test');
    expect(result.interests).toEqual(mockUser.interests);
  });

  it('handles empty interests array', async () => {
    const result = await updateProfile!({}, { id: validId, interests: [] }, {}, {} as GraphQLResolveInfo);
    expect(result.interests).toEqual([]);
  });

  it('throws error if user not found', async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();
    await expect(updateProfile!({}, { id: fakeId }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found');
  });

  it('throws error if not found after update', async () => {
    (Usermodel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
    await expect(updateProfile!({}, { id: validId, name: 'Name' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('User not found after update');
  });

  it('throws error for invalid ID', async () => {
    await expect(updateProfile!({}, { id: 'invalid-id' }, {}, {} as GraphQLResolveInfo)).rejects.toThrow('Invalid user ID');
    expect(Usermodel.findById).not.toHaveBeenCalled();
  });

  it('handles interests with mixed object and string format', async () => {
    const mixedInterests = [
      { _id: new mongoose.Types.ObjectId().toHexString() },
      new mongoose.Types.ObjectId().toHexString()
    ];
    
    const result = await updateProfile!({}, { 
      id: validId, 
      interests: mixedInterests as never
    }, {}, {} as GraphQLResolveInfo);

    expect(result.interests).toHaveLength(2);
  });

  it('handles null values in buildUpdateData', async () => {
    const result = await updateProfile!({}, { 
      id: validId,
      name: undefined,
      email: 'test@example.com',
      bio: undefined
    }, {}, {} as GraphQLResolveInfo);

    expect(result.email).toBe('test@example.com');
  });
})