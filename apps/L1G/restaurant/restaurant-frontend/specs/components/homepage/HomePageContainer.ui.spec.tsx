import '@testing-library/jest-dom'; // <- заавал хэрэгтэй
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import HomePageContainer from '@/components/home/HomePageContainer';
import { GetCategoriesDocument, GetFoodsDocument } from '@/generated';
import { Mocks } from 'specs/utils/HomePageMock';
import { CartItem } from '@/types/cart';
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((q: string) => ({
      matches: false,
      media: q,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

describe('HomePageContainer UI', () => {
  beforeEach(() => {
    localStorage.clear();
    setItemSpy.mockClear();
  });

  it('filters by category', async () => {
    render(
      <MockedProvider mocks={Mocks} addTypename={false}>
        <HomePageContainer />
      </MockedProvider>
    );

    // Категори гарч ирж буйг шалгах
    expect(await screen.findByText('Үндсэн хоол')).toBeInTheDocument();
    expect(await screen.findByText('Кофе')).toBeInTheDocument();

    // Эхэнд Taco байна, Latte байхгүй
    expect(await screen.findByText('Taco')).toBeInTheDocument();
    expect(screen.queryByText('Latte')).not.toBeInTheDocument();

    // Кофе дээр дарснаар Latte гарч, Taco алга болно
    fireEvent.click(screen.getByText('Кофе'));
    expect(await screen.findByText('Latte')).toBeInTheDocument();
    expect(screen.queryByText('Taco')).not.toBeInTheDocument();
  });

  it('adds to cart and persists', async () => {
    render(
      <MockedProvider mocks={Mocks} addTypename={false}>
        <HomePageContainer />
      </MockedProvider>
    );

    const taco = await screen.findByText('Taco');
    fireEvent.click(taco);

    await waitFor(() => expect(setItemSpy).toHaveBeenCalled());
    const saved = JSON.parse(localStorage.getItem('foodData') || '[]');
    expect(saved[0]).toMatchObject({ id: '1', foodName: 'Taco', selectCount: 1 });

    fireEvent.click(taco);
    await waitFor(() => {
      const saved2 = JSON.parse(localStorage.getItem('foodData') || '[]');
      expect(saved2[0].selectCount).toBe(2);
    });
  });

  it('hydrates cart from localStorage', async () => {
    const pre: CartItem[] = [{ id: '1', image: '', foodName: 'Taco', price: '15.6к', selectCount: 3 }];
    localStorage.setItem('foodData', JSON.stringify(pre));

    render(
      <MockedProvider mocks={Mocks} addTypename={false}>
        <HomePageContainer />
      </MockedProvider>
    );

    const taco = await screen.findByText('Taco');
    fireEvent.click(taco);
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem('foodData') || '[]');
      expect(saved[0].selectCount).toBe(4);
    });
  });

  it('drawer: remove one updates storage', async () => {
    localStorage.setItem('foodData', JSON.stringify([{ id: '1', image: '', foodName: 'Taco', price: '15.6к', selectCount: 2 }]));

    render(
      <MockedProvider mocks={Mocks} addTypename={false}>
        <HomePageContainer />
      </MockedProvider>
    );

    await screen.findByText('Taco');
    fireEvent.click(screen.getByText('Захиалах'));

    const minusBtn = await screen.findByRole('button', { name: /Хасах/i });
    fireEvent.click(minusBtn);

    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem('foodData') || '[]');
      expect(saved[0].selectCount).toBe(1);
    });
  });

  it('category guard: undefined name does not crash', async () => {
    const broken = [
      {
        request: { query: GetCategoriesDocument },
        result: {
          data: {
            __typename: 'Query',
            getCategories: [{ __typename: 'Category', categoryId: 'unknown', categoryName: undefined }],
          },
        },
      },
      {
        request: { query: GetFoodsDocument },
        result: { data: { __typename: 'Query', getFoods: [] } },
      },
    ];

    render(
      <MockedProvider mocks={broken} addTypename={false}>
        <HomePageContainer />
      </MockedProvider>
    );

    const btn = await screen.findByTestId('homepage-container-filter-button');
    fireEvent.click(btn);
    expect(await screen.findByText('Хоолны цэс')).toBeInTheDocument();
  });
});
