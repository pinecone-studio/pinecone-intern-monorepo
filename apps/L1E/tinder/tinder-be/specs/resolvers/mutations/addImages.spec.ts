import { GraphQLResolveInfo } from 'graphql';
import { addImages } from '../../../src/resolvers/mutations';
import { userModel } from '../../../src/models/user/user.model';

// Мок хэрэглэгчийг тодорхойлж байгаагаа эхлээд зааж өгнө

// Мок хийх
jest.mock('../../../src/models/user/user.model.ts', () => ({
  userModel: {
    findById: jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        _id: '1',
        images: ['image1.jpg'],
      })
      .mockResolvedValueOnce({ _id: '1', images: ['image1.jpg'] }),
    findByIdAndUpdate: jest.fn().mockResolvedValueOnce({
      _id: '1',
      images: ['image1.jpg'],
    }),
  },
}));

describe('addImages mutation', () => {
  it('should return error when user not found', async () => {
    try {
      await addImages!(
        {},
        { _id: '1', input: { images: ['image2.jpg', 'image3.jpg'] } },
        {
          req: undefined,
        },
        {} as GraphQLResolveInfo
      );
    } catch (error) {
      expect(error).toEqual(new Error('User not found'));
    }
  });

  it('should return error when user not found', async () => {
    try {
      await addImages!(
        {},
        { _id: '1', input: { images: ['image2.jpg', 'image3.jpg'] } },
        {
          req: undefined,
        },
        {} as GraphQLResolveInfo
      );
    } catch (error) {
      expect(error).toEqual(new Error('You can only upload up to 6 images'));
    }
  });

  it('should return error when user not found', async () => {
    try {
      await addImages!(
        {},
        { _id: '1', input: { images: ['image2.jpg', 'image3.jpg', 'image1.jpg', 'image1.jpg', 'image1.jpg', 'image1.jpg', 'image1.jpg'] } },
        {
          req: undefined,
        },
        {} as GraphQLResolveInfo
      );
    } catch (error) {
      expect(error).toEqual(new Error('You can only upload up to 6 images'));
    }
  });
});
