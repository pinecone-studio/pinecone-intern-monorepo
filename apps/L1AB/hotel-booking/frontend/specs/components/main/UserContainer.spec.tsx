import { UserContainer } from '@/components/main';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

describe('UserContainer', () => {
  it('Should render the main user Container component', () => {
    render(<UserContainer />);

    expect(screen.getByText('Hi, Shagai'));

    expect(screen.getByText('n.shagai@pinecone.mn'));
  });

  it('Should render profile when profile button is clicked', () => {
    render(<UserContainer />);

    const profileButton = screen.getByText('Profile');

    fireEvent.click(profileButton);

    expect(screen.getByText('Personal Information'));
  });

  it('Should render contact info when contact button is clicked', () => {
    render(<UserContainer />);

    const contactButton = screen.getByText('Contact');

    fireEvent.click(contactButton); 

    expect(screen.getByText('Contact info'));
  });

  it('Should render settings when settings button is clicked', () => {
    render(<UserContainer />);

    const settingsButton = screen.getByText('Settings');

    fireEvent.click(settingsButton);

    expect(screen.getByText('Security & Settings'));
  });
});
