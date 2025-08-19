import { GraphQLResolveInfo } from "graphql";
import { updateProfile } from "src/resolvers/mutations/auth/update-profile";
import { Usermodel } from "src/models/user";
import mongoose from "mongoose";

jest.mock('src/models/user', () => ({
  Usermodel: {
    findById: jest.fn(),
    findOneAndUpdate: jest.fn(),
  },
}));

describe('Update Profile', () => {
  const validId = new mongoose.Types.ObjectId().toHexString();
  const mockUser = {
    _id: new mongoose.Types.ObjectId(validId),
    name: 'Test User',
    email: 'before@gmail.com',
    dateOfBirth: '1990-01-01',
    genderPreferences: 'Both',
    bio: 'Test Bio',
    interests: ['Interest1', 'Interest2'],
    profession: 'Test Profession',
    schoolWork: 'Test School/Work',
    images: ['image1.jpg', 'image2.jpg'],
    likedBy: [],
    likedTo: [],
    matchIds: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    (Usermodel.findById as jest.Mock).mockImplementation((id) => {
      if (id.toString() === validId) {
        return Promise.resolve(mockUser);
      }
      return Promise.resolve(null);
    });

    (Usermodel.findOneAndUpdate as jest.Mock).mockImplementation((filter, update) => {
      if (filter._id.toString() === validId) {
        return Promise.resolve({
          ...mockUser,
          ...update.$set,
        });
      }
      return Promise.resolve(null);
    });
  });

  it('should update a user profile with all fields', async () => {
    const result = await updateProfile!({}, {
      id: validId,
      name: 'Updated Name',
      email: 'test@gmail.com',
      dateOfBirth: '1990-01-01',
      genderPreferences: 'Both',
      bio: 'Updated Bio',
      interests: ['Interest1', 'Interest2'],
      profession: 'Updated Profession',
      schoolWork: 'Updated School/Work',
      images: ['image1.jpg', 'image2.jpg']
    }, {}, {} as GraphQLResolveInfo);

    expect(result.name).toBe('Updated Name');
    expect(result.email).toBe('test@gmail.com');
    expect(Usermodel.findById).toHaveBeenCalledWith(expect.any(mongoose.Types.ObjectId));
    expect(Usermodel.findOneAndUpdate).toHaveBeenCalled();
  });

  it('should update a user profile with only some fields', async () => {
    const result = await updateProfile!({}, {
      id: validId,
      name: 'Updated Name',
      email: undefined, 
      dateOfBirth: undefined,
      genderPreferences: 'Male',
      bio: 'Updated Bio',
      interests: undefined,
      profession: undefined,
      schoolWork: 'New School',
      images: undefined
    }, {}, {} as GraphQLResolveInfo);

    expect(result.name).toBe('Updated Name');
    expect(result.genderPreferences).toBe('Male');
    expect(result.bio).toBe('Updated Bio');
    expect(result.schoolWork).toBe('New School');
    expect(result.email).toBe('before@gmail.com');
    expect(result.interests).toEqual(['Interest1', 'Interest2']);
  });

  it('should throw an error if the user does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString();
    
    (Usermodel.findById as jest.Mock).mockImplementation((id) => {
      if (id.toString() === fakeId) {
        return Promise.resolve(null);
      }
      return Promise.resolve(mockUser);
    });
    
    await expect(updateProfile!({}, { id: fakeId }, {}, {} as GraphQLResolveInfo))
      .rejects
      .toThrow('User not found');
  });

  it('should throw an error if user not found after update', async () => {
    (Usermodel.findOneAndUpdate as jest.Mock).mockResolvedValue(null);
    
    await expect(updateProfile!({}, {
      id: validId,
      name: 'Updated Name'
    }, {}, {} as GraphQLResolveInfo))
      .rejects
      .toThrow('User not found after update');
  });

  it('should throw an error for invalid user ID', async () => {
    await expect(updateProfile!({}, { id: 'invalid-id' }, {}, {} as GraphQLResolveInfo))
      .rejects
      .toThrow('Invalid user ID');
    
    expect(Usermodel.findById).not.toHaveBeenCalled();
  });

  it('should update only name field', async () => {
    const result = await updateProfile!({}, {
      id: validId,
      name: 'Only Name Updated',
    }, {}, {} as GraphQLResolveInfo);

    expect(result.name).toBe('Only Name Updated');
    expect(result.email).toBe('before@gmail.com'); 
  });

  it('should update only email field', async () => {
    const result = await updateProfile!({}, {
      id: validId,
      email: 'newemail@gmail.com',
    }, {}, {} as GraphQLResolveInfo);

    expect(result.email).toBe('newemail@gmail.com');
    expect(result.name).toBe('Test User'); 
  });

});