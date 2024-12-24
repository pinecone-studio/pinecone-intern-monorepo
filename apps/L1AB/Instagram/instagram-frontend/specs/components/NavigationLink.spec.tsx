import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NavigationLink from '@/components/NavigationLink';

const sampleProps = {
  name: 'John Doe',
  children: '123,',
};
describe('NavigationLink', () => {
  it('should render successfully', async () => {
    render(<NavigationLink {...sampleProps} />);
  });

  it('should render successfully', async () => {
    const props = { ...sampleProps, href: '', onClick: jest.fn() };
    render(<NavigationLink {...props} />);
  });
});
