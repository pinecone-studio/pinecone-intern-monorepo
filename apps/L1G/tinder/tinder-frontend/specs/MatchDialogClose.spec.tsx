import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchDialogClose from '@/components/MatchDialogClose';

jest.mock('@/components/ItsAmAtch', () => (props: any) => {
  return (
    <div data-testid="match-component">
      Match Component<button onClick={props.onClose}>Close</button>
    </div>
  );
});

describe('MatchDialogClose', () => {
  it('renders the Match component', () => {
    const onClose = jest.fn();
    render(<MatchDialogClose onClose={onClose} />);
    expect(screen.getByTestId('match-component'));
  });
  test('calls onClose when clicking on overlay', () => {
    const onClose = jest.fn();
    render(<MatchDialogClose onClose={onClose} />);

    const overlay = screen.getByTestId('overlay');

    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when clicking inside the dialog content', () => {
    const onClose = jest.fn();
    render(<MatchDialogClose onClose={onClose} />);

    const dialogContent = screen.getByTestId('match-component');

    fireEvent.click(dialogContent);
    expect(onClose).not.toHaveBeenCalled();
  });
});
