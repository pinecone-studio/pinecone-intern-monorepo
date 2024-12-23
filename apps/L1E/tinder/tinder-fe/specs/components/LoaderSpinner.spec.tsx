import LoaderSpinner from '@/components/LoaderSpinner';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
  it('should render nothing ', () => {
    render(<LoaderSpinner />);
    expect(screen.getByText('Please Wait...'));
  });
});
