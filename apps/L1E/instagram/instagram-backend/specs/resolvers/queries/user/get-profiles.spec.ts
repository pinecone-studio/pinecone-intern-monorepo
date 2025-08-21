import { getProfiles } from 'src/resolvers/queries';
import { User } from '../../../../src/models/user.model';

jest.mock('../../../../src/models/user.model');

describe('getProfiles query', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return users by their username', async () => {
        const mockUsers = [
            {
                userName: 'naran0121',
                bio: 'unit test bio',
                image: '/'
            },
            {
                userName: 'narangerel',
                bio: 'integration test bio',
                image: '/'
            }
        ];

        const userName = 'naran';

        (User.find as jest.Mock).mockResolvedValue(mockUsers);

        const result = await getProfiles(null, { userName });

        expect(User.find).toHaveBeenCalledWith({ userName: new RegExp(userName, 'i') });
        expect(result).toEqual(mockUsers);
    });

    it('should throw an error if no user is found', async () => {
        const userName = 'notfound';

        (User.find as jest.Mock).mockResolvedValue(null);

        await expect(getProfiles(null, { userName })).rejects.toThrow('Profile not found');
    });

    it('should throw a generic error if find throws', async () => {
        const userName = 'erroruser';
    
        (User.find as jest.Mock).mockRejectedValue(new Error('DB failure'));
    
        await expect(getProfiles(null, { userName })).rejects.toThrow('DB failure');
      });

    it('should throw "Failed to get profiles" if caught error is not an instance of Error', async () => {
        const userName = 'invalid';
        (User.find as jest.Mock).mockImplementation(() => {
            throw 'Some non-error string';
        });

        await expect(getProfiles(null, { userName })).rejects.toThrow('Failed to get profiles');
    });

});
