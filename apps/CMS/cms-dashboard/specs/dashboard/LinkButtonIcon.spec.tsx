import { render } from '@testing-library/react';
import { LinkButtonIcon } from '../../src/assets/icons/LinkButtonIcon';

describe('LinkButton icon test', () => {
  it('1. Should render', async () => {
    const { getByTestId } = render(<LinkButtonIcon />);

    const icon = getByTestId('link-button-icon-test-id');

    expect(icon).toBeDefined();
  });
});
