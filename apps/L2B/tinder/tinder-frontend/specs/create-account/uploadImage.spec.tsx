import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageUpload } from '@/app/auth/create-account/_components/ImageUpload';

describe('ImageUpload', () => {
  it('renders the upload label with Plus icon and text', () => {
    render(<ImageUpload handleImageUpload={jest.fn()} />);
    
    // Check text
    expect(screen.getByText(/upload image/i)).toBeInTheDocument();

    // Check for Plus icon using test ID
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  it('calls handleImageUpload when a file is selected', () => {
    const mockHandleUpload = jest.fn();
    render(<ImageUpload handleImageUpload={mockHandleUpload} />);

    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;
    const file = new File(['dummy'], 'example.png', { type: 'image/png' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockHandleUpload).toHaveBeenCalledTimes(1);
  });
});
