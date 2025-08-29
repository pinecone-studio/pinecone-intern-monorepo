import { MainHeader } from '@/components/MainHeader';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('MainHeader', () => {
  it('renders without crashing', () => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    render(<MainHeader />);
  });

  it('calls router.push("/home") when logo is clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    const { getByTestId } = render(<MainHeader />);
    const logo = getByTestId('tinder-logo');

    fireEvent.click(logo);
    expect(pushMock).toHaveBeenCalledWith('/home');
  });
});
