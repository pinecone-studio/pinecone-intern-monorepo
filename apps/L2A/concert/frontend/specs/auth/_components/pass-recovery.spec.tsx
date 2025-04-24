import { PassRecovery } from '@/app/auth/_components/PassRecovery';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('render passrecovery.tsx', () => {
  it('render passrecovery component', () => {
    render(<PassRecovery />);

    expect(screen.getByText(/Нууц үг сэргээх/i)).toBeInTheDocument();
  });
});
