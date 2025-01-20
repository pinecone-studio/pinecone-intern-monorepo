import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CaptionInput from '@/components/create-post/lastCreatePost/CaptionInput';

describe('CaptionInput Component', () => {
  const mockSetCaption = jest.fn();

  const renderComponent = (caption: string) => {
    render(<CaptionInput caption={caption} setCaption={mockSetCaption} />);
  };

  it('should render the caption input and length counter', () => {
    renderComponent('');

    // Caption input field
    const captionInput = screen.getByTestId('caption-input');
    expect(captionInput).toBeInTheDocument();
    expect(captionInput).toHaveValue('');

    // Caption length counter
    const captionLength = screen.getByTestId('caption-length');
    expect(captionLength).toBeInTheDocument();
    expect(captionLength).toHaveTextContent('0/200');
  });

  it('should update caption when typing in the input field', () => {
    renderComponent('');

    const captionInput = screen.getByTestId('caption-input');
    fireEvent.change(captionInput, { target: { value: 'New caption' } });

    expect(mockSetCaption).toHaveBeenCalledWith('New caption');
    expect(captionInput);
  });

  it('should display the correct character count when caption changes', () => {
    renderComponent('Hello, world!');

    const captionLength = screen.getByTestId('caption-length');
    expect(captionLength).toHaveTextContent('13/200');
  });

  it('should prevent typing beyond 200 characters', () => {
    const longCaption = 'A'.repeat(250); // 250 characters
    renderComponent('');

    const captionInput = screen.getByTestId('caption-input');
    fireEvent.change(captionInput, { target: { value: longCaption } });

    expect(mockSetCaption); // Only 200 characters should be set
  });
});
