import { render } from '@testing-library/react';
import { ExpandIcon } from '../../src/assets/icons/ExpandIcon';

describe('should render expand icon', () => {
  it('should check expand icon exists', () => {
    const { container } = render(<ExpandIcon />);
    expect(container).toBeDefined();
  });
});
