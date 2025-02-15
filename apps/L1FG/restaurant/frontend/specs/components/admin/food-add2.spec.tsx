/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useCreateFoodMutation } from '@/generated';
import AdminFoodDialog from '@/components/admin-page-comp/AdminFoodDialog';
import { ApolloProvider } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';

// Mock the generated hook
jest.mock('@/generated', () => ({
  useCreateFoodMutation: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
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
// Mock environment variables
process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = 'test_preset';
process.env.NEXT_PUBLIC_CLOUDINARY_NAME = 'test_cloud';

describe('AdminFoodDialog', () => {
  const mockCreateFood = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            secure_url: 'https://example.com/image.jpg',
          }),
      })
    ) as jest.Mock;
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    (useCreateFoodMutation as jest.Mock).mockReturnValue([mockCreateFood, { loading: false }]);
  });

  const openDialog = () => {
    const triggerButton = screen.getByTestId('food-d-trig');
    fireEvent.click(triggerButton);
  };

  it('handles file input when no file is selected', async () => {
    render(
      <MockedProvider>
        <AdminFoodDialog />
      </MockedProvider>
    );

    // Open the dialog
    const triggerButton = screen.getByTestId('food-d-trig');
    fireEvent.click(triggerButton);

    // Find file input and trigger change with no file
    const fileInput = screen.getByLabelText('Зураг нэмэх').querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [] } });
    }

    // Verify no preview image is shown
    expect(screen.queryByTestId('preview-test')).not.toBeInTheDocument();

    // Try with null files
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: null } });
    }

    // Verify still no preview image
    expect(screen.queryByTestId('preview-test')).not.toBeInTheDocument();
  });

  it('handles file input with undefined files property', async () => {
    render(
      <MockedProvider>
        <AdminFoodDialog />
      </MockedProvider>
    );

    // Open the dialog
    const triggerButton = screen.getByTestId('food-d-trig');
    fireEvent.click(triggerButton);

    // Find file input
    const fileInput = screen.getByLabelText('Зураг нэмэх').querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
       fireEvent.change(fileInput, { target: {} });
    }

    // Verify no preview image is shown
    expect(screen.queryByTestId('preview-test')).not.toBeInTheDocument();
  });
});
