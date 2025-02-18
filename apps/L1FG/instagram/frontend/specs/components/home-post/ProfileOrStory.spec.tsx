import { ProfileOrStory } from '@/components/home-post/ProfileOrStory';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
describe('ProfileOrStory', () => {
  it('Should render link with urlWhenHasStory', () => {
    render(
      <ProfileOrStory hasStory={false} urlWhenHasStory={'/has-story'} urlWhenNoStory={'/no-story'}>
        comment
      </ProfileOrStory>
    );
    const link = screen.getByText('comment');
    expect(link).toHaveAttribute('href', '/no-story');
  });
  it('Should render link with urlWhenNoStory', () => {
    render(
      <ProfileOrStory hasStory={true} urlWhenHasStory={'/has-story'} urlWhenNoStory={'/no-story'}>
        comment
      </ProfileOrStory>
    );
    const link = screen.getByText('comment');
    expect(link).toHaveAttribute('href', '/has-story');
  });
});
