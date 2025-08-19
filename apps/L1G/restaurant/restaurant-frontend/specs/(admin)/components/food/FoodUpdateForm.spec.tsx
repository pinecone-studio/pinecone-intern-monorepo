import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { FoodUpdateForm } from '@/components/admin/FoodUpdateForm';

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockDataProps = {
  foodName: 'test',
  price: '15000',
  status: 'Идэвхитэй',
  image: 'https://example.com/foodimage.jpg',
  category: {
    categoryId: '1',
    categoryName: 'Dessert',
  },
  onSubmit: jest.fn(),
  isSubmitting: false,
};

const mockDataPropsWithEmptyValues = {
  foodName: '',
  price: '',
  status: 'Идэвхитэй',
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
    expect(getByTestId('food-update-status-active')).toBeInTheDocument();
    expect(getByTestId('food-update-image-input')).toBeInTheDocument();
    expect(getByTestId('food-update-category-select')).toBeInTheDocument();
    expect(getByTestId('food-update-price-input')).toBeInTheDocument();
    expect(getByTestId('food-update-submit-button')).toBeInTheDocument();
  });

  it('should render with empty props values', () => {
    const { getByTestId } = render(<FoodUpdateForm {...mockDataPropsWithEmptyValues} />);

    expect(getByTestId('food-update-foodName-input')).toBeInTheDocument();
    expect(getByTestId('food-update-status-active')).toBeInTheDocument();
    expect(getByTestId('food-update-image-input')).toBeInTheDocument();
    expect(getByTestId('food-update-category-select')).toBeInTheDocument();
    expect(getByTestId('food-update-price-input')).toBeInTheDocument();
    expect(getByTestId('food-update-submit-button')).toBeInTheDocument();
  });

  it('should upload image when props image is undefined or empty', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });

    const { getByTestId } = render(
      <FoodUpdateForm
        foodName={mockDataProps.foodName}
        price={mockDataProps.price}
        status={mockDataProps.status}
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
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);

    const imagePreview = getByTestId('food-update-image-preview');
    await waitFor(() => expect(imagePreview).toBeInTheDocument());

    const foodImage = getByTestId('food-update-food-image');
    expect(foodImage).toBeInTheDocument();
  });

  it('should handle empty file input', async () => {
    const { getByTestId, queryByTestId } = render(
      <FoodUpdateForm
        foodName={mockDataProps.foodName}
        price={mockDataProps.price}
        status={mockDataProps.status}
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

  it('should delete uploaded image when button is clicked', async () => {
    const mockFile = new File(['foodimage'], 'foodimage.png', { type: 'image/png' });
    const { getByTestId, queryByTestId } = render(
      <FoodUpdateForm
        foodName={mockDataProps.foodName}
        price={mockDataProps.price}
        status={mockDataProps.status}
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
      target: { files: [mockFile] },
    });
    expect(URL.createObjectURL).toHaveBeenCalledWith(mockFile);

    const imagePreview = getByTestId('food-update-image-preview');
    await waitFor(() => expect(imagePreview).toBeInTheDocument());

    const foodImage = getByTestId('food-update-food-image');
    expect(foodImage).toBeInTheDocument();

    const imageDeleteButton = getByTestId('food-update-image-delete-button');
    expect(imageDeleteButton).toBeInTheDocument();
    fireEvent.click(imageDeleteButton);
    await waitFor(() => {
      expect(imagePreview).not.toBeInTheDocument();
    });
  });

  it('should delete props image when button is clicked', async () => {
    const { getByTestId } = render(<FoodUpdateForm {...mockDataProps} />);
    const imagePreview = getByTestId('food-update-image-preview');
    expect(imagePreview).toBeInTheDocument();

    const foodImage = getByTestId('food-update-food-image');
    expect(foodImage).toBeInTheDocument();

    const imageDeleteButton = getByTestId('food-update-image-delete-button');
    expect(imageDeleteButton).toBeInTheDocument();
    fireEvent.click(imageDeleteButton);
    await waitFor(() => {
      expect(imagePreview).not.toBeInTheDocument();
    });
  });

  it('should disables submit button and shows text when isSubmitting is true', async () => {
    const { getByTestId } = render(
      <FoodUpdateForm
        foodName="Test2"
        price="15000"
        status="Идэвхитэй"
        category={{ categoryId: '1', categoryName: 'Dessert' }}
        image="https://example.com/foodimage.jpg"
        onSubmit={jest.fn()}
        isSubmitting={true}
      />
    );

    const submitButton = getByTestId('food-update-submit-button');

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Шинэчилж байна...');
  });
});
