/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useCreateFoodMutation } from '@/generated';
import AdminFoodDialog from '@/components/admin-page-comp/AdminFoodDialog';

import { MockedProvider } from '@apollo/client/testing';

// Mock the generated hook
jest.mock('@/generated', () => ({
  useCreateFoodMutation: jest.fn(() => [jest.fn()]),
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
  const mockRefetch = jest.fn();

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

  it('renders the dialog trigger button', () => {
    render(<AdminFoodDialog refetch={mockRefetch} />);
    const triggerButton = screen.getByTestId('food-d-trig');
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveTextContent('Хоол');
  });

  it('opens dialog when trigger button is clicked', async () => {
    const user = userEvent.setup();
    render(<AdminFoodDialog refetch={mockRefetch} />);
    const triggerButton = screen.getByTestId('food-d-trig');
    await user.click(triggerButton);

    expect(screen.getByTestId('food-add-test')).toBeInTheDocument();
    expect(screen.getByText('Хоол нэмэх')).toBeInTheDocument();
  });

  it('handles form input changes correctly', async () => {
    render(<AdminFoodDialog refetch={mockRefetch} />);
    const triggerButton = screen.getByTestId('food-d-trig');
    await userEvent.click(triggerButton);

    const nameInput = screen.getByPlaceholderText('Хоолны нэр');
    const priceInput = screen.getByPlaceholderText('Үнэ');

    await userEvent.type(nameInput, 'Test Food');
    await userEvent.type(priceInput, '1000');

    expect(nameInput).toHaveValue('Test Food');
    expect(priceInput).toHaveValue('1000');
  });

  it('handles radio button selection correctly', async () => {
    render(<AdminFoodDialog refetch={mockRefetch} />);
    const triggerButton = screen.getByTestId('food-d-trig');
    await userEvent.click(triggerButton);

    const inactiveRadio = screen.getByLabelText('Идэвхигүй');
    await userEvent.click(inactiveRadio);
    expect(inactiveRadio).toBeChecked();
  });

  it('handles image upload correctly', async () => {
    const user = userEvent.setup();
    const mockImageUrl = 'https://example.com/image.jpg';
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ secure_url: mockImageUrl }),
      })
    );

    render(<AdminFoodDialog refetch={mockRefetch} />);
    const triggerButton = screen.getByTestId('food-d-trig');
    await user.click(triggerButton);

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Зураг нэмэх');

    await userEvent.upload(fileInput, file);

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

  it('submits form data correctly', async () => {
    const createFoodMock = jest.fn().mockResolvedValueOnce({ data: {} });
    (useCreateFoodMutation as jest.Mock).mockReturnValue([createFoodMock, { loading: false }]);

    // Mock fetch for image upload
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ secure_url: 'https://example.com/image.jpg' }),
    });

    render(<AdminFoodDialog refetch={mockRefetch} />);
    openDialog();

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Хоолны нэр'), {
      target: { value: 'Test Food' },
    });
    fireEvent.change(screen.getByPlaceholderText('Үнэ'), {
      target: { value: '1000' },
    });

    // Upload image
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Зураг нэмэх').querySelector('input[type="file"]');

    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    // Submit
    fireEvent.click(screen.getByText('Үүсгэх'));

    await waitFor(() => {
      expect(createFoodMock).toHaveBeenCalledWith({
        variables: {
          input: {
            foodName: 'Test Food',
            imageUrl: 'https://example.com/image.jpg',
            price: 1000,
            status: 'Идэвхитэй',
          },
        },
      });
      expect(window.alert).toHaveBeenCalledWith('Хоол амжилттай үүсгэгдлээ!');
    });
  });

  it('shows loading state during submission', async () => {
    const createFoodMock = jest.fn().mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));
    (useCreateFoodMutation as jest.Mock).mockReturnValue([createFoodMock, { loading: true }]);

    render(<AdminFoodDialog refetch={mockRefetch} />);
    openDialog();

    const submitButton = screen.getByTestId('uusgeh-btn');

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });

  it('handles form submission errors', async () => {
    const createFoodMock = jest.fn().mockRejectedValueOnce(new Error('Test error'));

    (useCreateFoodMutation as jest.Mock).mockReturnValue([createFoodMock, { loading: false, error: null }]);

    // Mock fetch for Cloudinary upload
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            secure_url: 'https://example.com/image.jpg',
          }),
      })
    ) as jest.Mock;

    process.env.NEXT_PUBLIC_CLOUDINARY_NAME = 'demo_cloud'; // Add this

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    render(<AdminFoodDialog refetch={mockRefetch} />);
    openDialog();

    // Upload file first
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Зураг нэмэх').querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    // Submit form
    fireEvent.click(screen.getByText('Үүсгэх'));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Failed to create food item');
    });

    alertMock.mockRestore();
  });

  it('handles empty file selection', () => {
    render(
      <MockedProvider>
        <AdminFoodDialog refetch={mockRefetch} />
      </MockedProvider>
    );

    // Open the dialog
    const triggerButton = screen.getByTestId('food-d-trig');
    fireEvent.click(triggerButton);

    const fileInput = screen.getByLabelText('Зураг нэмэх').querySelector('input[type="file"]') as HTMLInputElement;

    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [] } });
    }

    // Verify no preview image is shown
    expect(screen.queryByAltText('Preview')).not.toBeInTheDocument();
  });

  it('handles image file selection and preview', async () => {
    render(
      <MockedProvider>
        <AdminFoodDialog refetch={mockRefetch} />
      </MockedProvider>
    );

    // Open the dialog
    const triggerButton = screen.getByTestId('food-d-trig');
    fireEvent.click(triggerButton);

    // Create a mock file
    const file = new File(['dummy content'], 'test-image.png', { type: 'image/png' });

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      result: 'data:image/png;base64,mockImageData',
      onloadend: null,
    };
    global.FileReader = jest.fn(() => mockFileReader);

    // Get the file input and trigger change
    const fileInput = screen.getByLabelText('Зураг нэмэх') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Simulate FileReader load completion
    mockFileReader.onloadend();

    // Verify the preview image is displayed
    await waitFor(() => {
      const previewImage = screen.getByAltText('Preview');
      expect(previewImage).toBeInTheDocument();
      expect(previewImage).toHaveAttribute('src', 'data:image/png;base64,mockImageData');
    });
  });

  it('does not update preview when no file is selected', async () => {
    render(
      <MockedProvider>
        <AdminFoodDialog refetch={mockRefetch} />
      </MockedProvider>
    );

    // Open the dialog
    const triggerButton = screen.getByTestId('food-d-trig');
    fireEvent.click(triggerButton);

    // Get the file input and trigger change with no file
    const fileInput = screen.getByLabelText('Зураг нэмэх') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: null } });

    // Ensure preview image does not appear
    await waitFor(() => {
      const previewImage = screen.queryByAltText('Preview');
      expect(previewImage).not.toBeInTheDocument();
    });
  });

  it('handles file input when no file is selected', async () => {
    render(
      <MockedProvider>
        <AdminFoodDialog refetch={mockRefetch} />
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
        <AdminFoodDialog refetch={mockRefetch} />
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

  it('should not call setPreviewImage when no file is selected', () => {
    // Mock URL.createObjectURL
    const mockObjectURL = 'mock-object-url';
    global.URL.createObjectURL = jest.fn(() => mockObjectURL);

    // Render the component
    render(<AdminFoodDialog refetch={mockRefetch} />);

    // Simulate clicking the dialog trigger to open the dialog
    const dialogTrigger = screen.getByTestId('food-d-trig');
    fireEvent.click(dialogTrigger);

    // Simulate file input change event with no files
    const fileInput = screen.getByLabelText('Зураг нэмэх').querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [] } });
    }

    // Verify that URL.createObjectURL was not called
    expect(URL.createObjectURL).not.toHaveBeenCalled();

    // Verify that previewImage is not set
    const previewImage = screen.queryByTestId('preview-test');
    expect(previewImage).not.toBeInTheDocument();
  });
});
