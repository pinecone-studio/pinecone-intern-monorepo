import { render, screen, fireEvent } from '@testing-library/react';
import PreviewSection from '@/app/user-listing/edit/_components/PreviewSection';
import '@testing-library/jest-dom';

describe('PreviewSection', () => {
  it('renders preview section correctly', () => {
    render(<PreviewSection />);

expect(screen.getByRole('heading', { name: /Хэрэглэгчдэд харагдах/i })).toBeInTheDocument();
expect(screen.getByText(/Таны оруулсан мэдээлэл хэрэглэгчдэд/i)).toBeInTheDocument();

    expect(screen.getByTestId('listing-preview-card')).toBeInTheDocument();
    expect(screen.getByTestId('submit-post-button')).toBeInTheDocument();
    expect(screen.getByTestId('save-post-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-post-button')).toBeInTheDocument();
  });

  it('opens delete confirmation dialog when clicking delete', () => {
    render(<PreviewSection />);

    fireEvent.click(screen.getByTestId('delete-post-button'));

    expect(screen.getByTestId('delete-confirm-modal')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-delete-button')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-delete-button')).toBeInTheDocument();
    expect(screen.getByText(/Та устгахдаа итгэлтэй байна уу/i)).toBeInTheDocument();
  });

  it('closes delete dialog when clicking cancel', () => {
    render(<PreviewSection />);

    fireEvent.click(screen.getByTestId('delete-post-button'));
    fireEvent.click(screen.getByTestId('cancel-delete-button'));
    expect(screen.queryByTestId('delete-confirm-modal')).not.toBeInTheDocument();
  });

  it('closes delete dialog when clicking confirm delete', () => {
    render(<PreviewSection />);

    fireEvent.click(screen.getByTestId('delete-post-button'));
    fireEvent.click(screen.getByTestId('confirm-delete-button'));
    expect(screen.queryByTestId('delete-confirm-modal')).not.toBeInTheDocument();

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

