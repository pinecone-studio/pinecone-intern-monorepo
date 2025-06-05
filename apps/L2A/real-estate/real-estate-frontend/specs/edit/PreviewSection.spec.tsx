/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PreviewSection from '@/app/user-listing/edit/_components/PreviewSection';
jest.mock('@/app/_components/ListingPreviewCard', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="mock-preview-card">
      <div>{props.title}</div>
      <div>{props.price}</div>
    </div>
  ),
}));
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
describe('PreviewSection', () => {
  const defaultValues = {
    images: [],
    price: '100000000',
    title: 'Test Title',
    size: 120,
    totalRooms: '3',
    restrooms: '1',
    location: {
      district: 'Сүхбаатар',
      city: '1-р хороо',
      address: 'UB tower',
    },
  };
  const mockSubmitForm = jest.fn();
  const toast = require('sonner').toast;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, 'setItem').mockRestore(); 
  });

  const mockUseFormikContext = (values = defaultValues, submitForm = mockSubmitForm) => {
    jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({
      values,
      submitForm,
    });
  };
  it('renders correctly with form values and preview card', () => {
    mockUseFormikContext();
    render(<PreviewSection draftKey="test-draft" />);
    expect(screen.getByTestId('preview-section')).toBeInTheDocument();
    expect(screen.getByText('Хэрэглэгчдэд харагдах')).toBeInTheDocument();
    expect(screen.getByTestId('mock-preview-card')).toBeInTheDocument();
    expect(screen.getByText(defaultValues.title)).toBeInTheDocument();
    expect(screen.getByText(`${defaultValues.price}₮`)).toBeInTheDocument();
  });
  it('calls submitForm on submit button click', () => {
    mockUseFormikContext();
    render(<PreviewSection draftKey="test-draft" />);
    fireEvent.click(screen.getByTestId('submit-post-button'));
    expect(mockSubmitForm).toHaveBeenCalled();
  });
  it('saves to localStorage and shows success toast', () => {
    mockUseFormikContext();
    render(<PreviewSection draftKey="test-draft" />);
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    fireEvent.click(screen.getByTestId('save-post-button'));
    expect(setItemSpy).toHaveBeenCalledWith('test-draft', JSON.stringify(defaultValues));
    expect(toast.success).toHaveBeenCalledWith(
      'Амжилттай хадгалагдлаа',
      expect.objectContaining({
        description: 'Таны засвар ноорог болгон хадгалагдлаа.',
      })
    );
  });
  it('handles localStorage error and shows error toast', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage error');
    });
    mockUseFormikContext();
    render(<PreviewSection draftKey="test-draft" />);
    fireEvent.click(screen.getByTestId('save-post-button'));
    expect(toast.error).toHaveBeenCalledWith(
      'Алдаа гарлаа',
      expect.objectContaining({
        description: 'Засвар хадгалахад алдаа гарлаа.',
      })
    );
  })
  it('renders fallback values when form values are empty', () => {
    const fallbackValues = {
      images: [],
      price: '',
      title: '',
      size: '',
      totalRooms: '',
      restrooms: '',
      location: {
        district: '',
        city: '',
        address: '',
      },
    };
    mockUseFormikContext(fallbackValues);

    render(<PreviewSection draftKey="draft-fallback-test" />);
    expect(screen.getByText('Гарчиг оруулаагүй')).toBeInTheDocument();
    expect(screen.getByText('₮')).toBeInTheDocument();
  });

  it('uses custom images if images array is non-empty', () => {
    const valuesWithImages = {
      ...defaultValues,
      images: ['custom-image.jpg'],
    };
    mockUseFormikContext(valuesWithImages);

    render(<PreviewSection draftKey="test-image" />);
    expect(screen.getByTestId('mock-preview-card')).toBeInTheDocument();
    expect(screen.getByText(defaultValues.title)).toBeInTheDocument();
  });

  describe('Delete dialog', () => {
    beforeEach(() => {
      mockUseFormikContext();
      render(<PreviewSection draftKey="test-draft" />);
    });

    it('opens dialog when delete button is clicked', () => {
      fireEvent.click(screen.getByTestId('delete-post-button'));
      expect(screen.getByTestId('delete-confirm-modal')).toBeVisible();
      expect(screen.getByText('Та устгахдаа итгэлтэй байна уу?')).toBeInTheDocument();
    });

   it('closes dialog when cancel button is clicked', () => {
  fireEvent.click(screen.getByTestId('delete-post-button'));
  expect(screen.getByTestId('delete-confirm-modal')).toBeVisible();

  fireEvent.click(screen.getByTestId('cancel-delete-button'));
  expect(screen.queryByTestId('delete-confirm-modal')).toBeNull();
});

it('closes dialog when confirm delete button is clicked', () => {
  fireEvent.click(screen.getByTestId('delete-post-button'));
  expect(screen.getByTestId('delete-confirm-modal')).toBeVisible();

  fireEvent.click(screen.getByTestId('confirm-delete-button'));
  expect(screen.queryByTestId('delete-confirm-modal')).toBeNull(); 
});

  });
});
