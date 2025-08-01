import { ProfileCard } from '@/components/ProfileCard';
import { render, screen } from '@testing-library/react';

const src = 'https://i.pinimg.com/736x/39/76/6e/39766edc686a538d7879bf7623660b5a.jpg';
const name = 'Mark Zuckerberg';
const age = 40;
const bio = 'Software Engineer Facebook';

describe('Profile card', () => {
  it('renders profile card without crashing', () => {
    render(<ProfileCard src={src} name={name} age={age} bio={bio} classname="" />);
    expect(screen.getByText(`${name}, ${age}`)).toBeInTheDocument();
    expect(screen.getByText(bio)).toBeInTheDocument();
  });
});
