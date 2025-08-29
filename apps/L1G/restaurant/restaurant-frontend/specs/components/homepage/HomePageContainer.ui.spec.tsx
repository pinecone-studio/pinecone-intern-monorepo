/* eslint max-lines: "off" */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
/* eslint max-lines: "off" */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import HomePageContainer from '@/components/home/HomePageContainer';
import { GetCategoriesDocument, GetFoodsDocument } from '@/generated';
import { saveCart as mockSaveCart } from '@/utils/storage';

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
describe('HomePageContainer Enhanced Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllMocks();
  });

  describe('Line 84 - Category Filter Button onClick', () => {
    it('should change active category when valid categoryName is clicked', async () => {
      render(
        <MockedProvider mocks={apolloMocks} cache={cache} addTypename>
          <HomePageContainer />
        </MockedProvider>
      );
  describe('Line 84 - Category Filter Button onClick', () => {
    it('should change active category when valid categoryName is clicked', async () => {
      render(
        <MockedProvider mocks={apolloMocks} cache={cache} addTypename>
          <HomePageContainer />
        </MockedProvider>
      );

      expect(await screen.findByText('Taco')).toBeInTheDocument();
      expect(screen.queryByText('Latte')).not.toBeInTheDocument();
      expect(await screen.findByText('Taco')).toBeInTheDocument();
      expect(screen.queryByText('Latte')).not.toBeInTheDocument();

      const coffeeButton = await screen.findByText('Кофе');
      fireEvent.click(coffeeButton);

      await waitFor(() => {
        expect(screen.getByText('Latte')).toBeInTheDocument();
        expect(screen.queryByText('Taco')).not.toBeInTheDocument();
      });
    });

    it('should ignore click when categoryName is an empty string after trim', async () => {
      const mocksWithEmptyName = [
        {
          request: { query: GetCategoriesDocument },
          result: {
            data: {
              getCategories: [
                { __typename: 'Category', categoryId: 'c1', categoryName: 'Үндсэн хоол' },
                { __typename: 'Category', categoryId: 'c2', categoryName: '   ' },
                { __typename: 'Category', categoryId: 'c3', categoryName: 'Кофе' },
              ],
            },
          },
        },
        apolloMocks[1],
      ];

      render(
        <MockedProvider mocks={mocksWithEmptyName} cache={new InMemoryCache()} addTypename>
          <HomePageContainer />
        </MockedProvider>
      );

      expect(await screen.findByText('Taco')).toBeInTheDocument();

      const buttons = await screen.findAllByTestId('homepage-container-filter-button');
      fireEvent.click(buttons[1]);

      await waitFor(() => {
        expect(screen.getByText('Taco')).toBeInTheDocument();
        const active = screen.getByText('Үндсэн хоол');
        expect(active).toHaveClass('text-orange-600 border-orange-600');
      });

      fireEvent.click(await screen.findByText('Кофе'));
      await waitFor(() => {
        expect(screen.getByText('Latte')).toBeInTheDocument();
        expect(screen.queryByText('Taco')).not.toBeInTheDocument();
      });
    });
  });

  describe('AddToCart Function Tests', () => {
    it('should call addToCart with correct parameters when MenuCard is clicked', async () => {
      render(
        <MockedProvider mocks={apolloMocks} cache={cache} addTypename>
          <HomePageContainer />
        </MockedProvider>
      );

      const tacoElements = await screen.findAllByText('Taco');
      const tacoCard = tacoElements[0];

      fireEvent.click(tacoCard);

      await waitFor(() => {
        expect(mockSaveCart).toHaveBeenCalled();
      });

      const drawerTrigger = screen.getAllByText('Захиалах')[0];
      fireEvent.click(drawerTrigger);

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(within(dialog).getByText('Taco')).toBeInTheDocument();
        expect(within(dialog).getByText(/10000/)).toBeInTheDocument();
      });
    });

    it('should increment count when same item added multiple times via addToCart', async () => {
      render(
        <MockedProvider mocks={apolloMocks} cache={cache} addTypename>
          <HomePageContainer />
        </MockedProvider>
      );

      const tacoElements = await screen.findAllByText('Taco');
      const tacoCard = tacoElements[0];

      fireEvent.click(tacoCard);
      fireEvent.click(tacoCard);
      fireEvent.click(tacoCard);

      fireEvent.click(screen.getByText('Захиалах'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        const countNodes = within(dialog).getAllByText('3');
        let found = false;
        for (const el of countNodes) {
          if (el.getAttribute('aria-live') === 'polite') {
            found = true;
            break;
          }
        }
        expect(found).toBe(true);
      });
    });
  });

  describe('Mixed Integration Tests', () => {
    it('should handle complex cart operations across multiple categories', async () => {
      render(
        <MockedProvider mocks={apolloMocks} cache={cache} addTypename>
          <HomePageContainer />
        </MockedProvider>
      );

      const tacoElements = await screen.findAllByText('Taco');
      fireEvent.click(tacoElements[0]);
      fireEvent.click(tacoElements[0]);

      fireEvent.click(await screen.findByText('Кофе'));

      await screen.findByText('Latte');
      const latteElements = screen.getAllByText('Latte');
      fireEvent.click(latteElements[0]);

      fireEvent.click(screen.getByText('Амттан'));

      await screen.findByText('Ice Cream');
      const iceCreamElements = screen.getAllByText('Ice Cream');
      fireEvent.click(iceCreamElements[0]);
      fireEvent.click(iceCreamElements[0]);
      fireEvent.click(iceCreamElements[0]);

      fireEvent.click(screen.getByText('Захиалах'));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(within(dialog).getByText('Taco')).toBeInTheDocument();
        expect(within(dialog).getByText('Latte')).toBeInTheDocument();
        expect(within(dialog).getByText('Ice Cream')).toBeInTheDocument();
        const allNumbers = within(dialog).queryAllByText(/^[0-9]+$/);
        let politeCount = 0;
        for (const el of allNumbers) {
          if (el.getAttribute('aria-live') === 'polite') politeCount += 1;
        }
        expect(politeCount).toBe(3);
      });
    });

    it('should persist cart state and handle mixed add/remove operations', async () => {
      render(
        <MockedProvider mocks={apolloMocks} cache={cache} addTypename>
          <HomePageContainer />
        </MockedProvider>
      );

      const tacoElements = await screen.findAllByText('Taco');
      fireEvent.click(tacoElements[0]);
      fireEvent.click(tacoElements[0]);
      fireEvent.click(tacoElements[0]);

      fireEvent.click(screen.getByText('Кофе'));
      await screen.findByText('Latte');
      const latteElements = screen.getAllByText('Latte');
      fireEvent.click(latteElements[0]);
      fireEvent.click(latteElements[0]);

      fireEvent.click(screen.getByText('Захиалах'));
      await screen.findByRole('dialog');

      const minusButtons = await screen.findAllByLabelText('Хасах');
      const deleteButtons = await screen.findAllByLabelText('Устгах');

      fireEvent.click(minusButtons[0]);

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        const twos = within(dialog).getAllByText('2');
        let ok = false;
        for (const el of twos) {
          if (el.getAttribute('aria-live') === 'polite') {
            ok = true;
            break;
          }
        }
        expect(ok).toBe(true);
      });

      fireEvent.click(deleteButtons[1]);

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        const texts = within(dialog).queryAllByText(/Taco|Latte/);
        let tacoCount = 0;
        let latteCount = 0;
        for (const el of texts) {
          if (el.textContent === 'Taco') tacoCount += 1;
          if (el.textContent === 'Latte') latteCount += 1;
        }
        expect(tacoCount).toBe(1);
        expect(latteCount).toBe(0);
      });

      expect(mockSaveCart).toHaveBeenCalled();
    });

    it('should handle category switching with active cart items', async () => {
      render(
        <MockedProvider mocks={apolloMocks} cache={cache} addTypename>
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

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(within(dialog).getByText('Taco')).toBeInTheDocument();
      });

      const addAnother = await screen.findAllByText('Taco');
      fireEvent.click(addAnother[0]);

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        const twos = within(dialog).getAllByText('2');
        let ok = false;
        for (const el of twos) {
          if (el.getAttribute('aria-live') === 'polite') {
            ok = true;
            break;
          }
        }
        expect(ok).toBe(true);
      });
    });

    it('should handle edge case of empty cart operations', async () => {
      render(
        <MockedProvider mocks={apolloMocks} cache={cache} addTypename>
          <HomePageContainer />
        </MockedProvider>
      );

      fireEvent.click(screen.getByText('Захиалах'));

      await screen.findByText('Хоосон байна.');

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });

      const tacoElements = await screen.findAllByText('Taco');
      fireEvent.click(tacoElements[0]);

      const drawerTriggers = screen.getAllByText('Захиалах');
      fireEvent.click(drawerTriggers[0]);

      const deleteButton = await screen.findByLabelText('Устгах');
      fireEvent.click(deleteButton);

      await screen.findByText('Хоосон байна.');
    });
      fireEvent.click(screen.getByText('Захиалах'));

      await screen.findByText('Хоосон байна.');

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });

      const tacoElements = await screen.findAllByText('Taco');
      fireEvent.click(tacoElements[0]);

      const drawerTriggers = screen.getAllByText('Захиалах');
      fireEvent.click(drawerTriggers[0]);

      const deleteButton = await screen.findByLabelText('Устгах');
      fireEvent.click(deleteButton);

      await screen.findByText('Хоосон байна.');
    });
  });
});
