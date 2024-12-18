import { render, screen } from '@testing-library/react';
import { ImageUpload } from '@/components/User/ImageUpload';

describe('ImageUpload', () => {
  it('renders the ImageUpload component success', () => {
    render(<ImageUpload />);
    expect(screen.getByText('Upload your image'));
    expect(screen.getByText('Please choose an image that represents you.'));
  });
});
