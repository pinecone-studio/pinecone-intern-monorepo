import { render } from '@testing-library/react';
import { Icon } from '../../../src/components/common/DoneIcon';

describe('Icon svg', () => {
  it('should render successfully', async () => {
    render(<Icon />);
  });
});
