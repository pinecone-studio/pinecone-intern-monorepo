import { FileUpload } from '@/app/articles/edit-article/[id]/_components/FileUpload';
import { render, fireEvent, waitFor } from '@testing-library/react';

jest.mock('@/file-management', () => ({
  fileManagement: jest.fn().mockResolvedValue(['access-url']),
}));

describe('FileUpload Component', () => {
  const setFieldValueMock = jest.fn();
  const file = new File([''], 'test.png', { type: 'image/png' });
  it('should handle file upload correctly', async () => {
    const { getByTestId } = render(<FileUpload setFieldValue={setFieldValueMock} value="value" />);

    const input = getByTestId('file-input-test-id');

    await waitFor(() =>
      fireEvent.change(input, {
        target: { files: [file] },
      })
    );
    await Promise.resolve();
  });

  it('handle upload target null', async () => {
    const { getByTestId } = render(<FileUpload setFieldValue={setFieldValueMock} value="value" />);

    const input = getByTestId('file-input-test-id');

    await waitFor(() =>
      fireEvent.change(input, {
        target: { files: null },
      })
    );
    await Promise.resolve();
  });
});
