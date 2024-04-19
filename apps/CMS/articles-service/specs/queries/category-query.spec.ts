import { categoryQuery } from "../../src/graphql/resolvers/queries/category-query";
import { CategoryModel } from "@/models/category.model";
import { GraphQLError } from "graphql";

jest.mock('@/models/category.model', () => ({
    CategoryModel: {
        find: jest.fn()
    }
}));

describe('Category', () => {
    it('should return category', async () => {
        const categories = [{ name: 'Entertainment' }, { name: 'Hollywood' }];
        
        (CategoryModel.find as jest.Mock).mockResolvedValue(categories);

        const result = await categoryQuery();

        expect(result).toEqual(categories);
        expect(CategoryModel.find).toHaveBeenCalledTimes(1);
    });
    it('should return Error', async () => {
        const mockError = new Error('Database error');
        
        (CategoryModel.find as jest.Mock).mockRejectedValue(mockError);
    
        await expect(categoryQuery()).rejects.toThrow(GraphQLError);
    
        expect(CategoryModel.find).toHaveBeenCalledTimes(2);
    })
});
