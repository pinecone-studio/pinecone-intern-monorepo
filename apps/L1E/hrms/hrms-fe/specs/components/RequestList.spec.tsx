import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RequestList } from '@/components/RequestList';

describe('RequestList', () => {
  it('renders the component', () => {
    render(<RequestList />);
    expect(screen.getAllByText('Чөлөө (1 хоног)'));
  });
});
