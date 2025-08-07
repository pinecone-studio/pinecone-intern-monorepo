import { GraphQLResolveInfo } from 'graphql';
import { signup } from 'src/resolvers/mutations';
import bcrypt from 'bcryptjs';
import { UserOtpModel } from 'src/models/userOtp.model';
import { Usermodel } from 'src/models/user';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

jest.mock('src/models/userOtp.model', () => ({
  UserOtpModel: {
    findOne: jest.fn(),
  },
}));

jest.mock('src/models/user', () => {
  const mockSave = jest.fn();
  const mockConstructor = jest.fn().mockImplementation(function (this: any, data: any) {
    Object.assign(this, data);
    this.save = mockSave;
  });

  return {
    Usermodel: Object.assign(mockConstructor, {
      findOne: jest.fn(),
    }),
  };
});

describe('signup', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign up a user successfully', async () => {
    const testEmail = 'test@example.com';

    const mockOtpRecord = {
      email: testEmail,
      verified: true,
      registered: false,
      save: jest.fn(),
    };

    const mockUserId = 'mocked_user_id';

    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

    const mockSaveUser = jest.fn().mockResolvedValue({
      _id: mockUserId,
      email: testEmail,
      name: 'testAccount',
      genderPreferences: 'male',
      dateOfBirth: '2003/12/25',
      bio: 'hud2',
      interests: ['bhgu'],
      profession: 'student',
      schoolWork: 'pinecone',
      images: ['image1', 'image2'],
      likedBy: [],
      likedTo: [],
    });

    (Usermodel as any).mockImplementation(function (this: any, data: any) {
      Object.assign(this, data);
      this.save = mockSaveUser;
    });

    const result = await signup!(
      {},
      {
        password: 'password123',
        genderPreferences: 'male',
        dateOfBirth: '2003/12/25',
        name: 'testAccount',
        images: ['image1', 'image2'],
        bio: 'hud2',
        interests: ['bhgu'],
        profession: 'student',
        schoolWork: 'pinecone',
      },
      {},
      {} as GraphQLResolveInfo
    );

    expect(UserOtpModel.findOne).toHaveBeenCalledWith({ verified: true, registered: false });
    expect(Usermodel.findOne).toHaveBeenCalledWith({ email: testEmail });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(mockSaveUser).toHaveBeenCalled();
    expect(mockOtpRecord.save).toHaveBeenCalled();

    expect(result).toEqual({
      id: mockUserId,
      email: testEmail,
      name: 'testAccount',
      genderPreferences: 'male',
      dateOfBirth: '2003/12/25',
      bio: 'hud2',
      interests: ['bhgu'],
      profession: 'student',
      schoolWork: 'pinecone',
      images: ['image1', 'image2'],
      likedBy: [],
      likedTo: [],
    });
  });

  // ❌ OTP баталгаажаагүй буюу олдсонгүй
  it('should throw error if OTP is not verified or already used', async () => {
    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      signup!(
        {},
        {
          password: 'password123',
          genderPreferences: 'male',
          dateOfBirth: '2003/12/25',
          name: 'testAccount',
          images: ['image1'],
          bio: 'hud2',
          interests: ['bhgu'],
          profession: 'student',
          schoolWork: 'pinecone',
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('OTP not verified or already used for signup');
  });

  // ❌ Email бүртгэлтэй байгаа үед
  it('should throw error if email is already registered', async () => {
    const testEmail = 'test@example.com';

    const mockOtpRecord = {
      email: testEmail,
      verified: true,
      registered: false,
      save: jest.fn(),
    };

    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);
    (Usermodel.findOne as jest.Mock).mockResolvedValue({ email: testEmail });

    await expect(
      signup!(
        {},
        {
          password: 'password123',
          genderPreferences: 'male',
          dateOfBirth: '2003/12/25',
          name: 'testAccount',
          images: ['image1'],
          bio: 'hud2',
          interests: ['bhgu'],
          profession: 'student',
          schoolWork: 'pinecone',
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Email already registered');
  });

  // ❌ Password байхгүй буюу string биш
  it('should throw error if password is not a string', async () => {
    const testEmail = 'test@example.com';

    const mockOtpRecord = {
      email: testEmail,
      verified: true,
      registered: false,
      save: jest.fn(),
    };

    (UserOtpModel.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);
    (Usermodel.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      signup!(
        {},
        {
          password: null as any, // simulate invalid password
          genderPreferences: 'male',
          dateOfBirth: '2003/12/25',
          name: 'testAccount',
          images: ['image1'],
          bio: 'hud2',
          interests: ['bhgu'],
          profession: 'student',
          schoolWork: 'pinecone',
        },
        {},
        {} as GraphQLResolveInfo
      )
    ).rejects.toThrow('Password is required and must be a string');
  });
});
