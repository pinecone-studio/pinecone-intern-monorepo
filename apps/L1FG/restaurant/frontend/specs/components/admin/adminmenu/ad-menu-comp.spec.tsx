/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminMenuPageComp from '@/components/admin-page-comp/AdminMenuPageComp';
import userEvent from '@testing-library/user-event';
// Mock the AdminProductCard and AdminControlCard components
jest.mock('@/components/admin-page-comp/AdminProductCard', () => {
  return function MockAdminProductCard() {
    return <div data-testid="admin-product-card">Product Card</div>;
  };
});

jest.mock('@/components/admin-page-comp/AdminControlCard', () => {
  return function MockAdminControlCard() {
    return <div data-testid="admin-control-card">Control Card</div>;
  };
});

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

describe('AdminMenuPageComp', () => {
  beforeEach(() => {
    render(<AdminMenuPageComp />);
  });

  it('renders the component correctly', () => {
    expect(screen.getByText('Цэсний бүтээгдэхүүн')).toBeInTheDocument();
    expect(screen.getByText('Цэс удирдах')).toBeInTheDocument();
  });

  it('renders the AdminProductCard when the products tab is active', () => {
    expect(screen.getByTestId('admin-product-card')).toBeInTheDocument();
    expect(screen.queryByTestId('admin-control-card')).not.toBeInTheDocument();
  });

  it('renders the AdminControlCard when the control tab is active', async () => {
    const user = userEvent.setup();
    const controlTab = screen.getByText('Цэс удирдах');
    user.click(controlTab);
    await waitFor(() => {
      expect(screen.getByTestId('admin-control-card')).toBeInTheDocument();
      expect(screen.queryByTestId('admin-product-card')).not.toBeInTheDocument();
    });
  });

  it('should have the correct background color for active tabs', () => {
    const productTab = screen.getByText('Цэсний бүтээгдэхүүн');
    const controlTab = screen.getByText('Цэс удирдах');

    // Check initial background color for the products tab
    expect(productTab).toHaveClass('bg-[#F4F4F5]');

    // Click the control tab
    fireEvent.click(controlTab);

    // Check that the control tab has the correct background color
    expect(controlTab).toHaveClass('bg-[#F4F4F5]');
  });
});
