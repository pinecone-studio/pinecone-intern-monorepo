import { RegisterNewEmployeeModal } from '@/app/admin/_features/Modal';
import { render, screen, fireEvent } from '@testing-library/react';

describe('RegisterNewEmployeeModal', () => {
  it('should not render when isOpen is false', () => {
    render(<RegisterNewEmployeeModal isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByText('×')).toBeNull(); 
  });

  it('should render when isOpen is true', () => {
    render(<RegisterNewEmployeeModal isOpen={true} onClose={jest.fn()} />);
    
    const closeButton = screen.queryByText('×');
    expect(closeButton).not.toBeNull(); 
  });

  it('should call onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<RegisterNewEmployeeModal isOpen={true} onClose={onCloseMock} />);
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1); 
  });
});
