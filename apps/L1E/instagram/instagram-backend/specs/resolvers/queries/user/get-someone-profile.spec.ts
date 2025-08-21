import { getSomeoneProfile } from 'src/resolvers/queries';
import { User } from '../../../../src/models/user.model';

jest.mock('../../../../src/models/user.model');

describe('getSomeoneProfile query', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return user by whose username', async () => {
        const mockUser = [
            {
                userName: 'naran0121',
                bio: 'unit test bio',
                image: '/'
            }];

        const userName = 'naran';

        (User.findOne as jest.Mock).mockResolvedValue(mockUser);

        const result = await getSomeoneProfile(null, { userName });

        expect(User.findOne).toHaveBeenCalledWith({ userName: userName});
        expect(result).toEqual(mockUser);
    });

    it('should throw an error if no user is found', async () => {
        const userName = 'notfound';

        (User.findOne as jest.Mock).mockResolvedValue(null);

        await expect(getSomeoneProfile(null, { userName })).rejects.toThrow('Profile not found');
    });

    it('should throw a generic error if find throws', async () => {
        const userName = 'erroruser';
    
        (User.findOne as jest.Mock).mockRejectedValue(new Error('DB failure'));
    
        await expect(getSomeoneProfile(null, { userName })).rejects.toThrow('DB failure');
      });

    it('should throw "Failed to get profiles" if caught error is not an instance of Error', async () => {
        const userName = 'invalid';
        (User.findOne as jest.Mock).mockImplementation(() => {
            throw 'Some non-error string';
        });

        await expect(getSomeoneProfile(null, { userName })).rejects.toThrow('Failed to get profiles');
    });

});
