import { ProfileCard } from '@/components/ProfileCard';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockProps = {
  src: 'https://i.pinimg.com/736x/39/76/6e/39766edc686a538d7879bf7623660b5a.jpg',
  name: 'Mark Zuckerberg',
  age: 40,
  bio: 'Software Engineer Facebook',
};

describe('Profile card', () => {
  it('renders profile card without crashing', () => {
    render(<ProfileCard src={mockProps.src} name={mockProps.name} age={mockProps.age} bio={mockProps.bio} classname="" />);
    expect(screen.getByText(`${mockProps.name}, ${mockProps.age}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.bio)).toBeInTheDocument();
  });
  it('renders with custom className', () => {
    const customClass = 'custom-profile-card';
    render(<ProfileCard {...mockProps} classname={customClass} />);
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass(customClass);
  });

  it('displays correct alt text for profile image', () => {
    render(<ProfileCard {...mockProps} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', `Profile picture of ${mockProps.name}`);
  });

  it('handles edge cases gracefully', () => {
    const edgeCaseProps = {
      ...mockProps,
      name: '',
      age: 0,
      bio: '',
    };
    render(<ProfileCard {...edgeCaseProps} />);
    expect(screen.getByText(', 0')).toBeInTheDocument();
  });
});
