import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { UploadImage } from '@/utils/ImageUpload';
import { toast } from 'sonner';
import { FoodUpdateDialog } from '@/components/admin/FoodUpdateDialog';
import { updateFoodErrorMock, updateFoodMock } from 'specs/utils/FoodsMockData';

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

jest.mock('@/utils/ImageUpload', () => ({
  UploadImage: jest.fn(),
}));

const mockUrl = 'blob:http://localhost/foodimage.png';
global.URL.createObjectURL = jest.fn().mockReturnValue(mockUrl);

const mockDataProps = {
  foodId: '2',
  foodName: 'Test',
  price: '15000',
  status: 'Идэвхитэй',
  image: 'https://example.com/foodimage.jpg',
  category: {
    categoryId: '2',
    categoryName: 'Main dish',
  },
  refetch: jest.fn(),
};

const mockDataPropsWithEmptyValues = {
  foodId: '2',
  foodName: '',
  price: '',
  status: 'Идэвхитэй',
  image: '',
  category: {
    categoryId: '',
    categoryName: '',
  },
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

  it('should set isSubmitting to false after form is submitted', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateFoodMock]} addTypename={false}>
        <FoodUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('food-update-dialog-open'));

    const dialogTitle = getByTestId('food-update-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const foodNameInput = getByTestId('food-update-foodName-input');
    const priceInput = getByTestId('food-update-price-input');
    const submitButton = getByTestId('food-update-submit-button');

    fireEvent.change(foodNameInput, { target: { value: '' } });
    fireEvent.change(foodNameInput, { target: { value: 'Test1' } });

    fireEvent.change(priceInput, { target: { value: '' } });
    fireEvent.change(priceInput, { target: { value: '20000' } });

    expect(submitButton).toHaveTextContent('Шинэчлэх');

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent('Шинэчилж байна...');
      },
      { timeout: 1000 }
    );

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await waitFor(
      () => {
        expect(queryByTestId('food-update-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should update food and closes the dialog', async () => {
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
    const activeStatusInput = getByTestId('food-update-status-active');
    const priceInput = getByTestId('food-update-price-input');
    const imageInput = getByTestId('food-update-image-input');
    const categorySelect = getByTestId('food-update-category-select');
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

    expect(categorySelect).toBeInTheDocument();
    expect(categorySelect).toHaveTextContent('Main dish');

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

    // screen.debug();

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

  it('should update food with existing image and closes the dialog', async () => {
    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={[updateFoodMock]} addTypename={false}>
        <FoodUpdateDialog {...mockDataProps} />
      </MockedProvider>
    );

    expect(getByTestId('food-update-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('food-update-dialog-open'));

    expect(getByTestId('food-update-dialog-title')).toBeInTheDocument();

    const foodNameInput = getByTestId('food-update-foodName-input');
    const activeStatusInput = getByTestId('food-update-status-active');
    const priceInput = getByTestId('food-update-price-input');
    const imageInput = getByTestId('food-update-image-input');
    const categorySelect = getByTestId('food-update-category-select');
    const submitButton = getByTestId('food-update-submit-button');

    fireEvent.change(foodNameInput, { target: { value: '' } });
    fireEvent.change(foodNameInput, { target: { value: 'Test1' } });
    expect(activeStatusInput).toBeChecked();

    const initialImagePreview = getByTestId('food-update-image-preview');
    expect(initialImagePreview).toBeInTheDocument();

    await waitFor(() => {
      expect(getByTestId('food-update-image-preview')).toBeInTheDocument();
    });

    expect(categorySelect).toBeInTheDocument();
    expect(categorySelect).toHaveTextContent('Main dish');

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
    const activeStatusInput = getByTestId('food-update-status-active');
    const priceInput = getByTestId('food-update-price-input');
    const imageInput = getByTestId('food-update-image-input');
    const categorySelect = getByTestId('food-update-category-select');
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

    expect(categorySelect).toBeInTheDocument();
    expect(categorySelect).toHaveTextContent('Main dish');

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

    await waitFor(
      () => {
        expect(queryByTestId('food-update-dialog-title')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
