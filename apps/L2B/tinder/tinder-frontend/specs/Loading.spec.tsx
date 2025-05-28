import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '@/app/_components/Loading';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    return <img {...props} alt={props.alt || 'mocked image'} />;
  },
}));

describe('Loading Component', () => {
  it('renders the Tinder logo image', () => {
    render(<Loading />);
    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/tinder.svg');
  });

  it('renders the loading spinner', () => {
    render(<Loading />);
    const spinner = screen.getByText('Please Wait...').previousSibling;
    expect(spinner).toBeInTheDocument();
  });

  it('renders the loading text', () => {
    render(<Loading />);
    expect(screen.getByText('Please Wait...')).toBeInTheDocument();
  });

  it('renders the footer copyright', () => {
    render(<Loading />);
    expect(screen.getByText('©2024 Tinder')).toBeInTheDocument();
  });
});
