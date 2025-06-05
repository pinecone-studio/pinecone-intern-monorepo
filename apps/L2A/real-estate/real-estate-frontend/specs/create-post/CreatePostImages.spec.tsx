import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreatePostImages } from '@/app/create-post/_components/CreatePostImages';
import '@testing-library/jest-dom';

const mockOnChange = jest.fn();

const setup = (props = {}) => {
  render(<CreatePostImages name="images" value={[]} onChange={mockOnChange} {...props} />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders upload button and input', () => {
  setup();
  expect(screen.getByTestId('upload-button')).toBeInTheDocument();
  expect(screen.getByTestId('image-input')).toBeInTheDocument();
});

test('shows error message if error prop is passed', () => {
  setup({ error: 'Required field' });
  expect(screen.getByText('Required field')).toBeInTheDocument();
});

test('renders placeholder when no error', () => {
  setup();
  expect(screen.getByText('placeholder')).toHaveClass('invisible');
});

test('clicking the upload button triggers input click', () => {
  setup();
  const input = screen.getByTestId('image-input') as HTMLInputElement;
  const clickSpy = jest.spyOn(input, 'click');

  fireEvent.click(screen.getByTestId('upload-button'));
  expect(clickSpy).toHaveBeenCalled();
});

test('simulates image upload and updates image list', async () => {
  const secureUrl = 'https://example.com/test.jpg';
  global.fetch = jest.fn(() =>
    Promise.resolve({
      // eslint-disable-next-line camelcase
      json: () => Promise.resolve({ secure_url: secureUrl }),
    })
  ) as jest.Mock;

  setup();

  const file = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });
  const input = screen.getByTestId('image-input');
  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    expect(mockOnChange).toHaveBeenCalledWith([secureUrl]);
  });
});
test('does nothing if no files are selected', async () => {
  setup();
  const input = screen.getByTestId('image-input');
  fireEvent.change(input, { target: { files: null } });

  expect(mockOnChange).not.toHaveBeenCalled();
});


test('logs error to console if upload fails', async () => {
  const error = new Error('Upload failed');
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  global.fetch = jest.fn(() => Promise.reject(error)) as jest.Mock;

  setup();

  const file = new File(['dummy'], 'fail.jpg', { type: 'image/jpeg' });
  const input = screen.getByTestId('image-input');
  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith(
      'Зураг оруулах үед алдаа гарлаа',
      error
    );
  });

  consoleSpy.mockRestore();
});

test('removes image on close button click', async () => {
  const imageUrl = 'https://example.com/image.jpg';

  render(
    <CreatePostImages
      name="images"
      value={[imageUrl]}
      onChange={mockOnChange}
    />
  );

  expect(screen.getByTestId('uploaded-image')).toHaveAttribute('src', imageUrl);

  fireEvent.click(screen.getByRole('button', { name: '×' }));

  expect(mockOnChange).toHaveBeenCalledWith([]);
});
