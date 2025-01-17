import Story from '@/components/story/Story';
import { render } from '@testing-library/react';
describe(' Story', () => {
  it('Should render', () => {
    render(<Story />);
  });
});
