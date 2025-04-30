import { updateCategory } from "../../../src/resolvers/mutations/update-category";
import { categoryModel } from "../../../src/models/category.model";

jest.mock("../../../src/models/category.model");
describe("updateCategory", () => {
  const mockUpdatedCategory = {
    _id: "123",
    name: "Updated Category",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should successfully update a category", async () => {
    (categoryModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedCategory);
    const result = await updateCategory(null, { _id: "123", name: "Updated Category" });
    expect(result).toEqual(mockUpdatedCategory);
    expect(categoryModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { name: "Updated Category", updatedAt: expect.any(Date) },
      { new: true }
    );
  });
  it("should throw an error if _id is missing", async () => {
    await expect(updateCategory(null, { _id: "", name: "Test" })).rejects.toThrow(
      /Category ID is required/
    );
  });
  it("should throw an error if name is missing", async () => {
    await expect(updateCategory(null, { _id: "123", name: "" })).rejects.toThrow(
      /Category name is required/
    );
  });
  it("should throw an error if name is not a string", async () => {
    await expect(updateCategory(null, { _id: "123", name: 456 as unknown as string })).rejects.toThrow(
      /Category name is required/
    );
  });
  it("should throw an error if category not found", async () => {
    (categoryModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(updateCategory(null, { _id: "123", name: "NotFound" })).rejects.toThrow(
      /Category not found/
    );
  });
  it("should throw an error if update fails", async () => {
    (categoryModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error("DB error"));
    await expect(updateCategory(null, { _id: "123", name: "Fail" })).rejects.toThrow(
      /Error updating category:/
    );
  });
});
