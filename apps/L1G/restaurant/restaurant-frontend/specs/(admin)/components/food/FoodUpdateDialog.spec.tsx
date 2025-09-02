/* eslint-disable */
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { UploadImage } from '@/utils/image-upload';
import { toast } from 'sonner';
import { FoodUpdateDialog } from '@/components/admin';
import { updateFoodErrorMock, updateFoodMock } from 'specs/utils/FoodMockData';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/utils/image-upload', () => ({
  UploadImage: jest.fn(),
}));

const mockUrl = 'blob:http://localhost/foodimage.png';
global.URL.createObjectURL = jest.fn().mockReturnValue(mockUrl);

const mockDataProps = {
  foodId: '2',
  foodName: 'Test1',
  price: '20000',
  foodStatus: 'Идэвхитэй',
  image: 'https://example.com/foodimage.jpg',
  refetch: jest.fn(),
};

describe('FoodUpdateDialog', () => {
  const mockUploadImage = UploadImage as jest.MockedFunction<typeof UploadImage>;
  beforeEach(() => {
    jest.clearAllMocks();
    mockUploadImage.mockResolvedValue('https://example.com/foodimage.jpg');
  });

  it('should render', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateFoodMock]} addTypename={false}>
        <FoodUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    expect(getByTestId('food-update-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('food-update-dialog-open'));

    expect(getByTestId('food-update-dialog-title')).toBeInTheDocument();
    expect(getByTestId('food-update-dialog-title')).toHaveTextContent('Хоол засах');
  });

  it('should closes dialog when close button is clicked', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateFoodMock]} addTypename={false}>
        <FoodUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('food-update-dialog-open'));

    const dialogTitle = getByTestId('food-update-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    fireEvent.click(getByTestId('food-update-dialog-close'));

    await waitFor(() => {
      expect(dialogTitle).not.toBeInTheDocument();
    });
  });

  it('should update food and show toast success', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateFoodMock]} addTypename={false}>
        <FoodUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    expect(getByTestId('food-update-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('food-update-dialog-open'));

    expect(getByTestId('food-update-dialog-title')).toBeInTheDocument();

    const foodNameInput = getByTestId('food-update-foodName-input');
    const activeStatusInput = getByTestId('food-status-active');
    const priceInput = getByTestId('food-update-price-input');
    const imageInput = getByTestId('food-update-image-input');
    const submitButton = getByTestId('food-update-submit-button');

    fireEvent.change(foodNameInput, { target: { value: '' } });
    fireEvent.change(foodNameInput, { target: { value: 'Test1' } });
    expect(activeStatusInput).toBeChecked();

    const initialImagePreview = getByTestId('food-update-image-preview');
    expect(initialImagePreview).toBeInTheDocument();

    const imageDeleteButton = getByTestId('food-update-image-delete-button');
    fireEvent.click(imageDeleteButton);
    await waitFor(() => {
      expect(queryByTestId('food-update-image-preview')).not.toBeInTheDocument();
    });

    fireEvent.change(imageInput, {
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
    await waitFor(() => {
      expect(getByTestId('food-update-image-preview')).toBeInTheDocument();
    });

    fireEvent.change(priceInput, { target: { value: '' } });
    fireEvent.change(priceInput, { target: { value: '20000' } });

    expect(submitButton).toHaveTextContent('Шинэчлэх');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(submitButton).toHaveTextContent('Шинэчилж байна...');
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith('Хоол амжилттай шинэчлэгдлээ!', {
          position: 'bottom-right',
        });
      },
      { timeout: 4000 }
    );

    await waitFor(
      () => {
        expect(queryByTestId('food-update-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should update food with existing image', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateFoodMock]} addTypename={false}>
        <FoodUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    expect(getByTestId('food-update-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('food-update-dialog-open'));

    expect(getByTestId('food-update-dialog-title')).toBeInTheDocument();

    const foodNameInput = getByTestId('food-update-foodName-input');
    const activeStatusInput = getByTestId('food-status-active');
    const priceInput = getByTestId('food-update-price-input');
    const submitButton = getByTestId('food-update-submit-button');

    fireEvent.change(foodNameInput, { target: { value: '' } });
    fireEvent.change(foodNameInput, { target: { value: 'Test1' } });
    expect(activeStatusInput).toBeChecked();

    const initialImagePreview = getByTestId('food-update-image-preview');
    expect(initialImagePreview).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('food-update-image-preview')).toBeInTheDocument();
    });

    fireEvent.change(priceInput, { target: { value: '' } });
    fireEvent.change(priceInput, { target: { value: '20000' } });

    expect(submitButton).toHaveTextContent('Шинэчлэх');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(submitButton).toHaveTextContent('Шинэчилж байна...');
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith('Хоол амжилттай шинэчлэгдлээ!', {
          position: 'bottom-right',
        });
      },
      { timeout: 4000 }
    );

    await waitFor(
      () => {
        expect(queryByTestId('food-update-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should show toast error and when food update fails', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateFoodErrorMock]} addTypename={false}>
        <FoodUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    expect(getByTestId('food-update-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('food-update-dialog-open'));

    expect(getByTestId('food-update-dialog-title')).toBeInTheDocument();

    const foodNameInput = getByTestId('food-update-foodName-input');
    const activeStatusInput = getByTestId('food-status-active');
    const priceInput = getByTestId('food-update-price-input');
    const imageInput = getByTestId('food-update-image-input');
    const submitButton = getByTestId('food-update-submit-button');

    fireEvent.change(foodNameInput, { target: { value: '' } });
    fireEvent.change(foodNameInput, { target: { value: 'Test3' } });
    expect(activeStatusInput).toBeChecked();

    const initialImagePreview = getByTestId('food-update-image-preview');
    expect(initialImagePreview).toBeInTheDocument();

    const imageDeleteButton = getByTestId('food-update-image-delete-button');
    fireEvent.click(imageDeleteButton);
    await waitFor(() => {
      expect(queryByTestId('food-update-image-preview')).not.toBeInTheDocument();
    });

    fireEvent.change(imageInput, {
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
    await waitFor(() => {
      expect(getByTestId('food-update-image-preview')).toBeInTheDocument();
    });

    fireEvent.change(priceInput, { target: { value: '' } });
    fireEvent.change(priceInput, { target: { value: '20000' } });

    expect(submitButton).toHaveTextContent('Шинэчлэх');
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(submitButton).toHaveTextContent('Шинэчилж байна...');
      },
      { timeout: 1000 }
    );

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith('Хоол шинэчлэхэд алдаа гарлаа!', {
          position: 'bottom-right',
        });
      },
      { timeout: 4000 }
    );

    expect(getByTestId('food-update-dialog-title')).toBeInTheDocument();
  });

  it('should prevent multiple submissions when isSubmitting is true', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateFoodMock]} addTypename={false}>
        <FoodUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('food-update-dialog-open'));

    const foodNameInput = getByTestId('food-update-foodName-input');
    const priceInput = getByTestId('food-update-price-input');
    const submitButton = getByTestId('food-update-submit-button');

    fireEvent.change(foodNameInput, { target: { value: '' } });
    fireEvent.change(foodNameInput, { target: { value: 'Test1' } });
    fireEvent.change(priceInput, { target: { value: '' } });
    fireEvent.change(priceInput, { target: { value: '20000' } });

    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(mockDataProps.refetch).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );
  });
});
