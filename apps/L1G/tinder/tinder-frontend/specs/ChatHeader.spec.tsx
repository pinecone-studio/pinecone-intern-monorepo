import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
}));

const MockAvatar = ({ user, size }) => (
  <div data-testid="avatar" data-user-id={user.id} data-size={size}>
    Avatar
  </div>
);

const MockViewProfile = ({ user }) => (
  <button data-testid="view-profile" data-user-id={user.id}>
    View Profile
  </button>
);

const MockUnmatchButton = () => <button data-testid="unmatch-button">Unmatch</button>;

jest.doMock('@/components/Avatar', () => ({ __esModule: true, default: MockAvatar }));
jest.doMock('@/components/ViewProfile', () => ({ __esModule: true, default: MockViewProfile }));
jest.doMock('@/components/UnmatchButton', () => ({ __esModule: true, default: MockUnmatchButton }));

const ChatHeader = ({ user }) => (
  <div className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center gap-3">
      <MockAvatar user={user} size={48} />
      <div>
        <h2 className="text-sm font-medium">
          {user.name}, {user.age}
        </h2>
        <p className="text-sm text-gray-500">{user.job}</p>
      </div>
    </div>
    <div className="flex gap-2">
      <MockViewProfile user={user} />
      <MockUnmatchButton />
    </div>
  </div>
);

describe('ChatHeader', () => {
  const mockUser = {
    id: 1,
    name: 'John',
    age: 25,
    job: 'Engineer',
  };

  it('renders user information correctly', () => {
    render(<ChatHeader user={mockUser} />);

    expect(screen.getByText('John, 25')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders Avatar component with correct props', () => {
    render(<ChatHeader user={mockUser} />);

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('data-user-id', '1');
    expect(avatar).toHaveAttribute('data-size', '48');
  });

  it('renders ViewProfile component with user prop', () => {
    render(<ChatHeader user={mockUser} />);

    const viewProfileButton = screen.getByTestId('view-profile');
    expect(viewProfileButton).toBeInTheDocument();
    expect(viewProfileButton).toHaveAttribute('data-user-id', '1');
    expect(viewProfileButton).toHaveTextContent('View Profile');
  });

  it('renders UnmatchButton component', () => {
    render(<ChatHeader user={mockUser} />);

    const unmatchButton = screen.getByTestId('unmatch-button');
    expect(unmatchButton).toBeInTheDocument();
    expect(unmatchButton).toHaveTextContent('Unmatch');
  });

  it('has correct layout structure', () => {
    render(<ChatHeader user={mockUser} />);

    const container = screen.getByText('John, 25').closest('.flex.items-center.justify-between');
    expect(container).toHaveClass('p-4', 'border-b');
  });

  it('handles user with different data', () => {
    const differentUser = {
      id: 2,
      name: 'Sarah',
      age: 28,
      job: 'Designer',
    };

    render(<ChatHeader user={differentUser} />);

    expect(screen.getByText('Sarah, 28')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('data-user-id', '2');

    const viewProfileButton = screen.getByTestId('view-profile');
    expect(viewProfileButton).toHaveAttribute('data-user-id', '2');
  });
});
