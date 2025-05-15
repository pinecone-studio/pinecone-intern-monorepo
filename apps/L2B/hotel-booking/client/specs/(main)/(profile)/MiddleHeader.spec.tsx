import { render, screen } from '@testing-library/react';
import { MiddleHeader } from '@/app/(main)/(profiles)/_components/MiddleHeader';

describe('MiddleHeader', () => {
  it('renders MiddleHeader with props', () => {
    render(<MiddleHeader h3="Test Heading" p="Test paragraph" />);

    expect(screen.getByTestId('middle')).toBeInTheDocument();

    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test paragraph')).toBeInTheDocument();
  });
});
