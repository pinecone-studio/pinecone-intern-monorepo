import { render } from '@testing-library/react';
import { ArchiveButtonIcon } from '../../src/assets/icons/ArchiveButtonIcon';

describe('ArchiveButton icon test', () => {
  it('1. Should render', async () => {
    const { getByTestId } = render(<ArchiveButtonIcon />);

    const icon = getByTestId('archive-button-icon-test-id');

    expect(icon).toBeDefined();
  });
});
