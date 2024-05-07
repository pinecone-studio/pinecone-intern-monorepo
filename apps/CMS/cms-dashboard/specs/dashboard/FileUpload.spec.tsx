import { FileUpload } from '@/app/dashboard/_components/FileUpload';

import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('@/file-management', () => ({
  fileManagement: jest.fn().mockResolvedValue(['access-url']),
}));

describe('FileUpload Component', () => {
  it('should handle file upload correctly', async () => {
    const setFieldValueMock = jest.fn();
    const file = new File([''], 'test.png', { type: 'image/png' });
    const fileInput = {
      target: {
        files: [file],
      },
    };

    const { getByLabelText } = render(<FileUpload setFieldValue={setFieldValueMock} />);

    const input = getByLabelText('Зураг оруулах');

    act(() => {
      fireEvent.change(input, fileInput);
    });

    await Promise.resolve();
  });

  it('handle upload target null', async () => {
    const setFieldValueMock = jest.fn();
    const file = new File([''], 'test.png', { type: 'image/png' });
    const fileInput = {
      target: {
        files: null,
      },
    };

    const { getByLabelText } = render(<FileUpload setFieldValue={setFieldValueMock} />);

    const input = getByLabelText('Зураг оруулах');

    act(() => {
      fireEvent.change(input, fileInput);
    });

    await Promise.resolve();
  });

  it('handle upload target null', async () => {});
});
