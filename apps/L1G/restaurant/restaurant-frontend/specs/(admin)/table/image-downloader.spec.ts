import { ImageDownloader } from '@/utils/image-downloader';
import '@testing-library/jest-dom';
describe('ImageDownloader', () => {
  it('should create a link and trigger download', () => {
    const clickMock = jest.fn();
    const setAttributeMock = jest.fn();

    const mockLink = {
      href: '',
      download: '',
      click: clickMock,
      setAttribute: setAttributeMock,
    };

    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);

    const base64Data = 'data:image/png;base64,iVBORw0KGgo=';
    const filename = 'test.png';

    ImageDownloader(base64Data, filename);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe(base64Data);
    expect(mockLink.download).toBe(filename);
    expect(clickMock).toHaveBeenCalled();

    createElementSpy.mockRestore();
  });

  it('should use default filename if none is provided', () => {
    const clickMock = jest.fn();
    const mockLink = {
      href: '',
      download: '',
      click: clickMock,
    };

    jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);

    const base64Data = 'data:image/png;base64,somebase64data';

    ImageDownloader(base64Data);

    expect(mockLink.download).toBe('image.png');
    expect(clickMock).toHaveBeenCalled();
  });
});
