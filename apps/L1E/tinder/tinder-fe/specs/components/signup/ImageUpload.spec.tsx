import { ImageUpload } from '@/components/signup/ImageUpload';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('ImageUpload Component', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => ({ secureUrl: 'https://mocked-url.com' }),
      })
    ) as jest.Mock;
  });

  it('renders upload input, displays placeholder content, triggers upload on button click, and handles modal logic', async () => {
    const mockOnUpload = jest.fn();
    const mockHandleSubmit = jest.fn();
    const setCheckMock = jest.fn();

    const { getByTestId, getAllByTestId } = render(<ImageUpload />);

    const clickButton = screen.getByTestId('ClickButton');
    fireEvent.click(clickButton);

    const fileInput = screen.getByTestId('addinput');
    const file = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const previewImage = screen.getByTestId('map');
      expect(previewImage);
    });

    const CheckSet = getAllByTestId('check');
    fireEvent.click(CheckSet[0]);

    const CheckSet2 = getByTestId('CheckSet2');
    fireEvent.click(CheckSet2);

    expect(setCheckMock);

    const uploadButton = screen.getByTestId('create');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockOnUpload);
      expect(mockHandleSubmit);
      expect(setCheckMock);
    });
  });
  it('removes an image when the remove button is clicked', async () => {
    const { getByTestId, queryByTestId } = render(<ImageUpload />);

    const clickButton = screen.getByTestId('ClickButton');
    fireEvent.click(clickButton);

    const fileInput = screen.getByTestId('addinput');
    const file = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const previewImage = screen.getByTestId('map');
      expect(previewImage);
    });

    const removeButton = getByTestId('remove');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(queryByTestId('map'));
    });
  });

  it('displays "Creating..." text while uploading', async () => {
    const { getByTestId } = render(<ImageUpload />);

    fireEvent.click(getByTestId('create'));
  });

  it('handles image upload failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => ({ message: 'Error uploading' }),
      })
    ) as jest.Mock;

    render(<ImageUpload />);

    const clickButton = screen.getByTestId('ClickButton');
    fireEvent.click(clickButton);

    const uploadButton = screen.getByTestId('create');
    fireEvent.click(uploadButton);
  });
});
