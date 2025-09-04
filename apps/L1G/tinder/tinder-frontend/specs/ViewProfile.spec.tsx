/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-var-requires */
 
import ViewProfile from '@/components/ViewProfile';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
 
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, ...props }) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));
 
jest.mock('@/components/ui/dialog', () => {
  const React = require('react');
  const { useState, useContext, createContext } = React;
 
  const DialogContext = createContext({
    open: false,
    setOpen: () => {
      //intenionally empty
    },
  });
 
  const Dialog = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
      <DialogContext.Provider value={{ open, setOpen }}>
        <div>{children}</div>
      </DialogContext.Provider>
    );
  };
 
  const DialogTrigger = ({ children }) => {
    const { setOpen } = useContext(DialogContext);
    return (
      <button onClick={() => setOpen(true)} data-testid="dialog-trigger">
        {children}
      </button>
    );
  };
 
  const DialogContent = ({ children, className }) => {
    const { open } = useContext(DialogContext);
    if (!open) return null;
    return <div className={className}>{children}</div>;
  };
 
  return {
    Dialog,
    DialogContent,
    DialogTrigger,
  };
});
 
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }) => <img src={src} alt={alt} width={width} height={height} className={className} data-testid="mocked-next-image" />,
}));
 
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <span data-testid="prev">←</span>,
  ChevronRight: () => <span data-testid="next">→</span>,
  User: () => <span data-testid="user-icon">👤</span>,
}));
 
describe('ViewProfile', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    age: 25,
    profession: 'Engineer',
    images: ['/img1.jpg', '/img2.jpg', '/img3.jpg'],
  };
 
  const singleUser = { ...mockUser, images: ['/single.jpg'] };
  const emptyUser = { ...mockUser, images: [] };
 
  it('renders View Profile button and user icon', () => {
    render(<ViewProfile user={mockUser} />);
    expect(screen.getByText('View Profile')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });
 
  it('opens dialog and displays first image and user info', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));
 
    expect(screen.getByText('John Doe, 25')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
 
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img1.jpg');
    expect(img).toHaveAttribute('alt', 'John Doe - profile image 1');
  });
 
  it('shows navigation buttons for multiple images', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));
 
    expect(screen.getByTestId('prev')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
  });
 
  it('hides navigation for single image', () => {
    render(<ViewProfile user={singleUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));
 
    expect(screen.queryByTestId('prev')).not.toBeInTheDocument();
    expect(screen.queryByTestId('next')).not.toBeInTheDocument();
  });
 
  it('navigates between images using next and prev', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));
 
    const img = screen.getByRole('img');
    const nextBtn = screen.getByTestId('next');
    const prevBtn = screen.getByTestId('prev');
 
    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute('src', '/img2.jpg');
 
    fireEvent.click(prevBtn);
    expect(img).toHaveAttribute('src', '/img1.jpg');
  });
 
  it('cycles to first image after last', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));
 
    const img = screen.getByRole('img');
    const nextBtn = screen.getByTestId('next');
 
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn); // 3 clicks → back to start
    expect(img).toHaveAttribute('src', '/img1.jpg');
  });
 
  it('cycles to last image when going backward from first', () => {
    render(<ViewProfile user={mockUser} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));
 
    const img = screen.getByRole('img');
    const prevBtn = screen.getByTestId('prev');
 
    fireEvent.click(prevBtn);
    expect(img).toHaveAttribute('src', '/img3.jpg');
  });
 
  it('returns null for empty images array', () => {
    const { container } = render(<ViewProfile user={emptyUser} />);
    expect(container.firstChild).toBeNull();
  });
 
  it('fallbacks alt text if name is missing', () => {
    render(<ViewProfile user={{ ...mockUser, name: '' }} />);
    fireEvent.click(screen.getByTestId('dialog-trigger'));
 
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'User - profile image 1');
  });
 
  it('dialog content is not rendered initially', () => {
    render(<ViewProfile user={mockUser} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
 
 