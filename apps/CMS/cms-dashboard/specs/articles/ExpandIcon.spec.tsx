import { render } from '@testing-library/react';
import { ExpandIcon } from '../../src/assets/icons/ExpandIcon';

describe('It should render expand icon', () => {
  it('It should check expand icon exists', () => {
    const { container } = render(<ExpandIcon />);
    expect(container).toBeDefined();
  });
});
