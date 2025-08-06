import { SeeTableModal } from '@/components/table/SeeTableModal';
import { ImageDownloader } from '@/utils/image-downloader';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

const mockData = {
  tableId: 'test',
  tableName: 'test',
  tableQr: 'https://test.png',
};

jest.mock('@/utils/ImageDownloader', () => ({
  ImageDownloader: jest.fn(),
}));

describe('Table', () => {
  beforeEach(() => {
    render(<SeeTableModal data={mockData} />);
  });

  it('should render successfully', () => {
    expect(screen.getByTestId('admin-table-dialog-button')).toBeInTheDocument();
  });

  it('should open modal when click a button', async () => {
    const triggerButton = screen.getByTestId('admin-table-dialog-button');

    act(() => {
      fireEvent.click(triggerButton);
    });

    const dialogContainer = await screen.findByTestId('admin-table-dialog-container');

    expect(dialogContainer).toBeInTheDocument();
  });

  it('passes a URL to imageDownloader function when click a button', async () => {
    const triggerButton = screen.getByTestId('admin-table-dialog-button');

    act(() => {
      fireEvent.click(triggerButton);
    });

    const downloadButton = await screen.findByTestId('admin-table-imageDownload-button');

    act(() => {
      fireEvent.click(downloadButton);
    });

    expect(ImageDownloader).toHaveBeenCalledTimes(1);
    expect(ImageDownloader).toHaveBeenCalledWith(mockData.tableQr, `${mockData.tableName}_QRcode.png`);
  });
});
