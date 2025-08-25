<<<<<<< HEAD
import { Matches } from '@/components/Matches';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

function getExpectedAgeByName(name) {
  switch (name) {
    case 'Mark Zuckerberg':
      return '40';
    case 'Eleanor Pena':
    case 'Wade Warren':
    case 'Wade Warren ahahjad ajdjajka askjdh':
      return '32';
    default:
      return null;
  }
}

function includesText(textToFind) {
  return (content) => content.includes(textToFind);
}

function checkUserCardContent(img) {
  const userName = img.getAttribute('alt');
  expect(userName).toBeTruthy();

  const userCard = img.closest('div.flex.flex-col');
  expect(userCard).toBeInTheDocument();

  if (!userCard || !userName) return;

  const { getByText, queryByText } = within(userCard);

  expect(getByText(includesText(userName))).toBeInTheDocument();

  const expectedAge = getExpectedAgeByName(userName);
  if (expectedAge) {
    expect(queryByText(includesText(expectedAge))).toBeInTheDocument();
  }
}

describe('Matches', () => {
  it('renders correctly', () => {
    render(<Matches />);

    const avatars = screen.getAllByRole('img');
    expect(avatars).toHaveLength(5);

    avatars.forEach(checkUserCardContent);

    expect(screen.getByText('Matches')).toBeInTheDocument();
    expect(screen.getAllByText('Software Engineer')).toHaveLength(5);
  });

  it('renders correct number of matches', () => {
    render(<Matches />);
    expect(screen.getAllByRole('img')).toHaveLength(5);
  });

  it('displays user information correctly', () => {
    render(<Matches />);
    const names = ['Mark Zuckerberg', 'Eleanor Pena', 'Wade Warren', 'Wade Warren ahahjad ajdjajka askjdh'];

    names.forEach((name) => {
      const userImages = screen.getAllByAltText(name);
      expect(userImages.length).toBeGreaterThan(0);

      userImages.forEach((userImage) => {
        const userCard = userImage.closest('div.flex.flex-col');
        expect(userCard).toBeInTheDocument();

        if (!userCard) return;

        const { getByText } = within(userCard);
        expect(getByText(includesText(name))).toBeInTheDocument();
      });
    });
  });
=======
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../components/Avatar', () => {
  return ({ user, size }: any) => (
    <div data-testid={`avatar-${user.id}`} data-size={size} data-user={user.name}>
      Avatar for {user.name}
    </div>
  );
});

import Matches from '../components/Matches';

describe('Matches Component', () => {
  const mockUsers = [
    { id: 1, name: 'Alice', age: 25, job: 'Designer', avatar: ['profile.jpg'] },
    { id: 2, name: 'Bob', age: 28, job: 'Engineer', avatar: ['profile.jpg'] },
    { id: 3, name: 'Charlie', age: 30, job: 'Teacher', avatar: ['profile.jpg'] },
  ];

  const mockUsers = [
    { id: 1, name: 'Alice', age: 25, job: 'Designer', avatar: ['profile.jpg'] },
    { id: 2, name: 'Bob', age: 28, job: 'Engineer', avatar: ['profile.jpg'] },
    { id: 3, name: 'Charlie', age: 30, job: 'Teacher', avatar: ['profile.jpg'] },
  ];

  const defaultProps = {
    topRowUsers: mockUsers,
    selectedUser: null,
    onUserSelect: jest.fn(),
    onUserSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('renders root and inner containers correctly', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByTestId('matches-root')).toBeInTheDocument();
      expect(screen.getByTestId('matches-inner')).toHaveClass('max-w-[1280px]');
    });

    it('displays Matches title', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByText('Matches')).toHaveClass('text-[20px]', 'font-medium');
    });

    it('renders scrollable container', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByTestId('users-container')).toHaveClass('overflow-x-auto');
    });
  });

  describe('User Rendering', () => {
    it('renders all users', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByText('Alice, 25')).toBeInTheDocument();
      expect(screen.getByText('Bob, 28')).toBeInTheDocument();
      expect(screen.getByText('Charlie, 30')).toBeInTheDocument();
    });

    it('renders avatars with correct props', () => {
      render(<Matches {...defaultProps} />);
      expect(screen.getByTestId('avatar-1')).toHaveAttribute('data-size', '40');
      expect(screen.getByTestId('avatar-1')).toHaveAttribute('data-user', 'Alice');
    });

    it('handles empty user list', () => {
      render(<Matches {...defaultProps} topRowUsers={[]} />);
      expect(screen.queryByText(/, \d+/)).not.toBeInTheDocument();
    });
  });

  describe('Selection Styling', () => {
    it('applies unselected styles by default', () => {
      render(<Matches {...defaultProps} />);
      const aliceName = screen.getByText('Alice, 25');
      expect(aliceName).toHaveClass('text-black');
    });

    it('applies selected styles when user is selected', () => {
      render(<Matches {...defaultProps} selectedUser={mockUsers[0]} />);
      const aliceName = screen.getByText('Alice, 25');
      expect(aliceName).toHaveClass('text-red-600');
    });
  });

  describe('Interactions', () => {
    it('calls onUserSelect when user is clicked', () => {
      const mockHandler = jest.fn();
      render(<Matches {...defaultProps} onUserSelect={mockHandler} />);
      fireEvent.click(screen.getByTestId('user-1'));
      expect(mockHandler).toHaveBeenCalledWith(mockUsers[0]);
    });
  });

  describe('Edge Cases', () => {
    it('handles long names gracefully', () => {
      const longUser = [{ id: 99, name: 'VeryLongNameThatMightCauseIssues', age: 99, job: 'Tester', avatar: [] }];
      render(<Matches {...defaultProps} topRowUsers={longUser} />);
      expect(screen.getByText('VeryLongNameThatMightCauseIssues, 99')).toBeInTheDocument();
    });
  });
>>>>>>> adc4e6da7 (chat garh heseg)
});
