import { getProductById } from "../../../src/resolvers/queries/get-product-by-id";
import { productModel } from "../../../src/models/product.model";

jest.mock("../../../src/models/product.model");

describe("getProductById resolver", () => {
  const mockProduct = { _id: "123", name: "Sample Product" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a product by ID", async () => {
    (productModel.findById as jest.Mock).mockResolvedValue(mockProduct);

    const result = await getProductById(null, { id: "123" });

    expect(productModel.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockProduct);
  });

  it("should throw an error if database call fails", async () => {
    (productModel.findById as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(getProductById(null, { id: "123" })).rejects.toThrow(
      "Error getting product: DB error"
    );
  });
});
