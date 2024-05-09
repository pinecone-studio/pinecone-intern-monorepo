import { render } from '@testing-library/react';
import { MorevertButtonIcon } from '../../src/assets/icons/TableMorevertIcon';

describe('TableMorevert icon test', () => {
  it('1. Should render', async () => {
    const { getByTestId } = render(<MorevertButtonIcon />);

    const icon = getByTestId('table-more-vert-icon-test-id');

    expect(icon).toBeDefined();
  });
});
