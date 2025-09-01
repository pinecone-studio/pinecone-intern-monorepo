/* eslint max-lines: "off" */
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CreateFoodDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { UploadImage } from '@/utils/ImageUpload';
import { toast } from 'sonner';
import { FoodCreateDialog } from '@/components/admin';

beforeAll(() => {
  /* eslint-disable @typescript-eslint/no-empty-function */
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  /* eslint-enable @typescript-eslint/no-empty-function */
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

const createFoodMock: MockedResponse = {
  request: {
    query: CreateFoodDocument,
    variables: {
      input: {
        foodName: 'test',
        price: '200',
        foodStatus: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
      },
    },
  },
  result: {
    data: {
      createFood: {
        foodId: '1',
        foodName: 'test',
        price: '200',
        foodStatus: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
        category: {
          categoryId: '1',
          categoryName: 'Dessert',
        },
      },
    },
  },
};

const createFoodErrorMock: MockedResponse = {
  request: {
    query: CreateFoodDocument,
    variables: {
      input: {
        foodName: 'test',
        price: '200',
        foodStatus: 'Идэвхитэй',
        image: 'https://example.com/foodimage.jpg',
      },
    },
  },
  error: new Error('Network error'),
};

const mockUrl = 'blob:http://localhost/foodimage.png';
global.URL.createObjectURL = jest.fn().mockReturnValue(mockUrl);

const mockDataProps = {
  refetch: jest.fn(),
};

describe('FoodCreateDialog', () => {
  const mockUploadImage = UploadImage as jest.MockedFunction<typeof UploadImage>;

  beforeEach(() => {
    mockUploadImage.mockResolvedValue('https://example.com/foodimage.jpg');
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const { getByTestId, findByTestId } = render(
      <MockedProvider mocks={[createFoodMock]}>
        <FoodCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    const dialogOpen = getByTestId('create-food-dialog-open');
    expect(dialogOpen).toBeInTheDocument();
    fireEvent.click(dialogOpen);

    const dialogTitle = await findByTestId('create-food-dialog-title');
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogTitle).toHaveTextContent('Хоол нэмэх');
  });

  it('should closes dialog when close button is clicked', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createFoodMock]}>
        <FoodCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('create-food-dialog-open'));
    const dialogTitle = getByTestId('create-food-dialog-title');
    const dialogClose = getByTestId('create-food-dialog-close');

    expect(dialogTitle).toBeInTheDocument();

    fireEvent.click(dialogClose);
    await waitFor(() => {
      expect(dialogTitle).not.toBeInTheDocument();
    });
  });

  it('should upload image', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    const { getByTestId } = render(
      <MockedProvider mocks={[createFoodMock]}>
        <FoodCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );
    expect(getByTestId('create-food-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('create-food-dialog-open'));

    const imageInput = getByTestId('create-food-image-input');
    expect(imageInput).toBeInTheDocument();
    expect(imageInput).toHaveAttribute('type', 'file');
    fireEvent.change(imageInput, {
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);

    const imagePreview = getByTestId('create-food-image-preview');
    await waitFor(() => expect(imagePreview).toBeInTheDocument());

    const foodImage = getByTestId('create-food-food-image');
    expect(foodImage).toBeInTheDocument();
  });

  it('should handle empty file input', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createFoodMock]}>
        <FoodCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );
    expect(getByTestId('create-food-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('create-food-dialog-open'));

    const imageInput = getByTestId('create-food-image-input');
    expect(imageInput).toBeInTheDocument();
    expect(imageInput).toHaveAttribute('type', 'file');
    fireEvent.change(imageInput, {
      target: {
        files: null,
      },
    });

    expect(screen.queryByTestId('create-food-image-preview')).not.toBeInTheDocument();
  });

  it('should delete uploaded image when button is clicked', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    const { getByTestId } = render(
      <MockedProvider mocks={[createFoodMock]}>
        <FoodCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );
    expect(getByTestId('create-food-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('create-food-dialog-open'));

    const imageInput = getByTestId('create-food-image-input');
    expect(imageInput).toBeInTheDocument();
    expect(imageInput).toHaveAttribute('type', 'file');
    fireEvent.change(imageInput, {
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);

    const imagePreview = getByTestId('create-food-image-preview');
    await waitFor(() => expect(imagePreview).toBeInTheDocument());

    const foodImage = getByTestId('create-food-food-image');
    expect(foodImage).toBeInTheDocument();

    const imageDeleteButton = getByTestId('create-food-image-delete-button');
    expect(imageDeleteButton).toBeInTheDocument();
    fireEvent.click(imageDeleteButton);
    await waitFor(() => {
      expect(imagePreview).not.toBeInTheDocument();
    });
  });

  it('should create new food and show toast success', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <MockedProvider mocks={[createFoodMock]}>
        <FoodCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    expect(getByTestId('create-food-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('create-food-dialog-open'));

    const dialogTitle = getByTestId('create-food-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const foodNameInput = getByPlaceholderText('Хоолны нэр');
    const statusInput = getByTestId('food-status-active');
    const priceInput = getByPlaceholderText('Үнэ');
    const imageInput = getByTestId('create-food-image-input');
    const submitButton = getByTestId('create-food-submit-button');

    fireEvent.change(foodNameInput, { target: { value: 'test' } });
    expect(statusInput).toBeChecked();
    fireEvent.change(imageInput, {
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
    await waitFor(() => {
      expect(screen.getByTestId('create-food-image-preview')).toBeInTheDocument();
    });

    fireEvent.change(priceInput, { target: { value: '200' } });

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(queryByTestId('create-food-dialog-title')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(toast.success).toHaveBeenCalledWith('Хоол амжилттай үүслээ!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });

  it('should show toast error when an error is thrown', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    const { getByTestId, getByPlaceholderText } = render(
      <MockedProvider mocks={[createFoodErrorMock]}>
        <FoodCreateDialog refetch={mockDataProps.refetch} />
      </MockedProvider>
    );

    expect(getByTestId('create-food-dialog-open')).toBeInTheDocument();
    fireEvent.click(getByTestId('create-food-dialog-open'));

    const dialogTitle = getByTestId('create-food-dialog-title');
    expect(dialogTitle).toBeInTheDocument();

    const foodNameInput = getByPlaceholderText('Хоолны нэр');
    const statusInput = getByTestId('food-status-active');
    const priceInput = getByPlaceholderText('Үнэ');
    const imageInput = getByTestId('create-food-image-input');
    const submitButton = getByTestId('create-food-submit-button');

    fireEvent.change(foodNameInput, { target: { value: 'test' } });
    expect(statusInput).toBeChecked();
    fireEvent.change(imageInput, {
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
    await waitFor(() => {
      expect(screen.getByTestId('create-food-image-preview')).toBeInTheDocument();
    });

    fireEvent.change(priceInput, { target: { value: '200' } });

    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith('Хоол үүсгэхэд алдаа гарлаа!', {
          position: 'bottom-right',
        });
      },
      { timeout: 3000 }
    );
  });
});
