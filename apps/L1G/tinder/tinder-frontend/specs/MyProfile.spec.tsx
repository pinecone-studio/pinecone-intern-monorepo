import { MyProfile, MyProfileHeader } from '@/components/MyProfile';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/components/MyProfileForm', () => ({
  MyProfileForm: () => <div>MyProfileForm Component</div>,
}));
jest.mock('@/components/MyImages', () => ({
  MyImages: () => <div>MyImages Component</div>,
}));

describe('MyProfile', () => {
  it('renders default profile view', () => {
    render(<MyProfile />);
    expect(screen.getByText('MyProfileForm Component')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Profile/i })).toHaveClass('bg-[#F4F4F5]');
  });

  it('switches to Images menu when clicked', () => {
    render(<MyProfile />);
    const imagesButton = screen.getByRole('button', { name: /Images/i });
    fireEvent.click(imagesButton);
    expect(screen.getByText('MyImages Component')).toBeInTheDocument();
    expect(imagesButton).toHaveClass('bg-[#F4F4F5]');
  });

  it('switches to Appearance menu when clicked', () => {
    render(<MyProfile />);
    const btn = screen.getByRole('button', { name: /Appearance/i });
    fireEvent.click(btn);
    expect(screen.getByText('Appearance Settings')).toBeInTheDocument();
  });

  it('switches to Notifications menu when clicked', () => {
    render(<MyProfile />);
    const btn = screen.getByRole('button', { name: /Notifications/i });
    fireEvent.click(btn);
    expect(screen.getByText('Notification Settings')).toBeInTheDocument();
  });

  it('switches to Display menu when clicked', () => {
    render(<MyProfile />);
    const btn = screen.getByRole('button', { name: /Display/i });
    fireEvent.click(btn);
    expect(screen.getByText('Display Settings')).toBeInTheDocument();
  });
});

describe('MyProfileHeader', () => {
  it('renders user greeting and email', () => {
    render(<MyProfileHeader />);
    expect(screen.getByText(/Hi, user/i)).toBeInTheDocument();
    expect(screen.getByText(/n\.shagai@pinecone\.mn/i)).toBeInTheDocument();
  });
});
