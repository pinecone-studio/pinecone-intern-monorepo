/* eslint max-lines: "off" */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
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

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

window.scrollTo = window.scrollTo || jest.fn();

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { alt = '', ...rest } = props || {};
    return <div aria-label={alt} data-testid="next-image-mock" {...rest} />;
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
}));

jest.mock('@/utils/storage', () => ({
  loadCart: () => [],
  saveCart: jest.fn(),
  saveOrderData: jest.fn(),
}));

const apolloMocks = [
  {
    request: { query: GetCategoriesDocument },
    result: {
      data: {
        getCategories: [
          { __typename: 'Category', categoryId: 'c1', categoryName: 'Үндсэн хоол' },
          { __typename: 'Category', categoryId: 'c2', categoryName: 'Кофе' },
          { __typename: 'Category', categoryId: 'c3', categoryName: 'Амттан' },
        ],
      },
    },
  },
  {
    request: { query: GetFoodsDocument },
    result: {
      data: {
        getFoods: [
          {
            __typename: 'Food',
            foodId: 'f1',
            foodName: 'Taco',
            image: '/taco.png',
            price: '10000',
            foodStatus: 'AVAILABLE',
            discount: null,
            category: {
              __typename: 'Category',
              categoryId: 'c1',
              categoryName: 'Үндсэн хоол',
            },
          },
          {
            __typename: 'Food',
            foodId: 'f2',
            foodName: 'Latte',
            image: '/latte.png',
            price: '8000',
            foodStatus: 'AVAILABLE',
            discount: null,
            category: {
              __typename: 'Category',
              categoryId: 'c2',
              categoryName: 'Кофе',
            },
          },
          {
            __typename: 'Food',
            foodId: 'f3',
            foodName: 'Ice Cream',
            image: '/ice-cream.png',
            price: '5000',
            foodStatus: 'AVAILABLE',
            discount: null,
            category: {
              __typename: 'Category',
              categoryId: 'c3',
              categoryName: 'Амттан',
            },
          },
        ],
      },
    },
  },
];

const cache = new InMemoryCache();

describe('HomePageContainer Enhanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

    const tacoElements = await screen.findAllByText('Taco');
    fireEvent.click(tacoElements[0]);

    fireEvent.click(await screen.findByText('Кофе'));
    fireEvent.click(await screen.findByText('Үндсэн хоол'));
    fireEvent.click(await screen.findByText('Амттан'));
    fireEvent.click(await screen.findByText('Үндсэн хоол'));

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
