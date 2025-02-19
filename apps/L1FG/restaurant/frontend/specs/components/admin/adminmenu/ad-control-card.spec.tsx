/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetCategoriesQuery } from '@/generated';
import AdminControlCard from '@/components/admin-page-comp/AdminControlCard';

// Mock the useGetCategoriesQuery hook
jest.mock('@/generated', () => ({
  useGetCategoriesQuery: jest.fn(),
}));

function createMockPointerEvent(type: string, props: PointerEventInit = {}): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? 'mouse',
  });
  return event;
}

// Assign the mock function to the global window object
window.PointerEvent = createMockPointerEvent as any;

// Mock HTMLElement methods
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

// Mock child components
jest.mock('@/components/admin-page-comp/adminmenupage/MenuAdd', () => {
  return function MockMenuAdd({ refetch }) {
    return (
      <button data-testid="menu-add-button" onClick={refetch}>
        Add Menu
      </button>
    );
  };
});

jest.mock('@/components/admin-page-comp/adminmenupage/DeleteCateDia', () => {
  return function MockDeleteCateDia({ cateId, refetch }) {
    return (
      <button data-testid={`delete-button-${cateId}`} onClick={() => refetch()}>
        Delete {cateId}
      </button>
    );
  };
});

jest.mock('@/components/admin-page-comp/adminmenupage/UpdateCateDia', () => {
  return function MockCateUpdateDia({ cateId, refetch }) {
    return (
      <button data-testid={`update-button-${cateId}`} onClick={() => refetch()}>
        Update {cateId}
      </button>
    );
  };
});

describe('AdminControlCard', () => {
  const mockCategories = {
    getCategories: [
      { id: 'cat1', categoryName: 'Category 1' },
      { id: 'cat2', categoryName: 'Category 2' },
    ],
  };

  beforeEach(() => {
    (useGetCategoriesQuery as jest.Mock).mockReturnValue({
      data: mockCategories,
      refetch: jest.fn(),
    });

    render(<AdminControlCard />);
  });

  it('renders the component correctly', () => {
    expect(screen.getByText('Цэс')).toBeInTheDocument();
    expect(screen.getByTestId('menu-add-button')).toBeInTheDocument();
  });

  it('displays categories correctly', () => {
    mockCategories.getCategories.forEach((category) => {
      expect(screen.getByText(category.categoryName)).toBeInTheDocument();
    });
  });

  it('calls refetch when adding a menu', () => {
    const refetchButton = screen.getByTestId('menu-add-button');
    fireEvent.click(refetchButton);
    expect(useGetCategoriesQuery().refetch).toHaveBeenCalled();
  });

  it('calls refetch when updating a category', () => {
    const updateButton = screen.getByTestId('update-button-cat1');
    fireEvent.click(updateButton);
    expect(useGetCategoriesQuery().refetch).toHaveBeenCalled();
  });

  it('calls refetch when deleting a category', () => {
    const deleteButton = screen.getByTestId('delete-button-cat1');
    fireEvent.click(deleteButton);
    expect(useGetCategoriesQuery().refetch).toHaveBeenCalled();
  });
});
