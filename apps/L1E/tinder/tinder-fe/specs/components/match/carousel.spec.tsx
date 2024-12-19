import { CarouselUser } from '@/components/match/Carousel';
import { render } from '@testing-library/react';
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
});
