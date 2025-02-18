/*eslint-disable*/

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useUpdateFoodMutation } from '@/generated';
import AdminFoodUpdateDialog from '@/components/admin-page-comp/AdminFoodUpdateDialog';

// Mock the generated hook
jest.mock('@/generated', () => ({
  useUpdateFoodMutation: jest.fn(() => [jest.fn()]),
}));
jest.mock('../../../src/components/utils/upload', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
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
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Assign the mock function to the global window object
window.PointerEvent = createMockPointerEvent as any;

// Mock HTMLElement methods
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

describe('AdminFoodUpdateDialog Component', () => {
  const mockFood = {
    foodId: 'food-123',
    foodName: 'Test Food',
    price: '10.99',
    status: 'Идэвхитэй',
    imageUrl: 'https://example.com/test-food.jpg',
  };

  const mockUpdateFoodMutation = jest.fn();
  const mockSetIsOpen = jest.fn();

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
    (useUpdateFoodMutation as jest.Mock).mockReturnValue([mockUpdateFoodMutation, { loading: false }]);

    // Mock Dialog implementation to control open state
  });

  test('renders dialog trigger correctly', async () => {
    const user = userEvent.setup();
    render(<AdminFoodUpdateDialog food={mockFood} />);
    const triggerButton = screen.getByTestId('up-dialog-trigger');

    expect(triggerButton).toBeInTheDocument();
  });

  test('opens dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<AdminFoodUpdateDialog food={mockFood} />);
    const triggerElement = screen.getByTestId('up-dialog-trigger');

    await user.click(triggerElement);

    expect(screen.getByText('Хоол засах')).toBeInTheDocument();
  });

  test('shows food data in form fields', () => {
    render(<AdminFoodUpdateDialog food={mockFood} />);

    // First let's open the dialog
    const triggerElement = screen.getByTestId('up-dialog-trigger');
    fireEvent.click(triggerElement);

    // Check form fields have correct initial values
    const nameInput = screen.getByPlaceholderText('Хоолны нэр');
    const priceInput = screen.getByPlaceholderText('Үнэ');
    const activeRadio = screen.getByLabelText('Идэвхитэй');

    expect(nameInput).toHaveValue(mockFood.foodName);
    expect(priceInput).toHaveValue(mockFood.price);
    expect(activeRadio).toBeChecked();
  });

  test('updates form values on input change', async () => {
    render(<AdminFoodUpdateDialog food={mockFood} />);

    // First let's open the dialog
    const triggerElement = screen.getByTestId('up-dialog-trigger');
    fireEvent.click(triggerElement);

    // Get form fields
    const nameInput = screen.getByPlaceholderText('Хоолны нэр');
    const priceInput = screen.getByPlaceholderText('Үнэ');
    const inactiveRadio = screen.getByLabelText('Идэвхигүй');

    // Update form values
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Food Name');

    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '15.99');

    await userEvent.click(inactiveRadio);

    // Check updated values
    expect(nameInput).toHaveValue('Updated Food Name');
    expect(priceInput).toHaveValue('15.99');
    expect(inactiveRadio).toBeChecked();
  });

  it('handles image upload correctly', async () => {
    const mockImageUrl = 'https://example.com/image.jpg';
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ secure_url: mockImageUrl }),
      })
    );

    render(<AdminFoodUpdateDialog food={mockFood} />);
    const triggerElement = screen.getByTestId('up-dialog-trigger');
    fireEvent.click(triggerElement);

    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Зураг нэмэх');

    await userEvent.upload(fileInput, file);

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

  // After upload completes, the preview image should be shown

  test('submits form with updated data', async () => {
    // Mock the mutation
    const updateFoodMock = jest.fn().mockResolvedValueOnce({ data: {} });
    (useUpdateFoodMutation as jest.Mock).mockReturnValue([updateFoodMock, { loading: false }]);

    // Mock fetch with a spy to see if it's called
    const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ secure_url: 'https://example.com/image.jpg' }),
      } as Response)
    );

    // Mock alert
    jest.spyOn(window, 'alert').mockImplementation(jest.fn());

    // Add a console log spy to help debug
    const consoleLogSpy = jest.spyOn(console, 'log');

    render(<AdminFoodUpdateDialog food={mockFood} />);

    // Open dialog
    const triggerElement = screen.getByTestId('up-dialog-trigger');
    fireEvent.click(triggerElement);

    // Wait for dialog to be visible
    await screen.findByRole('dialog');

    // Add debug logging to see what elements we find
    console.log('Dialog opened, form elements:', {
      nameInput: screen.getByPlaceholderText('Хоолны нэр'),
      priceInput: screen.getByPlaceholderText('Үнэ'),
      fileInput: screen.queryByTestId('file-input'),
    });

    // Update form values
    fireEvent.change(screen.getByPlaceholderText('Хоолны нэр'), {
      target: { value: 'Updated Food Name' },
    });

    fireEvent.change(screen.getByPlaceholderText('Үнэ'), {
      target: { value: '15.99' },
    });

    // Try to find the file input in different ways
    const fileInputByTestId = screen.queryByTestId('file-input');
    const fileInputByLabel = screen.queryByLabelText('Зураг нэмэх')?.querySelector('input[type="file"]');
    const allFileInputs = document.querySelectorAll('input[type="file"]');

    console.log('File inputs found:', {
      byTestId: fileInputByTestId,
      byLabel: fileInputByLabel,
      allFileInputs: Array.from(allFileInputs).map((el) => el.outerHTML),
    });

    // Use whatever file input we can find
    const fileInput = fileInputByTestId || fileInputByLabel || allFileInputs[0];

    if (fileInput) {
      const file = new File(['test'], 'test.png', { type: 'image/png' });
      console.log('Attempting file upload with', fileInput);
      fireEvent.change(fileInput, { target: { files: [file] } });

      // Add a small delay to allow any event handlers to fire
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log('Fetch spy called:', fetchSpy.mock.calls.length > 0);
    } else {
      console.log('No file input found!');
    }

    // Set status
    const inactiveRadio = screen.getByLabelText('Идэвхигүй');
    fireEvent.click(inactiveRadio);

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Шинэчлэх/i });
    console.log('Submitting form with button:', submitButton);
    fireEvent.click(submitButton);

    // Check for the mutation call
    await waitFor(
      () => {
        console.log('Update mutation called:', updateFoodMock.mock.calls.length > 0);
        if (updateFoodMock.mock.calls.length > 0) {
          console.log('Mutation args:', JSON.stringify(updateFoodMock.mock.calls[0][0]));
        }
        expect(updateFoodMock).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );

    // Check how we're handling the image
    let mutationArgs;
    if (updateFoodMock.mock.calls.length > 0) {
      mutationArgs = updateFoodMock.mock.calls[0][0];
    }

    console.log('Final test state:', {
      fetchCalled: fetchSpy.mock.calls.length > 0,
      updateMutationCalled: updateFoodMock.mock.calls.length > 0,
      imageUrl: mutationArgs?.variables?.input?.imageUrl,
    });
  });
  test('shows loading state during submission', async () => {
    // Make the mutation take some time to resolve
    mockUpdateFoodMutation.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    render(<AdminFoodUpdateDialog food={mockFood} />);

    // Open dialog
    const triggerElement = screen.getByTestId('up-dialog-trigger');
    fireEvent.click(triggerElement);

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Шинэчлэх/i });
    fireEvent.click(submitButton);

    // Check loading state

    expect(submitButton).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
      expect(mockUpdateFoodMutation).toHaveBeenCalled();
    });
  });

  it('handles file input when no file is selected', async () => {
    render(<AdminFoodUpdateDialog food={mockFood} />);

    // Open the dialog
    const triggerElement = screen.getByTestId('up-dialog-trigger');
    fireEvent.click(triggerElement);

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

  it('does not update preview when no file is selected', async () => {
    render(<AdminFoodUpdateDialog food={mockFood} />);

    // Open the dialog
    const triggerElement = screen.getByTestId('up-dialog-trigger');
    fireEvent.click(triggerElement);

    // Get the file input and trigger change with no file
    const fileInput = screen.getByLabelText('Зураг нэмэх') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: null } });

    // Ensure preview image does not appear
    await waitFor(() => {
      const previewImage = screen.queryByAltText('Preview');
      expect(previewImage).not.toBeInTheDocument();
    });
  });
});
