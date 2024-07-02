import glmsUserModel from "@/graphql/models/user.model";

jest.mock('@/graphql/models/user.model', () => ({
glmsUserModel: {
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValueOnce({
        _id: '1',
        firstName: 'asdfa',
        lastName: 'bruh',
        email: 'email@gmail.com',
        role: 'STUDENT',
        password: 'mockpass',
        avatar: 'avatarupmock',
      })
      .mockReturnValueOnce(null),
}
}));

describe('Update User')