import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RequestApproved } from '@/components/RequestApproved';

describe('RequestApproved', () => {
  it('renders the component', () => {
    render(<RequestApproved />);
    expect(screen.getByText('Хүлээгдэж байна'));
  });
});
