import { DialogDemo } from '@/components/create-post/CreatePostDialog';
import { render } from '@testing-library/react';
describe('CreatePost Dialog', () => {
  it('Should render', () => {
    render(<DialogDemo />);
  });
});
