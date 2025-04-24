import { USER_MODEL } from "apps/L2A/real-estate/real-estate-backend/src/models/user";
import { createUser } from 'apps/L2A/real-estate/real-estate-backend/src/resolvers/mutations/user/create-user';
import { generateToken } from "apps/L2A/real-estate/real-estate-backend/src/utils/jwt";
import bcrypt from 'bcryptjs'


jest.mock('../../../../src/models/user', ()=>({
    USER_MODEL:{
        findOne:jest.fn(),
        create: jest.fn()
    }
}));

jest.mock('bcryptjs', ()=>({
    genSaltSync:jest.fn(()=> 'fake-salt'),
    hashSync:jest.fn(()=>'password'),
}));

jest.mock('../../../../src/utils/jwt', ()=>({
    generateToken: jest.fn(()=>'mocked-token'),
}));

describe('tsewerlegee shvv', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })

it('should create new user and generate the token', async()=>{
    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce(null);
    (USER_MODEL.create as jest.Mock).mockResolvedValueOnce({
        _id:"123",
        email:"test@gmail.com",
        isAdmin: false
    })

    const result = await createUser(
        {}, 
        { email: 'test@gmail.com', password: 'secret123' }
      );

    expect(USER_MODEL.findOne).toHaveBeenCalledWith({email:'test@gmail.com'});
    expect(bcrypt.hashSync).toHaveBeenCalledWith('secret123', 'fake-salt');
    expect(generateToken).toHaveBeenCalledWith({id:'123', email: 'test@gmail.com'})
    expect(result).toEqual({
        user:{
            id:'123',
            email:'test@gmail.com',
            isAdmin: false},
            token:'mocked-token'
            })
})
it('should throw error if user already exists', async()=>{
    (USER_MODEL.findOne as jest.Mock).mockResolvedValueOnce({_id: 'existing'});
    await expect(
        createUser({}, {email:'test@gmail.com', password:'secret123'})
    ).rejects.toThrow('user already exist')
})});






