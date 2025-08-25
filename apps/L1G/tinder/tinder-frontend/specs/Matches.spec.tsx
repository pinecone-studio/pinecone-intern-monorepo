import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Matches from '../src/components/Matches';

jest.mock('../src/components/Avatar', () => {
  const MockAvatar = ({ user }) => {
    return <div data-testid={`avatar-${user.id}`}>{user.name} Avatar</div>;
  };
  return MockAvatar;
});

const mockUsers = [
  { id: 1, name: 'Leslie', age: 25, job: 'Designer', avatar: ['avatar1.jpg'] },
  { id: 2, name: 'Eleanor', age: 30, job: 'Engineer', avatar: ['avatar2.jpg'] },
];

describe('Matches Component', () => {
  const mockOnUserSelect = jest.fn();
  const defaultProps = {
    topRowUsers: mockUsers,
    selectedUser: null,
    onUserSelect: mockOnUserSelect,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders users correctly', () => {
    render(<Matches {...defaultProps} />);

    expect(screen.getByText('Matches')).toBeInTheDocument();
    expect(screen.getByText('Leslie, 25')).toBeInTheDocument();
    expect(screen.getByText('Eleanor, 30')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('handles user selection', () => {
    render(<Matches {...defaultProps} />);

    const userElement = screen.getByText('Leslie, 25');
    fireEvent.click(userElement.closest('div'));

    expect(mockOnUserSelect).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('shows selected user styling', () => {
    const props = { ...defaultProps, selectedUser: mockUsers[0] };
    render(<Matches {...props} />);

    expect(screen.getByText('Leslie, 25')).toHaveClass('text-red-600');
    expect(screen.getByText('Eleanor, 30')).toHaveClass('text-black');
  });

  it('handles empty user list', () => {
    const props = { ...defaultProps, topRowUsers: [] };
    render(<Matches {...props} />);

    expect(screen.getByText('Matches')).toBeInTheDocument();
    expect(screen.queryByText('Leslie, 25')).not.toBeInTheDocument();
  });
});
