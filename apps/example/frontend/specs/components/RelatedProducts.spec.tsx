import RelatedProducts from '@/components/RelatedProducts';
import { useGetProductByIdQuery, useGetProductsQuery } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';

const mockProductById = {
  _id: '1',
  name: 'Product ID Test',
  images: ['/Images.png'],
  price: 2000,
  category: { _id: '1', name: 'category1' },
};

const mockRelatedProducts = [
  {
    _id: '2',
    name: 'Related Product Test',
    images: ['/Images2.png'],
    price: 1500,
    category: { _id: '1', name: 'category1' },
  },
  {
    _id: '3',
    name: 'Related Product Test2',
    images: ['/Images3.png'],
    price: 3000,
    category: { _id: '1', name: 'category1' },
  },
  {
    _id: '4',
    name: 'Related Product Test2',
    images: ['/Images4.png'],
    price: 4500,
    category: { _id: '1', name: 'category1' },
  },
];

jest.mock('@/generated', () => ({
  useGetProductByIdQuery: jest.fn(),
  useGetProductsQuery: jest.fn(),
}));

describe('Related Products', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('хуудас ачааллаж байхад skeleton гарч ирж байгааг шалгах ', () => {
    (useGetProductByIdQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
    });
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
    });

    render(
      <MockedProvider>
        <RelatedProducts id="1" />
      </MockedProvider>
    );

    expect(screen);
  });

  it('Хуудас ачааллагдсаны дараа холбоотой бараа харагдаж байгааг шалгах ', async () => {
    (useGetProductByIdQuery as jest.Mock).mockReturnValue({
      data: { getProductById: mockProductById },
      loading: false,
    });
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { getProducts: mockRelatedProducts },
      loading: false,
    });

    const { getByTestId } = render(
      <MockedProvider>
        <RelatedProducts id="1" key={1} />
      </MockedProvider>
    );

    await waitFor(() => {
      const a = getByTestId('2');
      expect(a).toBeDefined();
    });

    mockRelatedProducts.forEach((product) => {
      expect(screen.getByTestId(product._id));
      expect(screen.getByText(`${product.price}₮`));
    });
  });

  it('бүтээгдэхүүн нь яг сонгосон id тайгийн холбоотой барааг гаргаж ирж байгааг шалгах', async () => {
    (useGetProductByIdQuery as jest.Mock).mockReturnValue({
      data: { getProductById: mockProductById },
      loading: false,
    });
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { getProducts: mockRelatedProducts },
      loading: false,
    });

    const { findByText } = render(
      <MockedProvider>
        <RelatedProducts id="1" key={1} />
      </MockedProvider>
    );

    await waitFor(() => {
      mockRelatedProducts.forEach(async (product) => {
        const link = await findByText(product.name);
        expect(link);
      });
    });
  });

  it('Холбоотой бүтээгдэхүүн орж ирэхгүй байх үед skeleton гарч байгааг шалгах ', () => {
    (useGetProductByIdQuery as jest.Mock).mockReturnValue({
      data: { getProductById: mockProductById },
      loading: false,
    });
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { getProducts: [] },
      loading: false,
    });

    render(
      <MockedProvider>
        <RelatedProducts id="1" />
      </MockedProvider>
    );
    expect(screen);
  });
});
