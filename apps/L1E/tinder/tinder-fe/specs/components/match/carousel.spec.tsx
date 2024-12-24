import { CarouselUser } from '@/components/match/Carousel';
import { fireEvent, render, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';

jest.mock('@/components/ui/carousel', () => ({
  ...jest.requireActual('@/components/ui/carousel'),
  CarouselContent: ({ children }: PropsWithChildren) => {
    return <div>{children}</div>;
  },
}));

describe('CarouselUser Component', () => {
  it('renders the component and displays profiles correctly', () => {
    render(<CarouselUser />);
  });
  it('should open match popup when "Match" button is clicked', () => {
    render(<CarouselUser />);
    expect(screen.getByTestId('matchPopup'));
    const button = screen.getByTestId('matchPopup');
    expect(button);
    fireEvent.click(button);
    fireEvent.click(screen.getByTestId('CloseBtn'));
  });
});
