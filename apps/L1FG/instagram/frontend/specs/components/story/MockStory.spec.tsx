import { StoriesMock } from '@/components/story/MockStory';
import { render } from '@testing-library/react';
describe('StoriesMock ', () => {
  it('Should render', () => {
    render(<StoriesMock />);
  });
});
