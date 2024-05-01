import React from 'react';
import { render } from '@testing-library/react';
import { NavigateLink } from '../../src/app/dashboard/_components/NavigateLink';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));
describe('NavigateLink component test', () => {
  it('1. Should render this component', () => {
    const { getByTestId } = render(<NavigateLink text="test text" myPathName="/test" />);

    const LinkElement = getByTestId('navigate-link-test-id');
    expect(LinkElement).toBeDefined();
  });
  it('2. Should check pathName pathName', () => {
    render(<NavigateLink text="test text" myPathName="/" />);
  });
});
