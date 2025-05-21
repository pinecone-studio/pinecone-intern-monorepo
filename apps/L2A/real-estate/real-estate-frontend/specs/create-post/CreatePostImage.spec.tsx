import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreatePostImages } from '@/app/create-post/_components/CreatePostImages'; // Adjust path accordingly


global.fetch = jest.fn(() =>
  Promise.resolve({
    /* eslint-disable camelcase */
    json: () => Promise.resolve({ secure_url: 'https://cloudinary.com/some-image-url' }),
  })
) as jest.Mock;

describe('CreatePostImages Component', () => {
  let mockOnChange: jest.Mock;

  beforeEach(() => {
    mockOnChange = jest.fn();
  });

  it('should render the component with an upload button', () => {
    render(
      <CreatePostImages
        name="images"
        value={[]}
        onChange={mockOnChange}
        error=""
      />
    );
    const uploadButton = screen.getByTestId('upload-button');
    expect(uploadButton).toBeInTheDocument();
  });

  it('should trigger file input click when upload button is clicked', () => {
    render(
      <CreatePostImages
        name="images"
        value={[]}
        onChange={mockOnChange}
        error=""
      />
    );
    const input = screen.getByTestId('image-input') as HTMLInputElement;
    const uploadButton = screen.getByTestId('upload-button');
    const inputClickSpy = jest.spyOn(input, 'click');
    expect(input).toHaveAttribute('hidden');
    fireEvent.click(uploadButton);
    expect(inputClickSpy).toHaveBeenCalledTimes(1);
    inputClickSpy.mockRestore();
  });
  it('should handle file upload and call onChange with the image URL', async () => {
    render(
      <CreatePostImages
        name="images"
        value={[]}
        onChange={mockOnChange}
        error=""
      />
    );
    const input = screen.getByTestId('image-input') as HTMLInputElement;
    const file = new File(['dummy content'], 'test-image.jpg', { type: 'image/jpeg' });
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    await waitFor(() => expect(mockOnChange).toHaveBeenCalled());

    expect(mockOnChange).toHaveBeenCalledWith(['https://cloudinary.com/some-image-url']);
  });
  it('should display uploading state when file is being uploaded', async () => {
    render(
      <CreatePostImages
        name="images"
        value={[]}
        onChange={mockOnChange}
        error=""
      />
    );
    const uploadButton = screen.getByTestId('upload-button');
    const input = screen.getByTestId('image-input') as HTMLInputElement;

    fireEvent.click(uploadButton);

    const file = new File(['dummy content'], 'test-image.jpg', { type: 'image/jpeg' });
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);

    await waitFor(() => {
      expect(uploadButton).toHaveTextContent('Түр хүлээнэ үү...');
    });
  });

  it('should show an error message when passed an error prop', () => {
    render(
      <CreatePostImages
        name="images"
        value={[]}
        onChange={mockOnChange}
        error="An error occurred"
      />
    );
    const errorMessage = screen.getByText(/An error occurred/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should remove an image when remove button is clicked', () => {
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
  it('should not call onChange if no files are selected', async () => {
    render(
      <CreatePostImages
        name="images"
        value={[]}
        onChange={mockOnChange}
        error=""
      />
    );
    const input = screen.getByTestId('image-input') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: null });
    fireEvent.change(input);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
  it('should call onChange with image URL on successful upload', async () => {
    render(
      <CreatePostImages
        name="images"
        value={[]}
        onChange={mockOnChange}
        error=""
      />
    )
    const input = screen.getByTestId('image-input') as HTMLInputElement;
    const file = new File(['dummy content'], 'test-image.jpg', { type: 'image/jpeg' });
    Object.defineProperty(input, 'files', { value: [file] });
    fireEvent.change(input);
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(['https://cloudinary.com/some-image-url']);
    });
  });
});