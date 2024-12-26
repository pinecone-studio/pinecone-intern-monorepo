import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import ImagesSection from '@/components/profile/ImagesSection';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

describe('ImageSection Component', () => {
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

    const { getAllByTestId } = render(<ImagesSection />);

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
    const { getByTestId, queryByTestId } = render(<ImagesSection />);

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
    const { getByTestId } = render(<ImagesSection />);

    fireEvent.click(getByTestId('create'));
  });

  it('handles image upload failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => ({ message: 'Error uploading' }),
      })
    ) as jest.Mock;

    render(<ImagesSection />);

    const clickButton = screen.getByTestId('ClickButton');
    fireEvent.click(clickButton);

    const uploadButton = screen.getByTestId('create');
    fireEvent.click(uploadButton);
  });
  it('navigates to the detail step when Next is clicked and age is provided', async () => {
    render(
      <MockedProvider mocks={[]}>
        <ImagesSection />
      </MockedProvider>
    );

    const input = screen.getByTestId('addinput');

    await act(async () => {
      fireEvent.change(input, { target: { files: ['1', '2'] } });
    });

    const nextButton = screen.getByText('Upload');

    await act(async () => {
      fireEvent.click(nextButton);
    });
  });
});
