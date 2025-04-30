import { addCategory } from "../../../src/resolvers/mutations/add-category";
import { categoryModel } from "../../../src/models/category.model";

jest.mock("../../../src/models/category.model");
describe("addCategory", () => {
  const mockCategory = {
    _id: "123",
    name: "Desserts",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should successfully create a category", async () => {
    (categoryModel.create as jest.Mock).mockResolvedValue(mockCategory);
    const result = await addCategory(null, { name: "Desserts" });
    expect(result).toEqual(mockCategory);
    expect(categoryModel.create).toHaveBeenCalledWith({ name: "Desserts" });
  });
  it("should throw an error if name is missing", async () => {
    await expect(addCategory(null, { name: "" })).rejects.toThrow(
      /Category name is required/
    );
  });
  it("should throw an error if name is not a string", async () => {
    await expect(addCategory(null, { name: 123 as unknown as string})).rejects.toThrow(
      /Category name is required/
    );
  });
  it("should throw an error if category creation fails", async () => {
    (categoryModel.create as jest.Mock).mockRejectedValue(new Error("DB error"));
    await expect(addCategory(null, { name: "Drinks" })).rejects.toThrow(
      /Error creating category:/
    );
  });
});
