import { categoryQuery } from "../../src/graphql/resolvers/queries/category-query";
import { CategoryModel } from "@/models/category.model";

jest.mock('@/models/category.model', () => ({
    find: jest.fn()
}));

describe('Category', () => {
    it('should return category', async () => {
        const categories = [{ name: 'Entertainment' }, { name: 'Hollywood' }];
        
        (CategoryModel.find as jest.Mock).mockResolvedValue(categories);

        const result = await categoryQuery();

        expect(result).toEqual(categories);
        expect(CategoryModel.find).toHaveBeenCalledTimes(1);
    });
});
