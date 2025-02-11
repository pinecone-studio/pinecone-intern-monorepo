import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { ImagesDialog } from '@/components/admin/ui/dialog';

describe('ImagesDialog Component', () => {
  const mockSetImages = jest.fn();
  const mockHandleEditHotelImages = jest.fn();

  const defaultProps = {
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    setImages: mockSetImages,
    handleEditHotelImages: mockHandleEditHotelImages,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dialog trigger button', () => {
    render(<ImagesDialog {...defaultProps} />);
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('should open the dialog when the Edit button is clicked', () => {
    render(<ImagesDialog {...defaultProps} />);
    const editButton = screen.getByRole('button', { name: /edit/i });

    fireEvent.click(editButton);

    // Dialog content should now be visible
    expect(screen.getByText('Images')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display the initial images as a comma-separated string in the textarea', () => {
    render(<ImagesDialog {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('image1.jpg, image2.jpg, image3.jpg');
  });

  it('should call setImages with the correct value when the textarea is modified', () => {
    render(<ImagesDialog {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'image4.jpg, image5.jpg' } });

    expect(mockSetImages).toHaveBeenCalledWith(['image4.jpg', 'image5.jpg']);
  });

  it('should call handleEditHotelImages when the Save button is clicked', () => {
    render(<ImagesDialog {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(mockHandleEditHotelImages).toHaveBeenCalledTimes(1);
  });

  it('should close the dialog when the Cancel button is clicked', () => {
    render(<ImagesDialog {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Dialog content should no longer be visible
    expect(screen.queryByText('Images')).not.toBeInTheDocument();
  });
});
