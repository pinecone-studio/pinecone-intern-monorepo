import React from 'react';
import { render } from '@testing-library/react';
import { NavigateLinkWithIcon } from '../../src/app/dashboard/_components/NavigateLinkWithIcon';
import { AiOutlinePlus } from 'react-icons/ai';

describe('NavigateLinkWithIcon component test', () => {
  it('1. Should render this component', () => {
    const { getByTestId } = render(<NavigateLinkWithIcon text="test text" myPathName="/test" icon={<AiOutlinePlus />} />);

    const LinkElement = getByTestId('navigate-link-with-icon-test-id');
    expect(LinkElement).toBeDefined();
  });
});
