import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreatePostImages } from '@/app/create-post/_components/CreatePostImages';
global.fetch = jest.fn(() =>
  Promise.resolve({
    // eslint-disable-next-line camelcase
    json: () => Promise.resolve({ secure_url: 'https://cloudinary.com/some-image-url' }),
  })
) as jest.Mock;

describe('CreatePostImages Component', () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it('should render the component with an upload button', () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} error="" />);
    expect(screen.getByTestId('upload-button')).toBeInTheDocument();
  });

  it('should trigger file input click when upload button is clicked', () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} error="" />);
    const input = screen.getByTestId('image-input') as HTMLInputElement;
    const inputClickSpy = jest.spyOn(input, 'click');
    fireEvent.click(screen.getByTestId('upload-button'));
    expect(inputClickSpy).toHaveBeenCalledTimes(1);
    inputClickSpy.mockRestore();
  });

  it('should call onChange with uploaded image URL', async () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} error="" />);
    const input = screen.getByTestId('image-input') as HTMLInputElement;
    const file = new File(['dummy content'], 'test-image.jpg', { type: 'image/jpeg' });

    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(['https://cloudinary.com/some-image-url']);
    });
  });

  it('should show uploading state during upload', async () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} error="" />);
    const uploadButton = screen.getByTestId('upload-button');
    const input = screen.getByTestId('image-input') as HTMLInputElement;
    const file = new File(['dummy content'], 'test-image.jpg', { type: 'image/jpeg' });

    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    await waitFor(() => {
      expect(uploadButton).toHaveTextContent(/Түр хүлээнэ үү/);
    });
  });

  it('should show error message if provided', () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} error="Some error" />);
    expect(screen.getByText(/Some error/i)).toBeInTheDocument();
  });

  it('should remove image when remove button is clicked', () => {
    render(
      <CreatePostImages
        name="images"
        value={['https://cloudinary.com/image1', 'https://cloudinary.com/image2']}
        onChange={mockOnChange}
        error=""
      />
    );
    const removeButton = screen.getAllByText('×')[0];
    fireEvent.click(removeButton);
    expect(mockOnChange).toHaveBeenCalledWith(['https://cloudinary.com/image2']);
  });

  it('should not call onChange if no files selected', () => {
    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} error="" />);
    const input = screen.getByTestId('image-input') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: null });
    fireEvent.change(input);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});

