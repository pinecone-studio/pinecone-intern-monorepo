import { imageUrlOptimizer } from '@/components/utils/image-url-optimizer';

describe('Image optimizer', () => {
  const mockImageUrlOptimizer = jest.fn((arg) => imageUrlOptimizer(arg));
  it('Should return /images/profilePic.png', () => {
    mockImageUrlOptimizer(1);
    expect(mockImageUrlOptimizer.mock.results[0].value).toBe('/images/profilePic.png');
  });
  it('Should return /images/profilePic.png', () => {
    expect(imageUrlOptimizer('hi')).toBe('/images/profilePic.png');
  });
  it('SHould return /images/profilePic.png', () => {
    expect(imageUrlOptimizer('/hi/upload')).toBe('/hi/upload/q_auto,f_auto');
  });
});
