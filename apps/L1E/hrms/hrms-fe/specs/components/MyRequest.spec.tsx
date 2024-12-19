import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MyRequest } from '@/components/MyRequest';

describe('MyRequest', () => {
  it('renders the component success', () => {
    render(<MyRequest />);
    expect(screen.getByText('Миний явуулсан хүсэлтүүд:'));
  });
  it('renders the component failed', () => {
    render(<MyRequest />);
    expect(screen.getByText('Миний явуулсан хүсэлтүүд:'));
  });
});
