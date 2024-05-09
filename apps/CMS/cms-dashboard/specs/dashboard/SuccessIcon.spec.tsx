import { render } from '@testing-library/react';
import { SuccessIcon } from '../../src/assets/icons/SuccessIcon';

describe('Success icon test', () => {
  it('1. Should render', async () => {
    const { getByTestId } = render(<SuccessIcon />);

    const icon = getByTestId('success-icon-test-id');

    expect(icon).toBeDefined();
  });
});
