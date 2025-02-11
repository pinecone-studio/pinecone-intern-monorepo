import { PostDate } from '@/components/home-post/PostDate';
import { render } from '@testing-library/react';

describe('PostDate', () => {
  it('Should render', () => {
    render(<PostDate date={Date.now()} />);
  });
});
