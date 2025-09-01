import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QrScannerComponent } from '@/components/QrScannerComponent';
const mockGetUserMedia = jest.fn();
const mockBarcodeDetector = jest.fn();
const mockStop = jest.fn();
const mockGetTracks = jest.fn().mockReturnValue([{ stop: mockStop }]);
beforeAll(() => {
  Object.defineProperty(navigator, 'mediaDevices', {
    value: { getUserMedia: mockGetUserMedia },
    writable: true,
    configurable: true,
  });

  delete (window as any).location;
  (window as any).location = { href: '' };

  global.requestAnimationFrame = jest.fn((cb) => {
    setTimeout(cb, 0);
    return 1;
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    value: jest.fn().mockResolvedValue(undefined),
    writable: true,
    configurable: true,
  });
});
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.restoreAllMocks();
});
describe('QrScannerComponent', () => {
  let mockStream: any;
  let mockDetectorInstance: any;
  beforeEach(() => {
    mockStream = { getTracks: mockGetTracks };
    mockDetectorInstance = { detect: jest.fn().mockResolvedValue([]) };
    mockGetUserMedia.mockResolvedValue(mockStream);
    mockBarcodeDetector.mockReturnValue(mockDetectorInstance);
    (window as any).BarcodeDetector = mockBarcodeDetector;
    window.location.href = '';
  });

  it('renders title and video element', () => {
    render(<QrScannerComponent />);
    expect(screen.getByText('Ширээний QR код уншуулна уу')).toBeInTheDocument();
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
  });

  it('assigns videoRef correctly to the video element', async () => {
    render(<QrScannerComponent />);
    const video = document.querySelector('video') as HTMLVideoElement;
    expect(video).toBeInTheDocument();
    await waitFor(() => {
      expect(video.srcObject).not.toBeNull();
    });
  });

  it('requests camera access with environment facing mode', async () => {
    render(<QrScannerComponent />);
    await waitFor(() => expect(mockGetUserMedia).toHaveBeenCalledWith({ video: { facingMode: 'environment' } }));
  });
  it('sets video.srcObject to the stream', async () => {
    render(<QrScannerComponent />);
    const video = document.querySelector('video') as HTMLVideoElement;
    await waitFor(() => {
      expect(video.srcObject).toBe(mockStream);
    });
  });

  it('handles missing BarcodeDetector', async () => {
    delete (window as any).BarcodeDetector;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<QrScannerComponent />);
    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith('BarcodeDetector not supported'));
    consoleSpy.mockRestore();
  });
  it('handles QR detection errors', async () => {
    mockDetectorInstance.detect.mockRejectedValueOnce(new Error('Detection failed'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<QrScannerComponent />);
    const video = document.querySelector('video') as HTMLVideoElement;
    Object.defineProperty(video, 'readyState', { value: 4, configurable: true });
    await waitFor(() => {
      expect(mockDetectorInstance.detect).toHaveBeenCalledWith(video);
    });
    consoleSpy.mockRestore();
  });

  it('redirects when QR code is detected', async () => {
    const testUrl = 'https://example.com';
    mockDetectorInstance.detect.mockResolvedValueOnce([{ rawValue: testUrl }]);
    render(<QrScannerComponent />);
    const video = document.querySelector('video') as HTMLVideoElement;
    Object.defineProperty(video, 'readyState', { value: 4, configurable: true });
    await waitFor(() => expect(window.location.href).toBe(testUrl));
  });
  it('continues scanning when no QR code is detected', async () => {
    mockDetectorInstance.detect.mockResolvedValueOnce([]);
    render(<QrScannerComponent />);
    await waitFor(() => expect(mockGetUserMedia).toHaveBeenCalled());
    expect(window.location.href).toBe('');
  });

  it('handles camera permission denied', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new Error('Permission denied'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    render(<QrScannerComponent />);
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Camera access denied', expect.any(Error));
    });
    consoleSpy.mockRestore();
  });

  it('stops camera on beforeunload', async () => {
    render(<QrScannerComponent />);
    await waitFor(() => expect(mockGetUserMedia).toHaveBeenCalled());
    window.dispatchEvent(new Event('beforeunload'));
    expect(mockGetTracks).toHaveBeenCalled();
    expect(mockStop).toHaveBeenCalled();
  });
});

describe('QrScannerComponent Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockStream = { getTracks: () => [{ stop: jest.fn() }] };
    const mockDetector = { detect: jest.fn().mockResolvedValue([]) };
    mockGetUserMedia.mockResolvedValue(mockStream);
    mockBarcodeDetector.mockReturnValue(mockDetector);
    (window as any).BarcodeDetector = mockBarcodeDetector;
  });
  it('initializes camera and detector without errors', async () => {
    render(<QrScannerComponent />);
    await waitFor(() => {
      expect(mockGetUserMedia).toHaveBeenCalledWith({
        video: { facingMode: 'environment' },
      });
      expect(mockBarcodeDetector).toHaveBeenCalledWith({ formats: ['qr_code'] });
    });
  });
});
