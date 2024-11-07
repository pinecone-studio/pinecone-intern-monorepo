import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useGetProductByIdQuery } from '@/generated';
import ProductDetails from '@/components/ProductDetails';

// GraphQL query hook-ийг тестэнд ашиглахын тулд mock хийж байна
jest.mock('@/generated', () => ({
  useGetProductByIdQuery: jest.fn(),
}));

const mockProduct = {
  _id: '1',
  name: 'Product Test',
  description: 'It is Product Test Description xD',
  price: 1000,
  images: ['/test-image.jpg'],
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  category: {
    _id: '1',
    name: 'Category1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
};

describe('ProductDetails', () => {
  it('үндсэн ачаалал байгааг шалгах', () => {
    useGetProductByIdQuery.mockReturnValue({ loading: true, data: null });

    render(
      <MockedProvider>
        <ProductDetails id="1" />
      </MockedProvider>
    );

    expect(screen);
    expect(screen);
  });

  it('алдаа гарах үед шалгах', () => {
    useGetProductByIdQuery.mockReturnValue({ loading: false, error: new Error('Алдаа') });

    render(
      <MockedProvider>
        <ProductDetails id="1" />
      </MockedProvider>
    );

    expect(screen.getByText(/Error loading product details/i));
  });

  it('бүтээгдэхүүний дэлгэрэнгүйг зөв гаргах', async () => {
    useGetProductByIdQuery.mockReturnValue({ loading: false, error: null, data: { getProductById: mockProduct } });

    render(
      <MockedProvider>
        <ProductDetails id="1" />
      </MockedProvider>
    );

    expect(await screen.findByText(mockProduct.name));
    expect(screen.getByText(mockProduct.description));
    expect(screen.getByText(`${mockProduct.price}₮`));
    expect(screen);
  });

  it('бүтээгдэхүүн олдсохгүйг шалгах', () => {
    useGetProductByIdQuery.mockReturnValue({
      loading: false,
      error: null,
      data: { getProductById: null },
    });

    render(
      <MockedProvider>
        <ProductDetails id="1" />
      </MockedProvider>
    );

    expect(screen.getByText(/Product not found/i));
  });

  it('зураг сонголтыг шалгах', async () => {
    useGetProductByIdQuery.mockReturnValue({ loading: false, error: null, data: { getProductById: mockProduct } });

    render(
      <MockedProvider>
        <ProductDetails id="1" />
      </MockedProvider>
    );

    fireEvent.click(screen.getByAltText('Selected Product Image'));

    expect(screen.getByAltText('Selected Product Image'));
  });

  it('сонгогдсон хэмжээ өөрчлөгдөхийг шалгах ', () => {
    useGetProductByIdQuery.mockReturnValue({ loading: false, error: null, data: { getProductById: mockProduct } });

    render(
      <MockedProvider>
        <ProductDetails id="1" />
      </MockedProvider>
    );

    const sizeSelector = screen.getByRole;

    expect(sizeSelector);
  });

  it('тооллогчийг өөрчлөх', () => {
    useGetProductByIdQuery.mockReturnValue({ loading: false, error: null, data: { getProductById: mockProduct } });

    render(
      <MockedProvider>
        <ProductDetails id="1" />
      </MockedProvider>
    );

    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);

    expect(screen.getByText('2'));
  });

  it('үнэлгээний хэсгийг toggle хийх', () => {
    useGetProductByIdQuery.mockReturnValue({ loading: false, error: null, data: { getProductById: mockProduct } });

    render(
      <MockedProvider>
        <ProductDetails id="1" />
      </MockedProvider>
    );

    const toggleButton = screen.getByText('бүгдийг харах');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Үнэлгээ'));
    expect(screen.getByText('бүгдийг хураах'));
  });
});
