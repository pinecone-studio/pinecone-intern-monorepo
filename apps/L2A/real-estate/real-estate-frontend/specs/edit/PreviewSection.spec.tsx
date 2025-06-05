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

  it('calls submitForm when submit button is clicked', () => {
    const submitForm = jest.fn();

    jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({values: defaultValues,submitForm,});
    render(<PreviewSection draftKey="test-draft" />);
    fireEvent.click(screen.getByTestId('submit-post-button'));
    expect(submitForm).toHaveBeenCalled(); 
  });

  it('renders preview section and shows card with correct values', () => {
    jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({values: defaultValues,submitForm: jest.fn(),});
    render(<PreviewSection draftKey="test-draft" />);
    expect(screen.getByTestId('mock-preview-card')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('100000000₮')).toBeInTheDocument();
  });

  it('saves to localStorage and calls toast.success', () => {
    const { toast } = require('sonner');
    jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({values: defaultValues,submitForm: jest.fn(),});
    render(<PreviewSection draftKey="test-draft" />);
    fireEvent.click(screen.getByTestId('save-post-button'));
    expect(localStorage.getItem('test-draft')).not.toBeNull();
    expect(toast.success).toHaveBeenCalledWith('Амжилттай хадгалагдлаа', expect.any(Object));
  });

  it('handles localStorage error and calls toast.error', () => {
    const { toast } = require('sonner');
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {throw new Error('storage error');});
    jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({values: defaultValues,submitForm: jest.fn(),});
    render(<PreviewSection draftKey="test-draft" />);
    fireEvent.click(screen.getByTestId('save-post-button'));
    expect(toast.error).toHaveBeenCalledWith('Алдаа гарлаа', expect.any(Object));
  });

  it('renders preview section wrapper (line 33-55 coverage)', () => {
  const mockValues = {
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
  jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({values: mockValues, submitForm: jest.fn(),});
  render(<PreviewSection draftKey="test-draft" />);
  expect(screen.getByTestId('preview-section')).toBeInTheDocument();
});

it('renders fallback values for ListingPreviewCard props', () => {
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
  jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({values: fallbackValues,submitForm: jest.fn(),});
  render(<PreviewSection draftKey="draft-fallback-test" />);
  expect(screen.getByTestId('mock-preview-card')).toBeInTheDocument();
  expect(screen.getByText('Гарчиг оруулаагүй')).toBeInTheDocument(); 
  expect(screen.getByText('₮')).toBeInTheDocument(); 
});

it('uses provided image when values.images has items', () => {
  const valuesWithImage = {
    images: ['custom-image.jpg'],
    price: '999999',
    title: 'Custom Title',
    size: 100,
    totalRooms: '2',
    restrooms: '1',
    location: {
      district: 'Баянзүрх',
      city: '2-р хороо',
      address: 'Peace Avenue',
    },
  };

  jest.spyOn(require('formik'), 'useFormikContext').mockReturnValue({values: valuesWithImage,submitForm: jest.fn(),});
  render(<PreviewSection draftKey="test-image-cover" />);
  expect(screen.getByText('Custom Title')).toBeInTheDocument();
  expect(screen.getByText('999999₮')).toBeInTheDocument();
});
});
