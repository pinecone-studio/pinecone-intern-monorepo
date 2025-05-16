import { CreatePostImages } from '@/app/create-post/_components/CreatePostImages';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CreatePostImages', () => {
  const initialImages = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial images and error message', () => {
    render(<CreatePostImages name="images" value={initialImages} onChange={jest.fn()} error="Зураг заавал оруулна уу!" />);

    const imgs = screen.getAllByAltText('preview');
    expect(imgs).toHaveLength(2);
    expect(screen.getByText('Зураг заавал оруулна уу!')).toBeInTheDocument();
  });

  it('clicking upload button triggers file input click', () => {
    render(<CreatePostImages name="images" value={[]} onChange={jest.fn()} />);

    const uploadBtn = screen.getByTestId('upload-button');
    const fileInput = screen.getByTestId('image-input');

    const inputClickSpy = jest.spyOn(fileInput, 'click');

    fireEvent.click(uploadBtn);

    expect(inputClickSpy).toHaveBeenCalled();
  });

  it('uploads images and calls onChange with new URLs', async () => {
    const mockOnChange = jest.fn();

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ secureUrl: 'https://cloudinary.com/fake-image.jpg' }),
    } as any);

    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('image-input');

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(['https://cloudinary.com/fake-image.jpg']);
    });

    (global.fetch as jest.Mock).mockRestore();
  });

  it('removes image when remove button clicked', () => {
    const mockOnChange = jest.fn();

    render(<CreatePostImages name="images" value={initialImages} onChange={mockOnChange} />);

    const removeButtons = screen.getAllByRole('button', { name: '×' });
    expect(removeButtons).toHaveLength(2);

    fireEvent.click(removeButtons[0]);

    expect(mockOnChange).toHaveBeenCalledWith([initialImages[1]]);
  });

  it('disables upload button when uploading', async () => {
    const mockOnChange = jest.fn();

    global.fetch = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                json: () => Promise.resolve({ secureUrl: 'https://cloudinary.com/fake-image.jpg' }),
              }),
            100
          )
        )
    );

    render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('image-input');
    const uploadBtn = screen.getByTestId('upload-button');

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(uploadBtn).toBeDisabled();
    expect(uploadBtn).toHaveTextContent('Түр хүлээнэ үү...');

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });

    expect(uploadBtn).not.toBeDisabled();
    expect(uploadBtn).toHaveTextContent('+ Зураг оруулах');

    (global.fetch as jest.Mock).mockRestore();
  });
});
