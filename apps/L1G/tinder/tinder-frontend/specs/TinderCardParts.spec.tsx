import { render, screen } from '@testing-library/react';
import { CardWithImageAndInfo } from '@/components/TinderCardParts';
import '@testing-library/jest-dom';

const mockProfile = {
  id: '1',
  name: 'Test User',
  age: 25,
  interests: [{ interestName: 'reading' }],
  images: ['https://via.placeholder.com/400'],
};

describe('Tinder Card Parts component', () => {
  it('shows interests on first image when user has only one image', () => {
    render(
      <CardWithImageAndInfo
        profile={mockProfile}
        images={['https://via.placeholder.com/400']}
        currentImageIndex={0}
        imageError={false}
        handleImageError={jest.fn()}
        nextImage={jest.fn()}
        prevImage={jest.fn()}
      />
    );

    expect(screen.getByText('reading')).toBeInTheDocument();
  });
});
