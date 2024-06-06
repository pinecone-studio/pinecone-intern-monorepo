/* eslint-disable no-secrets/no-secrets */
import { GraphQLResolveInfo } from 'graphql';
import { createStudent } from '@/graphql/resolvers/mutations/create-student';
import { GraphQLError } from 'graphql';

const mockData = {
  firstName: 'Leap',
  lastName: 'Test',
  studentCode: '661c68e36837efa536464cb5',
  profileImgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  classID: '661c67e66837efa536464cad',
};

jest.mock('../../src/graphql/models/student.models', () => ({
  StudentsModel: {
    create: jest
      .fn()
      .mockReturnValueOnce({
        firstName: 'Leap',
        lastName: 'Test',
        studentCode: '661c68e36837efa536464cb5',
        profileImgUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        classID: '661c67e66837efa536464cad',
      })
      .mockRejectedValueOnce(null),
  },
}));

describe('create student', () => {
  it('should create a student', async () => {
    const result = await createStudent!({}, { articleInput: mockData }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockData);
  });

  it('should throw error if cannot create student', async () => {
    try {
      await createStudent!({}, { articleInput: mockData }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('cannot created student'));
    }
  });
});
