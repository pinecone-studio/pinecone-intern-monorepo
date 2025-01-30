import EmptyFollowing from '@/components/profile/EmptyFollowing';
import { render, screen, fireEvent } from '@testing-library/react';

describe('EmptyFollowing Component', () => {
  it('renders the children correctly', () => {
    render(
      <EmptyFollowing>
        <button>Open Following</button>
      </EmptyFollowing>
    );
  });

  it('opens the dialog when the trigger is clicked', () => {
    render(
      <EmptyFollowing>
        <button>Open Following</button>
      </EmptyFollowing>
    );

    fireEvent.click(screen.getByText('Open Following'));
  });

  it('closes the dialog when the close button is clicked', () => {
    render(
      <EmptyFollowing>
        <button>Open Following</button>
      </EmptyFollowing>
    );

    fireEvent.click(screen.getByText('Open Following'));

    fireEvent.click(screen.getByLabelText('Close dialog absolute'));
  });
});
