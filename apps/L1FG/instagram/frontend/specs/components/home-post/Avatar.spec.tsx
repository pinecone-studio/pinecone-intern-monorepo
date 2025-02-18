import { Avatar } from '@/components/home-post/Avatar';
import { render, screen } from '@testing-library/react';
type ImageProps = {
  src: string;
  alt: string;
  fill: boolean;
  className: string;
};
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, className, ...props }: ImageProps) => {
    const fillClasses = fill ? 'absolute inset-0 h-full w-full object-cover' : '';
    const combinedClasses = `${fillClasses} ${className || ''}`;
    return <img src={src} data-testid="next-image" className={combinedClasses} {...props} />;
  },
}));
describe('Avatar', () => {
  it('Should render avatar that has no story', () => {
    render(<Avatar hasStoryToSee={false} image={'hi'} />);
    expect(screen.getByTestId('next-image')).toBeDefined();
  });
  it('SHould render avatar that has story', () => {
    render(<Avatar hasStoryToSee={false} image={'hi'} />);
    expect(screen.getByTestId('next-image')).toBeDefined();
  });
});
