import '@testing-library/jest-dom';
import { PostsSwiper } from '@/components/home-post/PostsSwiper';
import { render, screen } from '@testing-library/react';
import { mockPost } from './mock';
import { PropsWithChildren } from 'react';

const mockPostImages = [[], ['image1.jpg'], ['image1.jpg', 'image2.jpg', 'image3.jpg']];
const mockPosts = mockPostImages.map((images) => {
  const newPost = {
    ...mockPost,
    node: { ...mockPost.node, postImage: images, carouselMediaCount: images.length },
  };
  return newPost;
});
type ImageProps = {
  src: string;
  alt: string;
  fill: boolean;
  className: string;
};
jest.mock('swiper/css', () => null);
jest.mock('swiper/css/navigation', () => null);
jest.mock('swiper/css/pagination', () => null);
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, className, ...props }: ImageProps) => {
    const fillClasses = fill ? 'absolute inset-0 h-full w-full object-cover' : '';
    const combinedClasses = `${fillClasses} ${className || ''}`;
    return <img src={src} data-testid="post-image" className={combinedClasses} {...props} />;
  },
}));
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: PropsWithChildren) => {
    return <div data-testid="swiper">{children}</div>;
  },
  SwiperSlide: ({ children }: PropsWithChildren) => {
    return <div data-testid="swiper-slide">{children}</div>;
  },
}));
jest.mock('swiper/modules', () => () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));
describe('Posts swiper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Should render empty', () => {
    const { queryByTestId } = render(<PostsSwiper post={mockPosts[0]} />);
    expect(queryByTestId('post-carousel')).toBeNull();
  });
  it('Should render one image', () => {
    render(<PostsSwiper post={mockPosts[1]} />);
    const postImages = screen.getAllByTestId('post-image');
    expect(postImages).toHaveLength(1);
    expect(postImages[0]).toHaveAttribute('src', 'image1.jpg');
  });
  it('SHould render three images', () => {
    render(<PostsSwiper post={mockPosts[2]} />);
    const postImages = screen.getAllByTestId('post-image');
    expect(postImages).toHaveLength(3);
    expect(postImages[0]).toHaveAttribute('src', 'image1.jpg');
  });
});
