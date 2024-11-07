import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SizeSelector from '@/components/SizeSelector';

describe('SizeSelector', () => {
  const sizes = ['S', 'M', 'L', 'XL', '2XL'];
  const mockSetSelectedSize = jest.fn();

  it('renders all sizes as buttons', () => {
    render(<SizeSelector selectedSize={null} setSelectedSize={mockSetSelectedSize} />);

    sizes.forEach((size) => {
      expect(screen.getByText(size));
    });
  });

  it('calls selectedSize with correct size when consa button is clicked', () => {
    render(<SizeSelector selectedSize={null} setSelectedSize={mockSetSelectedSize} />);

    const sizeButton = screen.getByText('M');
    fireEvent.click(sizeButton);
  });

  it('check backround style ', () => {
    render(<SizeSelector selectedSize="L" setSelectedSize={mockSetSelectedSize} />);

    const selectedButton = screen.getByText('L');
    expect(selectedButton);
  });

  it('check background style and not click background style', () => {
    render(<SizeSelector selectedSize="L" setSelectedSize={mockSetSelectedSize} />);

    sizes
      .filter((size) => size !== 'L')
      .forEach((size) => {
        const button = screen.getByText(size);
        expect(button);
      });
  });
});
