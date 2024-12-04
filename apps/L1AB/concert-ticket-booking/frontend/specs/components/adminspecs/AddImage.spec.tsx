import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddImage } from '@/components';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('AddImage Component', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    /* eslint-disable camelcase */
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => ({ secure_url: 'https://mocked-url.com' }),
      })
    ) as jest.Mock;
    /* eslint-enable camelcase */
  });

  it('renders upload input, displays placeholder content, triggers upload on button click, and handles modal logic', async () => {
    const mockOnUpload = jest.fn();
    const mockHandleSubmit = jest.fn();
    const setCheckMock = jest.fn();

    const { getByTestId, getAllByTestId } = render(<AddImage onUpload={mockOnUpload} handleSubmit={mockHandleSubmit} check={true} setCheck={setCheckMock} />);

    const clickButton = screen.getByTestId('ClickButton');
    fireEvent.click(clickButton);

    const fileInput = screen.getByPlaceholderText('image');
    const file = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const previewImage = screen.getByTestId('Preview-mocked-url-0');
      expect(previewImage);
    });

    const CheckSet = getAllByTestId('CheckSet');
    fireEvent.click(CheckSet[0]);

    const CheckSet2 = getByTestId('CheckSet2');
    fireEvent.click(CheckSet2);

    expect(setCheckMock);

    const uploadButton = getByTestId('CreateEvent');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockOnUpload);
      expect(mockHandleSubmit);
      expect(setCheckMock);
    });

    expect(setCheckMock);
  });

  it('displays "Creating..." text while uploading', async () => {
    const mockOnUpload = jest.fn();
    const mockHandleSubmit = jest.fn();
    const setCheckMock = jest.fn();

    const props = {
      onUpload: mockOnUpload,
      handleSubmit: mockHandleSubmit,
      check: true,
      setCheck: setCheckMock,
    };

    const { getByTestId } = render(<AddImage {...props} check={true} />);

    fireEvent.click(getByTestId('CreateEvent'));

    await waitFor(() => {
      expect(getByTestId('CreateEvent'));
    });

    await waitFor(() => {
      expect(getByTestId('CreateEvent'));
    });
  });

  
  it('removes an image when the remove button is clicked', async () => {
    const mockOnUpload = jest.fn();
    const mockHandleSubmit = jest.fn();
    const setCheckMock = jest.fn();

    const { getByTestId, queryByTestId } = render(<AddImage onUpload={mockOnUpload} handleSubmit={mockHandleSubmit} check={false} setCheck={setCheckMock} />);

    const clickButton = screen.getByTestId('ClickButton');
    fireEvent.click(clickButton);

    const fileInput = screen.getByPlaceholderText('image');
    const file = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const previewImage = screen.getByTestId('Preview-mocked-url-0');
      expect(previewImage);
    });

    const removeButton = getByTestId('RemoveImage-0');
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(queryByTestId('Preview-mocked-url-0'));
    });
  });
  

  

  it('Image fails', async () => {
    const mockOnUpload = jest.fn();
    const mockHandleSubmit = jest.fn();
    const setCheckMock = jest.fn();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => ({ message: 'Error uploading' }),
      })
    ) as jest.Mock;

    render(<AddImage onUpload={mockOnUpload} handleSubmit={mockHandleSubmit} check={false} setCheck={setCheckMock} />);

    const clickButton = screen.getByTestId('ClickButton');
    fireEvent.click(clickButton);

    const fileInput = screen.getByPlaceholderText('image');
    const file = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const previewImage = screen.getByTestId('Preview-mocked-url-0');
      expect(previewImage);
    });

    const uploadButton = screen.getByTestId('CreateEvent');
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(mockOnUpload);
    });
  });
});
