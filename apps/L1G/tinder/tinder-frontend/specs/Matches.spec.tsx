import { Matches } from '@/components/Matches';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe('Matches', () => {
  it('renders correctly', () => {
    render(<Matches />);
    
    expect(screen.getByText('Matches')).toBeInTheDocument();
    
    expect(screen.getByText('Mark Zuckerberg, 40')).toBeInTheDocument();
    expect(screen.getByText('Eleanor Pena, 32')).toBeInTheDocument();
    expect(screen.getByText('Wade Warren, 32')).toBeInTheDocument();
    
    expect(screen.getByAltText('Mark Zuckerberg')).toBeInTheDocument();
    expect(screen.getByAltText('Eleanor Pena')).toBeInTheDocument();
    expect(screen.getByAltText('Wade Warren')).toBeInTheDocument();
    
    expect(screen.getAllByText('Software Engineer')).toHaveLength(3);
  });

  it('renders correct number of matches', () => {
    render(<Matches />);
    
    const userCards = screen.getAllByRole('img');
    expect(userCards).toHaveLength(3);
  });

  it('displays user information correctly', () => {
    render(<Matches />);
    
    expect(screen.getByText('Mark Zuckerberg, 40')).toBeInTheDocument();
    expect(screen.getByText('Eleanor Pena, 32')).toBeInTheDocument();
    expect(screen.getByText('Wade Warren, 32')).toBeInTheDocument();
    
    expect(screen.getAllByText(/32/)).toHaveLength(2);
  });
});