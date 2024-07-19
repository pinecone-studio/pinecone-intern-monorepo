import { createOption } from "@/graphql/resolvers/mutations"
import { OptionModel } from "@/models/option-model"

jest.mock('@/models/option-model', ()=>({
    OptionModel: {
        create: jest.fn() as jest.Mock
    }
}))

const input = {
    optionText: "test1",
    isCorrect: true,
}

describe('Create Option', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    it('should create a option successful', async ()=>{
        (OptionModel.create as jest.Mock).mockResolvedValue({
            _id: '1',
            optionText: "test1",
            isCorrect: true,
        });

        const result = await createOption({}, {createInput: input})

        expect(result).toEqual({
            _id: '1',
            optionText: "test1",
            isCorrect: true,
        });
        expect(OptionModel.create).toHaveBeenCalledTimes(1);
        expect(OptionModel.create).toHaveBeenCalledWith({ ...input });
    })

    it('should handle errors when database operation fails', async ()=>{
        const errorMessage = 'Database operation failed';

        (OptionModel.create as jest.Mock).mockRejectedValue(new Error(errorMessage))

        await expect(createOption({}, {createInput: input})).rejects.toThrow(errorMessage)

        expect(OptionModel.create).toHaveBeenCalledTimes(1);
        expect(OptionModel.create).toHaveBeenCalledWith({...input})
    })
})