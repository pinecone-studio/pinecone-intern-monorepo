import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { StepFourthCart } from '@/app/auth/create-account/_components/StepFourthCart';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => <img {...props} alt={props.alt || 'mocked'} />,
}));

describe('StepFourthCart', () => {
  const mockRemoveImage = jest.fn();

  it('renders the image if available', () => {
    render(<StepFourthCart index={0} selectedImages={['/test.jpg']} removeImage={mockRemoveImage} />);

    const img = screen.getByAltText('Uploaded image 1');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test.jpg');
  });

  it('calls removeImage with index when button is clicked', () => {
    render(<StepFourthCart index={0} selectedImages={['/test.jpg']} removeImage={mockRemoveImage} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockRemoveImage).toHaveBeenCalledWith(0);
  });
});
