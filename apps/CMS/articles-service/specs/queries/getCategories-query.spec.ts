import { getCategories } from "../../src/graphql/resolvers/queries/get-categories-query";
import { categoryModel } from "../../src/models/category.model";
import { GraphQLError, GraphQLResolveInfo } from "graphql";

jest.mock('../../src/models/category.model', () => ({
    categoryModel: {
        find: jest.fn()
    }
}));

describe('Category', () => {
    it('should return category', async () => {
        const categories = [{ name: 'Entertainment' }, { name: 'Hollywood' }];
        (categoryModel.find as jest.Mock).mockResolvedValue(categories);

        const result = await getCategories!({}, {}, {}, {} as GraphQLResolveInfo);

        expect(result).toEqual(categories);
        expect(categoryModel.find).toHaveBeenCalledTimes(1);
    });
    it('should return Error', async () => {
        const mockError = new Error('Database error');
        
        (categoryModel.find as jest.Mock).mockRejectedValue(mockError);
    
        await expect(getCategories!({}, {}, {}, {} as GraphQLResolveInfo)).rejects.toThrow(GraphQLError);
    
        expect(categoryModel.find).toHaveBeenCalledTimes(2);
    })
});