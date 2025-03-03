import { CategoryModel } from '../../../../src/models';
import { updateCategoryName } from '../../../../src/resolvers/mutations';
import { GraphQLResolveInfo } from 'graphql';

jest.mock('../../../../src/models');

describe('updateCategoryName', () => {
  it('should update the category name successfully', async () => {
    const mockCategory = { id: '1', categoryName: 'Updated Category' };

    jest.spyOn(CategoryModel, 'findByIdAndUpdate').mockResolvedValue(mockCategory);

    const input = { id: '1', categoryName: 'Updated Category' };

    if (!updateCategoryName) return;

    const result = await updateCategoryName({}, { input }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual(mockCategory);
    expect(CategoryModel.findByIdAndUpdate).toHaveBeenCalledWith(input.id, { categoryName: input.categoryName }, { new: true });
  });

  it('should throw an error when the category is not found', async () => {
    // Mock the findByIdAndUpdate method to return null (category not found)
    jest.spyOn(CategoryModel, 'findByIdAndUpdate').mockResolvedValue(null);
    if (!updateCategoryName) return;

    const input = { id: '1', categoryName: 'Updated Category' };

    await expect(updateCategoryName({}, { input }, {}, {} as GraphQLResolveInfo)).rejects.toThrowError('Category not found');
  });
});
