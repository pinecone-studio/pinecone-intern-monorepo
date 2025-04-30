import { addProduct } from "../../../src/resolvers/mutations/add-product"; 
import { productModel } from "../../../src/models/product.model"; 
import { Types } from "mongoose";

jest.mock("../../../src/models/product.model", () => ({
  productModel: {
    create: jest.fn(),
  },
}));
describe("addProduct", () => {
  const mockProduct = {
    _id: "12345",
    name: "Test Product",
    price: 1000,
    description: "A test product",
    images: ["image1.jpg"],
    category: new Types.ObjectId(),
  };
  it("should add a new product to the database", async () => {
    (productModel.create as jest.Mock).mockResolvedValue(mockProduct);
    const result = await addProduct(null, mockProduct);
    expect(result).toEqual(mockProduct);
    expect(productModel.create).toHaveBeenCalledWith({
      name: "Test Product",
      price: 1000,
      description: "A test product",
      images: ["image1.jpg"],
      category: expect.anything(),
    });
  });
  it("should throw an error if input is missing required fields", async () => {
    const invalidInput = { ...mockProduct, name: undefined };
    await expect(addProduct(null, invalidInput)).rejects.toThrowError(
      /Product name is required/
    );
  });
  it("should throw an error if product creation fails", async () => {
    const validInput = {
      _id: "some-fake-id",
      name: "Failing Product",
      price: 999,
      description: "Should fail",
      images: ["img.jpg"],
      category: new Types.ObjectId(),
    };
    (productModel.create as jest.Mock).mockRejectedValue(new Error("DB error"));
    await expect(addProduct(null, validInput)).rejects.toThrowError(
      /Error creating product:/
    );
  });
});
