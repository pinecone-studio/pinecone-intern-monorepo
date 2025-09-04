import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../src/components/Loading';
 
jest.mock('../src/components/TinderLogo', () => ({
  TinderLogo: ({ handleTohome }: { handleTohome: () => void }) => (
    <div data-testid="tinder-logo" onClick={handleTohome}>
      Tinder Logo
    </div>
  ),
}));
 
describe('Loading Component', () => {
  const message = 'Please Wait...';
 
  test('renders loading container', () => {
    render(<Loading msg={message} />);
    const container = screen.getByTestId('loading');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('h-screen', 'bg-white');
  });
 
  test('renders TinderLogo', () => {
    render(<Loading msg={message} />);
    const logo = screen.getByTestId('tinder-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent('Tinder Logo');
  });
 
  test('renders provided loading message', () => {
    render(<Loading msg={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveClass('text-sm', 'text-gray-400');
  });
 
  test('renders spinner with correct styles', () => {
    render(<Loading msg={message} />);
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-8', 'h-8', 'border-4', 'border-gray-200', 'rounded-full', 'border-t-pink-500', 'animate-spin');
  });
 
  test('renders copyright text', () => {
    render(<Loading msg={message} />);
    const copyright = screen.getByText('©2024 Tinder');
    expect(copyright).toBeInTheDocument();
    expect(copyright).toHaveClass('text-xs', 'text-gray-400');
  });
  test('clicking TinderLogo calls handleTohome function', () => {
    render(<Loading msg="Loading..." />);
    const logo = screen.getByTestId('tinder-logo');
 
    fireEvent.click(logo);
 
    expect(logo).toBeInTheDocument();
  });
});
 
 