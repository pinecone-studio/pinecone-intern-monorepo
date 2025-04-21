import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const RegisterNewEmployeeModal = ({ onClose }: { onClose: () => void }) => (
  <div
    data-testid="register-modal"
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div className="bg-white p-6 rounded shadow-lg">
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
      <h2>Шинэ ажилтан бүртгэх</h2>
    </div>
  </div>
);

describe('RegisterNewEmployeeModal', () => {
  it('renders the modal correctly', () => {
    const handleClose = jest.fn();
    render(<RegisterNewEmployeeModal onClose={handleClose} />);

    expect(screen.getByTestId('register-modal')).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', () => {
    const handleClose = jest.fn();

    render(<RegisterNewEmployeeModal onClose={handleClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
