import { Header } from '@/components/Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetMeQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetMeQuery: jest.fn(),
}));

const mockedUseGetMeQuery = useGetMeQuery as jest.Mock;

describe('Header', () => {
  it('renders with fallback image when loading', () => {
    mockedUseGetMeQuery.mockReturnValue({ data: null, loading: true });

    render(<Header />);

    const img = screen.getByAltText(/Profile Picture/i);
    expect(img).toBeInTheDocument();
    expect(screen.getByLabelText(/Messages/i)).toBeInTheDocument();
  });

  it('renders with user image when data is available', () => {
    mockedUseGetMeQuery.mockReturnValue({
      data: { getMe: { images: ['https://example.com/avatar.png'] } },
      loading: false,
    });

    render(<Header />);

    const img = screen.getByAltText(/Profile Picture/i);
    expect(img).toHaveAttribute('src', expect.stringContaining('avatar.png'));
  });
});
