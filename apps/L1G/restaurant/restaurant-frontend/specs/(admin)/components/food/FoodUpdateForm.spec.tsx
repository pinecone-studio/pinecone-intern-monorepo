/* eslint-disable */
import '@testing-library/jest-dom';
import { FoodUpdateForm } from '@/components/admin';
import { fireEvent, render, waitFor } from '@testing-library/react';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockDataProps = {
  foodName: 'Test1',
  price: '20000',
  foodStatus: 'Идэвхитэй',
  image: 'https://example.com/foodimage.jpg',
  category: {
    categoryId: '2',
    categoryName: 'Main dish',
  },
  onSubmit: jest.fn(),
  isSubmitting: false,
};

const mockDataPropsWithEmptyValues = {
  foodName: '',
  price: '',
  foodStatus: 'Идэвхитэй',
  image: '',
  category: {
    categoryId: '',
    categoryName: '',
  },
  onSubmit: jest.fn(),
  isSubmitting: false,
};

const mockUrl = 'blob:http://localhost/foodimage.png';
global.URL.createObjectURL = jest.fn().mockReturnValue(mockUrl);

describe('FoodUpdateForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { getByTestId } = render(<FoodUpdateForm {...mockDataProps} />);

    expect(getByTestId('food-update-foodName-input')).toBeInTheDocument();
    expect(getByTestId('food-status-active')).toBeInTheDocument();
    expect(getByTestId('food-update-image-input')).toBeInTheDocument();
    expect(getByTestId('food-update-category-select')).toBeInTheDocument();
    expect(getByTestId('food-update-price-input')).toBeInTheDocument();
    expect(getByTestId('food-update-submit-button')).toBeInTheDocument();
  });

  it('should render with empty props values', () => {
    const { getByTestId } = render(<FoodUpdateForm {...mockDataPropsWithEmptyValues} />);

    expect(getByTestId('food-update-foodName-input')).toBeInTheDocument();
    expect(getByTestId('food-status-active')).toBeInTheDocument();
    expect(getByTestId('food-update-image-input')).toBeInTheDocument();
    expect(getByTestId('food-update-category-select')).toBeInTheDocument();
    expect(getByTestId('food-update-price-input')).toBeInTheDocument();
    expect(getByTestId('food-update-submit-button')).toBeInTheDocument();
  });

  it('should handle empty file input', async () => {
    const { getByTestId, queryByTestId } = render(
      <FoodUpdateForm
        foodName={mockDataProps.foodName}
        price={mockDataProps.price}
        foodStatus={mockDataProps.foodStatus}
        category={mockDataProps.category}
        image=""
        onSubmit={mockDataProps.onSubmit}
        isSubmitting={mockDataProps.isSubmitting}
      />
    );

    const imageInput = getByTestId('food-update-image-input');
    expect(imageInput).toBeInTheDocument();
    expect(imageInput).toHaveAttribute('type', 'file');
    fireEvent.change(imageInput, {
      target: {
        files: null,
      },
    });

    expect(queryByTestId('food-update-image-preview')).not.toBeInTheDocument();
  });

  it('should clear file input value when image delete button is clicked', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    const { getByTestId } = render(<FoodUpdateForm {...mockDataProps} />);

    const initialImagePreview = getByTestId('food-update-image-preview');
    expect(initialImagePreview).toBeInTheDocument();
    fireEvent.click(getByTestId('food-update-image-delete-button'));

    await waitFor(() => {
      expect(initialImagePreview).not.toBeInTheDocument();
    });

    const imageInput = getByTestId('food-update-image-input') as HTMLInputElement;
    expect(imageInput).toBeInTheDocument();
    fireEvent.change(imageInput, {
      target: { files: [mockFile] },
    });

    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);
    expect(imageInput.files?.[0]).toBe(mockFile);

    const imagePreview = getByTestId('food-update-image-preview');
    await waitFor(() => expect(imagePreview).toBeInTheDocument());
    const imageDeleteButton = getByTestId('food-update-image-delete-button');

    fireEvent.click(imageDeleteButton);
    expect(imageDeleteButton).not.toBeInTheDocument();

    await waitFor(() => {
      expect(imagePreview).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(imageInput.value).toBe('');
    });
  });

  it('should prevent multiple submissions when isSubmitting is true', async () => {
    const { getByTestId } = render(
      <FoodUpdateForm
        foodName={mockDataProps.foodName}
        price={mockDataProps.price}
        foodStatus={mockDataProps.foodStatus}
        image={mockDataProps.image}
        category={mockDataProps.category}
        onSubmit={mockDataProps.onSubmit}
        isSubmitting={true}
      />
    );

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

    await waitFor(() => {
      expect(mockDataProps.onSubmit).toHaveBeenCalledTimes(0);
    });
  });
});
