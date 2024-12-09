import StoryCard from '@/components/StoryCard';
import { render, screen } from '@testing-library/react';

describe('StoryCard Component', () => {
  const props = {
    username: 'hi',
    profilePicture: '/avatar1.jpg',
    userId: '1',
  };

  it('renders correctly with provided props', () => {
    render(<StoryCard {...props} />);
  });
});
