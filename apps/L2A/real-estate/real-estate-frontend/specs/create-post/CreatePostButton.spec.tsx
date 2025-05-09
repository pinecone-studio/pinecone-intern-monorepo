import { render, screen } from '@testing-library/react';
import { CreatePostButton } from '@/app/create-post/_components/CreatePostButton';
import '@testing-library/jest-dom';

describe('CreatePostButton component', () => {
  it('should renders main texts correctly', () => {
    render(<CreatePostButton />);
    expect(screen.getByText('Хэрэглэгчдэд харагдах')).toBeInTheDocument();
    expect(screen.getByText('Таны оруулсан мэдээлэл хэрэглэгчдэд харагдах үзүүлэлт')).toBeInTheDocument();
  });

  it('should renders picture section', () => {
    render(<CreatePostButton />);
    expect(screen.getByText('picture')).toBeInTheDocument();
  });

  it('should renders both buttons with correct text', () => {
    render(<CreatePostButton />);
    expect(screen.getByRole('button', { name: 'Зар оруулах хүсэлт илгээх' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Хадгалаад гарах' })).toBeInTheDocument();
  });
});
