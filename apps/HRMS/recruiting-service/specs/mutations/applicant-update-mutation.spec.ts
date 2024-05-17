import { updateApplicant } from '@/graphql/resolvers/mutations';
import { ApplicantModel } from '@/models/applicant';
import { errorTypes, graphqlErrorHandler } from '@/graphql/resolvers/error';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('@/models/applicant');

const input = {
  title: 'Test Updated Applicant',
};

describe('updateApplicant', () => {
  it('1. should update an applicant', async () => {
    const mockApplicant = { id: '1', ...input };
    (ApplicantModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockApplicant);
    const result = await updateApplicant({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    expect(result).toEqual(mockApplicant);
  });
  it("2. should throw an error if the Applicant doesn't update", async () => {
    (ApplicantModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    try {
      await updateApplicant({}, { id: '1', input }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(graphqlErrorHandler({ message: 'Cannot update Applicant' }, errorTypes.INTERNAL_SERVER_ERROR));
    }
  });
});
