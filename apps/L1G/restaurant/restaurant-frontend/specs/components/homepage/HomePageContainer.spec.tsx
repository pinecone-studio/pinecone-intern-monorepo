/* eslint-disable */
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePageContainer, { addToCartReducer, removeOneReducer, removeItemReducer } from '@/components/home/HomePageContainer';
import type { CartItem } from '@/types/cart';
import { usePathname } from 'next/navigation';
import type { ReactNode, FC } from 'react';

// === Local test-only prop types for mocks (avoid `any`) ===
type MockMenuCardProps = {
  id: string;
  image: string;
  foodName: string;
  price: string;
  count?: number;
  onAdd: (id: string, image: string, foodName: string, price: string) => void;
  onRemove: (id: string) => void;
};

type MockOrderListProps = {
  id: string;
  image: string;
  foodName: string;
  price: string;
  count: number;
  onAdd: (id: string, image: string, foodName: string, price: string) => void;
  onRemove: (id: string) => void;
  removeItem: (id: string) => void;
};

type MockOrderTypeProps = {
  currentCart: CartItem[];
};

type DrawerProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type DrawerTriggerProps = {
  children: ReactNode;
  onClick?: () => void;
};

type DrawerSimpleProps = {
  children: ReactNode;
};

// ======================
// Reducer Tests
// ======================
describe('Cart Reducers', () => {
  const baseItem: CartItem = {
    id: 'x',
    image: '/a.jpg',
    foodName: 'Sample',
    price: '1000',
    selectCount: 2,
  };

  describe('removeItemReducer', () => {
    it('removes item by id', () => {
      const next = removeItemReducer([baseItem], 'x');
      expect(next).toHaveLength(0);
    });

    it('trims id before comparing', () => {
      const next = removeItemReducer([baseItem], '  x ');
      expect(next).toHaveLength(0);
    });

    it('keeps list unchanged if id not found', () => {
      const next = removeItemReducer([baseItem], 'nope');
      expect(next).toEqual([baseItem]);
    });

    it('immutability', () => {
      const prev = Object.freeze([baseItem]) as unknown as CartItem[];
      const next = removeItemReducer(prev, 'x');
      expect(next).not.toBe(prev);
    });
  });

  describe('addToCartReducer', () => {
    const base: CartItem = { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000', selectCount: 1 };

    it('adds a new item if not existing', () => {
      const next = addToCartReducer([], { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000' });
      expect(next).toHaveLength(1);
      expect(next[0].selectCount).toBe(1);
    });

    it('increments selectCount if already exists', () => {
      const next = addToCartReducer([base], { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000' });
      expect(next[0].selectCount).toBe(2);
    });
  });

  describe('removeOneReducer', () => {
    const base: CartItem = { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000', selectCount: 2 };

    it('decrements selectCount if > 1', () => {
      const next = removeOneReducer([base], 'a');
      expect(next[0].selectCount).toBe(1);
    });

    it('removes item if selectCount reaches 0', () => {
      const next = removeOneReducer([{ ...base, selectCount: 1 }], 'a');
      expect(next).toHaveLength(0);
    });

    it('does nothing if id not found', () => {
      const next = removeOneReducer([base], 'nope');
      expect(next).toEqual([base]);
    });
  });
});

// ======================
// UI Tests
// ======================

// Mock GraphQL hooks
jest.mock('@/generated', () => ({
  useGetCategoriesQuery: jest.fn(),
  useGetFoodsQuery: jest.fn(),
}));

// Mock storage utils
jest.mock('@/utils/storage', () => ({
  loadCart: jest.fn(() => []),
  saveCart: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock MenuCard component
jest.mock('@/components/home/MenuCard', () => {
  const MockMenuCard: FC<MockMenuCardProps> = (props) => {
    const { foodName, onAdd, count, onRemove, id, image, price } = props;
    return (
      <div data-testid={`menu-card-${id}`}>
        <span>{foodName}</span>
        <span data-testid={`count-${id}`}>{count}</span>
        <button data-testid={`add-${id}`} onClick={() => onAdd(id, image, foodName, price)}>
          Add
        </button>
        <button data-testid={`remove-${id}`} onClick={() => onRemove(id)}>
          Remove
        </button>
      </div>
    );
  };
  MockMenuCard.displayName = 'MockMenuCard';
  return MockMenuCard;
});

// Mock OrderList component
jest.mock('@/components/home/OrderList', () => {
  const MockOrderList: FC<MockOrderListProps> = ({ foodName, onAdd, count, onRemove, removeItem, id, image: _image, price: _price }) => (
    <div data-testid={`order-list-${id}`}>
      <span>{foodName}</span>
      <span data-testid={`order-count-${id}`}>{count}</span>
      <button data-testid={`order-add-${id}`} onClick={() => onAdd(id, _image, foodName, _price)}>
        +
      </button>
      <button data-testid={`order-remove-one-${id}`} onClick={() => onRemove(id)}>
        -
      </button>
      <button data-testid={`order-remove-item-${id}`} onClick={() => removeItem(id)}>
        Remove All
      </button>
    </div>
  );
  MockOrderList.displayName = 'MockOrderList';
  return MockOrderList;
});

// Mock OrderType component
jest.mock('@/components/home/OrderType', () => {
  const MockOrderType: FC<MockOrderTypeProps> = ({ currentCart }) => <div data-testid="order-type">OrderType Component - {currentCart.length} items</div>;
  MockOrderType.displayName = 'MockOrderType';
  return MockOrderType;
});

// Mock Drawer components
jest.mock('@/components/ui/drawer', () => {
  const Drawer: FC<DrawerProps> = ({ children, open }) => (
    <div data-testid="drawer" data-open={open}>
      {children}
    </div>
  );
  Drawer.displayName = 'MockDrawer';

  const DrawerTrigger: FC<DrawerTriggerProps> = ({ children, onClick }) => (
    <button data-testid="drawer-trigger" onClick={onClick}>
      {children}
    </button>
  );
  DrawerTrigger.displayName = 'MockDrawerTrigger';

  const DrawerContent: FC<DrawerSimpleProps> = ({ children }) => <div data-testid="drawer-content">{children}</div>;
  DrawerContent.displayName = 'MockDrawerContent';

  const DrawerHeader: FC<DrawerSimpleProps> = ({ children }) => <div data-testid="drawer-header">{children}</div>;
  DrawerHeader.displayName = 'MockDrawerHeader';

  const DrawerTitle: FC<DrawerSimpleProps> = ({ children }) => <h2 data-testid="drawer-title">{children}</h2>;
  DrawerTitle.displayName = 'MockDrawerTitle';

  const DrawerFooter: FC<DrawerSimpleProps> = ({ children }) => <div data-testid="drawer-footer">{children}</div>;
  DrawerFooter.displayName = 'MockDrawerFooter';

  return { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter };
});

import { useGetCategoriesQuery } from '@/generated';
import { loadCart, saveCart } from '@/utils/storage';

describe('HomePageContainer', () => {
  const mockCategories = {
    getCategories: [
      {
        categoryId: '1',
        categoryName: 'Main Dish',
        food: [
          { foodId: 'f1', foodName: 'Pizza', price: '10000', image: '/pizza.jpg' },
          { foodId: 'f2', foodName: 'Burger', price: '8000', image: '/burger.jpg' },
        ],
      },
      {
        categoryId: '2',
        categoryName: 'Drinks',
        food: [{ foodId: 'f3', foodName: 'Coke', price: '2000', image: '/coke.jpg' }],
      },
    ],
  };

  beforeEach(() => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({ data: mockCategories });
    (loadCart as jest.Mock).mockReturnValue([]);
    (usePathname as jest.Mock).mockReturnValue('/');
    (saveCart as jest.Mock).mockClear();
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<HomePageContainer />);
    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();
  });

  it('renders category buttons', () => {
    render(<HomePageContainer />);
    expect(screen.getByText('Main Dish')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });

  it('switches category when clicked', () => {
    render(<HomePageContainer />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Drinks'));

    expect(screen.getByText('Coke')).toBeInTheDocument();
    expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
  });

  it('sets active category from first category on data load', () => {
    render(<HomePageContainer />);
    const mainDishButton = screen.getByText('Main Dish');
    expect(mainDishButton).toHaveClass('text-orange-600', 'border-orange-600');
  });

  it('filters items based on active category', () => {
    render(<HomePageContainer />);

    expect(screen.getByTestId('menu-card-f1')).toBeInTheDocument();
    expect(screen.getByTestId('menu-card-f2')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-card-f3')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Drinks'));

    expect(screen.getByTestId('menu-card-f3')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-card-f1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-card-f2')).not.toBeInTheDocument();
  });

  it('adds items to cart correctly', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);

    expect(screen.getByTestId('count-f1')).toHaveTextContent('1');

    fireEvent.click(addButton);
    expect(screen.getByTestId('count-f1')).toHaveTextContent('2');
  });

  it('removes one item from cart correctly', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByTestId('count-f1')).toHaveTextContent('2');

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    const removeOneButton = screen.getByTestId('order-remove-one-f1');
    fireEvent.click(removeOneButton);

    expect(screen.getByTestId('order-count-f1')).toHaveTextContent('1');
  });

  it('removes entire item from cart correctly', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    const removeItemButton = screen.getByTestId('order-remove-item-f1');
    fireEvent.click(removeItemButton);

    expect(screen.queryByTestId('order-list-f1')).not.toBeInTheDocument();
  });

  it('opens and closes drawer correctly', () => {
    render(<HomePageContainer />);

    const drawerTrigger = screen.getByTestId('drawer-trigger');
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'false');

    fireEvent.click(drawerTrigger);
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'true');
  });

  it('shows empty state when cart is empty', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
  });

  it('conditionally renders empty state vs cart items based on cart.length (row 83)', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
    expect(screen.queryByTestId(/order-list-/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    fireEvent.click(screen.getByTestId('add-f1'));
    fireEvent.click(screen.getByTestId('add-f2'));

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.queryByText('Хоосон байна.')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();
    expect(screen.getByTestId('order-list-f2')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('order-remove-item-f1'));
    fireEvent.click(screen.getByTestId('order-remove-item-f2'));

    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
    expect(screen.queryByTestId(/order-list-/)).not.toBeInTheDocument();
  });

  it('renders cart items in drawer when cart has items', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();

    const orderList = screen.getByTestId('order-list-f1');
    expect(orderList).toHaveTextContent('Pizza');

    expect(screen.queryByText('Хоосон байна.')).not.toBeInTheDocument();
  });

  it('renders OrderType component when cart is not empty', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);
    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.getByTestId('order-type')).toBeInTheDocument();
    expect(screen.getByTestId('order-type')).toHaveTextContent('OrderType Component - 1 items');
  });

  it('does not render OrderType component when cart is empty', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.queryByTestId('order-type')).not.toBeInTheDocument();
  });

  it('handles multiple different items in cart', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('add-f1'));
    fireEvent.click(screen.getByTestId('add-f2'));
    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();
    expect(screen.getByTestId('order-list-f2')).toBeInTheDocument();
    expect(screen.getByTestId('order-type')).toHaveTextContent('OrderType Component - 2 items');
  });

  it('loads cart from storage on mount', () => {
    const mockCartData = [{ id: 'f1', image: '/pizza.jpg', foodName: 'Pizza', price: '10000', selectCount: 2 }];
    (loadCart as jest.Mock).mockReturnValue(mockCartData);
    render(<HomePageContainer />);
    expect(screen.getByTestId('count-f1')).toHaveTextContent('2');
  });

  it('saves cart to storage when cart changes', async () => {
    render(<HomePageContainer />);
    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(saveCart).toHaveBeenCalled();
    });
  });

  it('closes drawer when pathname changes', () => {
    const mockUsePathname = usePathname as jest.Mock;
    mockUsePathname.mockReturnValue('/');
    const { rerender } = render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'true');

    mockUsePathname.mockReturnValue('/new-path');
    rerender(<HomePageContainer />);

    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'false');
  });

  it('applies correct styling to active and inactive category buttons', () => {
    render(<HomePageContainer />);

    const mainDishButton = screen.getByText('Main Dish');
    const drinksButton = screen.getByText('Drinks');

    expect(mainDishButton).toHaveClass('text-orange-600', 'border-orange-600');
    expect(drinksButton).toHaveClass('text-gray-500', 'border-transparent');

    fireEvent.click(drinksButton);

    expect(drinksButton).toHaveClass('text-orange-600', 'border-orange-600');
    expect(mainDishButton).toHaveClass('text-gray-500', 'border-transparent');
  });

  it('handles empty categories data gracefully', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: { getCategories: [] },
    });

    render(<HomePageContainer />);
    expect(screen.queryByTestId('homepage-container-filter-button')).not.toBeInTheDocument();
  });

  it('handles undefined categories data gracefully', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({ data: undefined });

    render(<HomePageContainer />);

    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();
    expect(screen.queryByTestId('homepage-container-filter-button')).not.toBeInTheDocument();
  });

  it('handles category with no food items', () => {
    const mockCategoriesWithEmptyFood = {
      getCategories: [
        {
          categoryId: '1',
          categoryName: 'Empty Category',
          food: [],
        },
      ],
    };

    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: mockCategoriesWithEmptyFood,
    });

    render(<HomePageContainer />);

    expect(screen.getByText('Empty Category')).toBeInTheDocument();
    expect(screen.queryByTestId(/menu-card-/)).not.toBeInTheDocument();
  });

  it('calculates cart count correctly for MenuCard', () => {
    render(<HomePageContainer />);

    expect(screen.getByTestId('count-f1')).toHaveTextContent('0');

    fireEvent.click(screen.getByTestId('add-f1'));
    expect(screen.getByTestId('count-f1')).toHaveTextContent('1');

    fireEvent.click(screen.getByTestId('add-f1'));
    expect(screen.getByTestId('count-f1')).toHaveTextContent('2');
  });

  it('does not change active category when categoryName is falsy (covers if-branch false)', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: {
        getCategories: [
          { categoryId: '1', categoryName: 'Main Dish', food: [] },
          { categoryId: '2', categoryName: '', food: [] }, // falsy
        ],
      },
    });

    render(<HomePageContainer />);

    const mainBtn = screen.getByText('Main Dish');
    expect(mainBtn).toHaveClass('text-orange-600', 'border-orange-600');

    const emptyBtn = screen.getByTestId('homepage-container-filter-button-empty');
    fireEvent.click(emptyBtn);

    expect(mainBtn).toHaveClass('text-orange-600', 'border-orange-600');
  });

  it('shows empty cart message when cart length is 0', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();

    expect(screen.queryByTestId(/order-list-/)).not.toBeInTheDocument();

    expect(screen.queryByTestId('order-type')).not.toBeInTheDocument();
  });

  it('switches from empty state to cart items when items are added', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    fireEvent.click(screen.getByTestId('add-f1'));
    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.queryByText('Хоосон байна.')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();
    expect(screen.getByTestId('order-type')).toBeInTheDocument();
  });

  it('performs cart operations through OrderList in drawer', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('add-f1'));
    fireEvent.click(screen.getByTestId('add-f1')); // count: 2

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    fireEvent.click(screen.getByTestId('order-add-f1'));
    expect(screen.getByTestId('order-count-f1')).toHaveTextContent('3');

    fireEvent.click(screen.getByTestId('order-remove-one-f1'));
    expect(screen.getByTestId('order-count-f1')).toHaveTextContent('2');

    fireEvent.click(screen.getByTestId('order-remove-item-f1'));
    expect(screen.queryByTestId('order-list-f1')).not.toBeInTheDocument();
    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
  });

  it('renders empty state message when cart is empty and OrderList when cart has items (row 83)', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByText('Захиалах'));

    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
    expect(screen.queryByTestId(/order-list-/)).not.toBeInTheDocument();

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);

    fireEvent.click(screen.getByText('Захиалах'));

    expect(screen.queryByText('Хоосон байна.')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();
  });
});
/* eslint-disable */
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePageContainer, { addToCartReducer, removeOneReducer, removeItemReducer } from '@/components/home/HomePageContainer';
import type { CartItem } from '@/types/cart';
import { usePathname } from 'next/navigation';
import type { ReactNode, FC } from 'react';

// === Local test-only prop types for mocks (avoid `any`) ===
type MockMenuCardProps = {
  id: string;
  image: string;
  foodName: string;
  price: string;
  count?: number;
  onAdd: (id: string, image: string, foodName: string, price: string) => void;
  onRemove: (id: string) => void;
};

type MockOrderListProps = {
  id: string;
  image: string;
  foodName: string;
  price: string;
  count: number;
  onAdd: (id: string, image: string, foodName: string, price: string) => void;
  onRemove: (id: string) => void;
  removeItem: (id: string) => void;
};

type MockOrderTypeProps = {
  currentCart: CartItem[];
};

type DrawerProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type DrawerTriggerProps = {
  children: ReactNode;
  onClick?: () => void;
};

type DrawerSimpleProps = {
  children: ReactNode;
};

// ======================
// Reducer Tests
// ======================
describe('Cart Reducers', () => {
  const baseItem: CartItem = {
    id: 'x',
    image: '/a.jpg',
    foodName: 'Sample',
    price: '1000',
    selectCount: 2,
  };

  describe('removeItemReducer', () => {
    it('removes item by id', () => {
      const next = removeItemReducer([baseItem], 'x');
      expect(next).toHaveLength(0);
    });

    it('trims id before comparing', () => {
      const next = removeItemReducer([baseItem], '  x ');
      expect(next).toHaveLength(0);
    });

    it('keeps list unchanged if id not found', () => {
      const next = removeItemReducer([baseItem], 'nope');
      expect(next).toEqual([baseItem]);
    });

    it('immutability', () => {
      const prev = Object.freeze([baseItem]) as unknown as CartItem[];
      const next = removeItemReducer(prev, 'x');
      expect(next).not.toBe(prev);
    });
  });

  describe('addToCartReducer', () => {
    const base: CartItem = { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000', selectCount: 1 };

    it('adds a new item if not existing', () => {
      const next = addToCartReducer([], { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000' });
      expect(next).toHaveLength(1);
      expect(next[0].selectCount).toBe(1);
    });

    it('increments selectCount if already exists', () => {
      const next = addToCartReducer([base], { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000' });
      expect(next[0].selectCount).toBe(2);
    });
  });

  describe('removeOneReducer', () => {
    const base: CartItem = { id: 'a', image: '/a.jpg', foodName: 'Soup', price: '1000', selectCount: 2 };

    it('decrements selectCount if > 1', () => {
      const next = removeOneReducer([base], 'a');
      expect(next[0].selectCount).toBe(1);
    });

    it('removes item if selectCount reaches 0', () => {
      const next = removeOneReducer([{ ...base, selectCount: 1 }], 'a');
      expect(next).toHaveLength(0);
    });

    it('does nothing if id not found', () => {
      const next = removeOneReducer([base], 'nope');
      expect(next).toEqual([base]);
    });
  });
});

// ======================
// UI Tests
// ======================

// Mock GraphQL hooks
jest.mock('@/generated', () => ({
  useGetCategoriesQuery: jest.fn(),
  useGetFoodsQuery: jest.fn(),
}));

// Mock storage utils
jest.mock('@/utils/storage', () => ({
  loadCart: jest.fn(() => []),
  saveCart: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock MenuCard component
jest.mock('@/components/home/MenuCard', () => {
  const MockMenuCard: FC<MockMenuCardProps> = (props) => {
    const { foodName, onAdd, count, onRemove, id, image, price } = props;
    return (
      <div data-testid={`menu-card-${id}`}>
        <span>{foodName}</span>
        <span data-testid={`count-${id}`}>{count}</span>
        <button data-testid={`add-${id}`} onClick={() => onAdd(id, image, foodName, price)}>
          Add
        </button>
        <button data-testid={`remove-${id}`} onClick={() => onRemove(id)}>
          Remove
        </button>
      </div>
    );
  };
  MockMenuCard.displayName = 'MockMenuCard';
  return MockMenuCard;
});

// Mock OrderList component
jest.mock('@/components/home/OrderList', () => {
  const MockOrderList: FC<MockOrderListProps> = ({ foodName, onAdd, count, onRemove, removeItem, id, image: _image, price: _price }) => (
    <div data-testid={`order-list-${id}`}>
      <span>{foodName}</span>
      <span data-testid={`order-count-${id}`}>{count}</span>
      <button data-testid={`order-add-${id}`} onClick={() => onAdd(id, _image, foodName, _price)}>
        +
      </button>
      <button data-testid={`order-remove-one-${id}`} onClick={() => onRemove(id)}>
        -
      </button>
      <button data-testid={`order-remove-item-${id}`} onClick={() => removeItem(id)}>
        Remove All
      </button>
    </div>
  );
  MockOrderList.displayName = 'MockOrderList';
  return MockOrderList;
});

// Mock OrderType component
jest.mock('@/components/home/OrderType', () => {
  const MockOrderType: FC<MockOrderTypeProps> = ({ currentCart }) => <div data-testid="order-type">OrderType Component - {currentCart.length} items</div>;
  MockOrderType.displayName = 'MockOrderType';
  return MockOrderType;
});

// Mock Drawer components
jest.mock('@/components/ui/drawer', () => {
  const Drawer: FC<DrawerProps> = ({ children, open }) => (
    <div data-testid="drawer" data-open={open}>
      {children}
    </div>
  );
  Drawer.displayName = 'MockDrawer';

  const DrawerTrigger: FC<DrawerTriggerProps> = ({ children, onClick }) => (
    <button data-testid="drawer-trigger" onClick={onClick}>
      {children}
    </button>
  );
  DrawerTrigger.displayName = 'MockDrawerTrigger';

  const DrawerContent: FC<DrawerSimpleProps> = ({ children }) => <div data-testid="drawer-content">{children}</div>;
  DrawerContent.displayName = 'MockDrawerContent';

  const DrawerHeader: FC<DrawerSimpleProps> = ({ children }) => <div data-testid="drawer-header">{children}</div>;
  DrawerHeader.displayName = 'MockDrawerHeader';

  const DrawerTitle: FC<DrawerSimpleProps> = ({ children }) => <h2 data-testid="drawer-title">{children}</h2>;
  DrawerTitle.displayName = 'MockDrawerTitle';

  const DrawerFooter: FC<DrawerSimpleProps> = ({ children }) => <div data-testid="drawer-footer">{children}</div>;
  DrawerFooter.displayName = 'MockDrawerFooter';

  return { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter };
});

import { useGetCategoriesQuery } from '@/generated';
import { loadCart, saveCart } from '@/utils/storage';

describe('HomePageContainer', () => {
  const mockCategories = {
    getCategories: [
      {
        categoryId: '1',
        categoryName: 'Main Dish',
        food: [
          { foodId: 'f1', foodName: 'Pizza', price: '10000', image: '/pizza.jpg' },
          { foodId: 'f2', foodName: 'Burger', price: '8000', image: '/burger.jpg' },
        ],
      },
      {
        categoryId: '2',
        categoryName: 'Drinks',
        food: [{ foodId: 'f3', foodName: 'Coke', price: '2000', image: '/coke.jpg' }],
      },
    ],
  };

  beforeEach(() => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({ data: mockCategories });
    (loadCart as jest.Mock).mockReturnValue([]);
    (usePathname as jest.Mock).mockReturnValue('/');
    (saveCart as jest.Mock).mockClear();
    jest.clearAllMocks();
  });

  it('renders the title correctly', () => {
    render(<HomePageContainer />);
    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();
  });

  it('renders category buttons', () => {
    render(<HomePageContainer />);
    expect(screen.getByText('Main Dish')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });

  it('switches category when clicked', () => {
    render(<HomePageContainer />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Drinks'));

    expect(screen.getByText('Coke')).toBeInTheDocument();
    expect(screen.queryByText('Pizza')).not.toBeInTheDocument();
  });

  it('sets active category from first category on data load', () => {
    render(<HomePageContainer />);
    const mainDishButton = screen.getByText('Main Dish');
    expect(mainDishButton).toHaveClass('text-orange-600', 'border-orange-600');
  });

  it('filters items based on active category', () => {
    render(<HomePageContainer />);

    expect(screen.getByTestId('menu-card-f1')).toBeInTheDocument();
    expect(screen.getByTestId('menu-card-f2')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-card-f3')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Drinks'));

    expect(screen.getByTestId('menu-card-f3')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-card-f1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu-card-f2')).not.toBeInTheDocument();
  });

  it('adds items to cart correctly', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);

    expect(screen.getByTestId('count-f1')).toHaveTextContent('1');

    fireEvent.click(addButton);
    expect(screen.getByTestId('count-f1')).toHaveTextContent('2');
  });

  it('removes one item from cart correctly', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByTestId('count-f1')).toHaveTextContent('2');

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    const removeOneButton = screen.getByTestId('order-remove-one-f1');
    fireEvent.click(removeOneButton);

    expect(screen.getByTestId('order-count-f1')).toHaveTextContent('1');
  });

  it('removes entire item from cart correctly', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    const removeItemButton = screen.getByTestId('order-remove-item-f1');
    fireEvent.click(removeItemButton);

    expect(screen.queryByTestId('order-list-f1')).not.toBeInTheDocument();
  });

  it('opens and closes drawer correctly', () => {
    render(<HomePageContainer />);

    const drawerTrigger = screen.getByTestId('drawer-trigger');
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'false');

    fireEvent.click(drawerTrigger);
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'true');
  });

  it('shows empty state when cart is empty', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
  });

  it('conditionally renders empty state vs cart items based on cart.length (row 83)', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
    expect(screen.queryByTestId(/order-list-/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    fireEvent.click(screen.getByTestId('add-f1'));
    fireEvent.click(screen.getByTestId('add-f2'));

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.queryByText('Хоосон байна.')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();
    expect(screen.getByTestId('order-list-f2')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('order-remove-item-f1'));
    fireEvent.click(screen.getByTestId('order-remove-item-f2'));

    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
    expect(screen.queryByTestId(/order-list-/)).not.toBeInTheDocument();
  });

  it('renders cart items in drawer when cart has items', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();

    const orderList = screen.getByTestId('order-list-f1');
    expect(orderList).toHaveTextContent('Pizza');

    expect(screen.queryByText('Хоосон байна.')).not.toBeInTheDocument();
  });

  it('renders OrderType component when cart is not empty', () => {
    render(<HomePageContainer />);

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);
    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.getByTestId('order-type')).toBeInTheDocument();
    expect(screen.getByTestId('order-type')).toHaveTextContent('OrderType Component - 1 items');
  });

  it('does not render OrderType component when cart is empty', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.queryByTestId('order-type')).not.toBeInTheDocument();
  });

  it('handles multiple different items in cart', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('add-f1'));
    fireEvent.click(screen.getByTestId('add-f2'));
    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();
    expect(screen.getByTestId('order-list-f2')).toBeInTheDocument();
    expect(screen.getByTestId('order-type')).toHaveTextContent('OrderType Component - 2 items');
  });

  it('loads cart from storage on mount', () => {
    const mockCartData = [{ id: 'f1', image: '/pizza.jpg', foodName: 'Pizza', price: '10000', selectCount: 2 }];
    (loadCart as jest.Mock).mockReturnValue(mockCartData);
    render(<HomePageContainer />);
    expect(screen.getByTestId('count-f1')).toHaveTextContent('2');
  });

  it('saves cart to storage when cart changes', async () => {
    render(<HomePageContainer />);
    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(saveCart).toHaveBeenCalled();
    });
  });

  it('closes drawer when pathname changes', () => {
    const mockUsePathname = usePathname as jest.Mock;
    mockUsePathname.mockReturnValue('/');
    const { rerender } = render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'true');

    mockUsePathname.mockReturnValue('/new-path');
    rerender(<HomePageContainer />);

    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'false');
  });

  it('applies correct styling to active and inactive category buttons', () => {
    render(<HomePageContainer />);

    const mainDishButton = screen.getByText('Main Dish');
    const drinksButton = screen.getByText('Drinks');

    expect(mainDishButton).toHaveClass('text-orange-600', 'border-orange-600');
    expect(drinksButton).toHaveClass('text-gray-500', 'border-transparent');

    fireEvent.click(drinksButton);

    expect(drinksButton).toHaveClass('text-orange-600', 'border-orange-600');
    expect(mainDishButton).toHaveClass('text-gray-500', 'border-transparent');
  });

  it('handles empty categories data gracefully', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: { getCategories: [] },
    });

    render(<HomePageContainer />);
    expect(screen.queryByTestId('homepage-container-filter-button')).not.toBeInTheDocument();
  });

  it('handles undefined categories data gracefully', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({ data: undefined });

    render(<HomePageContainer />);

    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();
    expect(screen.queryByTestId('homepage-container-filter-button')).not.toBeInTheDocument();
  });

  it('handles category with no food items', () => {
    const mockCategoriesWithEmptyFood = {
      getCategories: [
        {
          categoryId: '1',
          categoryName: 'Empty Category',
          food: [],
        },
      ],
    };

    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: mockCategoriesWithEmptyFood,
    });

    render(<HomePageContainer />);

    expect(screen.getByText('Empty Category')).toBeInTheDocument();
    expect(screen.queryByTestId(/menu-card-/)).not.toBeInTheDocument();
  });

  it('calculates cart count correctly for MenuCard', () => {
    render(<HomePageContainer />);

    expect(screen.getByTestId('count-f1')).toHaveTextContent('0');

    fireEvent.click(screen.getByTestId('add-f1'));
    expect(screen.getByTestId('count-f1')).toHaveTextContent('1');

    fireEvent.click(screen.getByTestId('add-f1'));
    expect(screen.getByTestId('count-f1')).toHaveTextContent('2');
  });

  it('does not change active category when categoryName is falsy (covers if-branch false)', () => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: {
        getCategories: [
          { categoryId: '1', categoryName: 'Main Dish', food: [] },
          { categoryId: '2', categoryName: '', food: [] }, // falsy
        ],
      },
    });

    render(<HomePageContainer />);

    const mainBtn = screen.getByText('Main Dish');
    expect(mainBtn).toHaveClass('text-orange-600', 'border-orange-600');

    const emptyBtn = screen.getByTestId('homepage-container-filter-button-empty');
    fireEvent.click(emptyBtn);

    expect(mainBtn).toHaveClass('text-orange-600', 'border-orange-600');
  });

  it('shows empty cart message when cart length is 0', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();

    expect(screen.queryByTestId(/order-list-/)).not.toBeInTheDocument();

    expect(screen.queryByTestId('order-type')).not.toBeInTheDocument();
  });

  it('switches from empty state to cart items when items are added', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('drawer-trigger'));
    fireEvent.click(screen.getByTestId('add-f1'));
    fireEvent.click(screen.getByTestId('drawer-trigger'));

    expect(screen.queryByText('Хоосон байна.')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();
    expect(screen.getByTestId('order-type')).toBeInTheDocument();
  });

  it('performs cart operations through OrderList in drawer', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByTestId('add-f1'));
    fireEvent.click(screen.getByTestId('add-f1')); // count: 2

    fireEvent.click(screen.getByTestId('drawer-trigger'));

    fireEvent.click(screen.getByTestId('order-add-f1'));
    expect(screen.getByTestId('order-count-f1')).toHaveTextContent('3');

    fireEvent.click(screen.getByTestId('order-remove-one-f1'));
    expect(screen.getByTestId('order-count-f1')).toHaveTextContent('2');

    fireEvent.click(screen.getByTestId('order-remove-item-f1'));
    expect(screen.queryByTestId('order-list-f1')).not.toBeInTheDocument();
    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
  });

  it('renders empty state message when cart is empty and OrderList when cart has items (row 83)', () => {
    render(<HomePageContainer />);

    fireEvent.click(screen.getByText('Захиалах'));

    expect(screen.getByText('Хоосон байна.')).toBeInTheDocument();
    expect(screen.queryByTestId(/order-list-/)).not.toBeInTheDocument();

    const addButton = screen.getByTestId('add-f1');
    fireEvent.click(addButton);

    fireEvent.click(screen.getByText('Захиалах'));

    expect(screen.queryByText('Хоосон байна.')).not.toBeInTheDocument();
    expect(screen.getByTestId('order-list-f1')).toBeInTheDocument();
  });
});
