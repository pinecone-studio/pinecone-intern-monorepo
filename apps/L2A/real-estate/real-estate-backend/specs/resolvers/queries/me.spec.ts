import { me } from "../../../src/resolvers/queries";

describe('me query', ()=>{
    it('should return the authenticated user', async () => {
        const mockUser = {
            id: '123',
            email:'testUser@gmail.com'
        }
        const result = await me({}, {}, { user: mockUser });
        expect(result).toEqual(mockUser);
    })

    it('should throw an error if user is not authenticated', async()=>{
        await expect(me({},{},{})).rejects.toThrow("Not authenticated")
    })
})