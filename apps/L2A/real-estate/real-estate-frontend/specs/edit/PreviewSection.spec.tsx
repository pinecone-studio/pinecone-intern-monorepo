/* eslint-disable max-lines */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFormikContext } from 'formik';
import { useRouter } from 'next/navigation';
import { useDeletePostByIdMutation } from '@/generated';
import { toast } from 'sonner';
import PreviewSection from '@/app/user-listing/edit/_components/PreviewSection';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} src={props.src} />;
  },
}));

jest.mock('formik');
jest.mock('next/navigation');
jest.mock('@/generated');
jest.mock('sonner');

const mockUseFormikContext = useFormikContext as jest.MockedFunction<typeof useFormikContext>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseDeletePostByIdMutation = useDeletePostByIdMutation as jest.MockedFunction<typeof useDeletePostByIdMutation>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('PreviewSection', () => {
  const mockValues = {
    id: '123',
    _id: '123',
    images: ['/image1.jpg', '/image2.jpg'], 
    price: '100000',
    title: 'Test Title',
    size: '50',
    totalRooms: '2',
    restrooms: '1',
    location: {
      district: 'District',
      city: 'City',
      address: 'Address'
    }
  };

  const mockSubmitForm = jest.fn();
  const mockPush = jest.fn();
  const mockDeletePost = jest.fn();

  beforeEach(() => {
    mockUseFormikContext.mockReturnValue({
      values: mockValues,
      submitForm: mockSubmitForm,
    } as any);

    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as any);

    mockUseDeletePostByIdMutation.mockReturnValue([
      mockDeletePost,
      { loading: false, error: null, data: null }
    ]);

    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
  });

  it('renders correctly with provided values', () => {
    render(<PreviewSection draftKey="test-draft" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('100000₮')).toBeInTheDocument();
    expect(screen.getByText('District, City, Address')).toBeInTheDocument();
  });

  it('renders with default values when some fields are missing', () => {
    mockUseFormikContext.mockReturnValue({
      values: {},
      submitForm: mockSubmitForm,
    } as any);
    render(<PreviewSection draftKey="test-draft" />);
    expect(screen.getByText('Гарчиг оруулаагүй')).toBeInTheDocument();
  });

  it('uses default image when images array is empty', () => {
    mockUseFormikContext.mockReturnValue({
      values: { ...mockValues, images: [] },
      submitForm: mockSubmitForm,
    } as any);
    render(<PreviewSection draftKey="test-draft" />);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', '/listingcard.png');
  });

  it('calls submitForm when "Зар оруулах хүсэлт илгээх" button is clicked', () => {
    render(<PreviewSection draftKey="test-draft" />);
    const submitButton = screen.getByRole('button', { name: 'Зар оруулах хүсэлт илгээх' });
    fireEvent.click(submitButton);
    expect(mockSubmitForm).toHaveBeenCalled();
  });

  it('saves draft to localStorage when "Хадгалаад гарах" button is clicked', () => {
    render(<PreviewSection draftKey="test-draft" />);
    const saveButton = screen.getByRole('button', { name: 'Хадгалаад гарах' });
    fireEvent.click(saveButton);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test-draft',
      JSON.stringify(mockValues)
    );
    expect(mockToast.success).toHaveBeenCalledWith('Ноорог хадгалагдлаа');
  });

  it('opens delete confirmation dialog when "Устгах" button is clicked', () => {
    render(<PreviewSection draftKey="test-draft" />);
    const deleteButton = screen.getByTestId('delete-post-button');
    fireEvent.click(deleteButton);
    expect(screen.getByText('Та устгахдаа итгэлтэй байна уу?')).toBeInTheDocument();
  });

  describe('Delete confirmation dialog', () => {
    it('closes when "Болих" button is clicked', async () => {
      render(<PreviewSection draftKey="test-draft" />);
            fireEvent.click(screen.getByTestId('delete-post-button'));
            fireEvent.click(screen.getByTestId('cancel-delete-button'));
      await waitFor(() => {
        expect(screen.queryByText('Та устгахдаа итгэлтэй байна уу?')).not.toBeInTheDocument();
      });
    });

    it('calls deletePostById and shows success when "Устгах" is clicked', async () => {
      mockDeletePost.mockResolvedValueOnce({ data: {} });
      render(<PreviewSection draftKey="test-draft" />);
            fireEvent.click(screen.getByTestId('delete-post-button'));
            fireEvent.click(screen.getByTestId('confirm-delete-button'));
      await waitFor(() => {
        expect(mockDeletePost).toHaveBeenCalledWith({
          variables: { id: '123' }
        });
        expect(mockToast.success).toHaveBeenCalledWith('Пост амжилттай устлаа', {
          description: 'Таны зар устгагдлаа.',
          duration: 3000,
        });
        expect(mockPush).toHaveBeenCalledWith('/user-listing');
      });
    });

    it('shows error when deletePostById fails', async () => {
      const error = new Error('Delete failed');
      mockDeletePost.mockRejectedValueOnce(error);
      render(<PreviewSection draftKey="test-draft" />);
      fireEvent.click(screen.getByTestId('delete-post-button'));
      fireEvent.click(screen.getByTestId('confirm-delete-button'));
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('Алдаа гарлаа', {
          description: 'Пост устгаж чадсангүй. Дахин оролдоно уу.',
          duration: 3000,
        });
      });
    });

    it('shows error when no ID is found', async () => {
      mockUseFormikContext.mockReturnValue({
        values: {}, 
        submitForm: mockSubmitForm,
      } as any);
      
      render(<PreviewSection draftKey="test-draft" />);
            fireEvent.click(screen.getByTestId('delete-post-button'));
      fireEvent.click(screen.getByTestId('confirm-delete-button'));
      
      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith('ID олдсонгүй', {
          description: 'Устгахын тулд постын ID шаардлагатай.',
          duration: 3000,
        });
        expect(mockDeletePost).not.toHaveBeenCalled();
      });
    });
  });

  it('has proper data-testid and data-cy attributes', () => {
    render(<PreviewSection draftKey="test-draft" />);
    
    expect(screen.getByTestId('preview-section')).toBeInTheDocument();
    expect(screen.getByTestId('listing-preview-card')).toBeInTheDocument();
    expect(screen.getByTestId('submit-post-button')).toBeInTheDocument();
    expect(screen.getByTestId('save-post-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-post-button')).toBeInTheDocument();
  });
});