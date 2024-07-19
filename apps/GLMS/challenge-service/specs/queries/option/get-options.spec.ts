import { getOptions } from "@/graphql/resolvers/queries";
import { OptionModel } from "@/models/option-model";
import { GraphQLResolveInfo } from "graphql";

jest.mock('@/models/option-model', ()=>({
  OptionModel: {
    find: jest.fn().mockResolvedValue([
      {
        _id: '1',
        optionText: "test1",
        isCorrect: true,
      },
    ]),
  },
}));

describe('Get Options', () => {
  it('should return all options', async () => {
    const result = await getOptions!({}, {}, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual([
      {
        _id: '1',
        optionText: "test1",
        isCorrect: true,
      },
    ]);
  });

  it('should handle errors when the database fails', async () => {
    const errorMessage = 'Database operation failed';
    
    (OptionModel.find as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    
    await expect(getOptions!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(errorMessage);
  });
});