import { GraphQLResolveInfo } from 'graphql';
import { getAllRequests } from '../../../src/resolvers/queries/get-all-requests';
import { RequestModel } from '../../../src/models';

jest.mock('../../../src/models', () => ({
  RequestModel: {
    find: jest.fn().mockReturnValue({
      limit: jest
        .fn()
        .mockResolvedValueOnce([
          {
            _id: '676e6dd407d5ae05a35cda84',
            email: 'jvk@gmail.com',
            jobTitle: 'senior',
            username: 'jvk',
            adminStatus: false,
            employeeStatus: 'Lead',
            updatedAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
            createdAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
          },
        ])
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
          {
            _id: '676e6dd407d5ae05a35cda84',
            email: 'jvk@gmail.com',
            jobTitle: 'senior',
            username: 'jvk',
            adminStatus: false,
            employeeStatus: 'Lead',
            updatedAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
            createdAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
          },
        ]),
    }),
  },
}));



describe('getAllRequests', () => {
  const context = {
    req: {
      user: { id: '1' },
    },
  };

  it('should get getAllRequests', async () => {
    const res = await getAllRequests!({}, { limit: 1 }, context, {} as GraphQLResolveInfo);

    expect(RequestModel.find).toHaveBeenCalledTimes(1);
    expect(res).toEqual([{
      _id: '676e6dd407d5ae05a35cda84',
      email: 'jvk@gmail.com',
      jobTitle: 'senior',
      username: 'jvk',
      adminStatus: false,
      employeeStatus: 'Lead',
      updatedAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
      createdAt: 'Fri Dec 27 2024 17:05:24 GMT+0800 (Ulaanbaatar Standard Time)',
    }]);
  });
  it('should throw an error when no requests are found', async () => {
    await expect(getAllRequests!({}, { limit: 1 }, context, {} as GraphQLResolveInfo)).rejects.toThrow('There is no employees'); 

    expect(RequestModel.find).toHaveBeenCalledTimes(2);
  });
    it('should throw an error when no requests are found', async () => {
      await expect(getAllRequests!({}, { limit: undefined }, context, {} as GraphQLResolveInfo));

      expect(RequestModel.find).toHaveBeenCalledTimes(3);
    });

});
