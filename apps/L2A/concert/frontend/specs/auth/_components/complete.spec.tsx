import { Complete } from '@/app/auth/_components/Complete';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('render complete.tsx', () => {
  it('render complete', () => {
    render(<Complete />);

    expect(screen.getByText(/Амжилттай үүсгэлээ./i)).toBeInTheDocument();
  });
});
