import FollowersEmpty from '@/components/profile/following-followers/FollowersEmpty';
import { render, screen, fireEvent } from '@testing-library/react';

describe('FollowersEmpty Component - DialogTrigger', () => {
  it('renders the child component inside DialogTrigger', () => {
    render(
      <FollowersEmpty>
        <button>Open Dialog</button>
      </FollowersEmpty>
    );
  });

  it('opens the Dialog when the trigger is clicked', () => {
    render(
      <FollowersEmpty>
        <button>Open Dialog</button>
      </FollowersEmpty>
    );

    const triggerButton = screen.getByText('Open Dialog');
    fireEvent.click(triggerButton);
  });
});
