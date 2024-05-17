import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { deleteApplicant } from '@/graphql/resolvers/mutations/applicant-delete-mutation';
import { GraphQLResolveInfo } from 'graphql';
import { ApplicantModel } from '@/models/applicant';

jest.mock('@/models/applicant', () => ({
  ApplicantModel: {
    findByIdAndDelete: jest
      .fn()
      .mockResolvedValueOnce({
        id: '1',
      })
      .mockResolvedValueOnce(null),
  },
}));

describe('Delete Applicant', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between test cases
  });

  it('should delete an Applicant', async () => {
    const result = await deleteApplicant!({}, { id: '1' }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
      id: '1',
    });
    expect(ApplicantModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('should throw an error if the Applicant does not exist', async () => {
    await expect(deleteApplicant!({}, { id: '1' }, {}, {} as GraphQLResolveInfo)).rejects.toEqual(graphqlErrorHandler({ message: 'Cannot delete Applicant' }, errorTypes.INTERNAL_SERVER_ERROR));
    expect(ApplicantModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
