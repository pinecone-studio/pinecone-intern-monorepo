import { Tinder } from '../../../src/components/common/Tinder';
import { render } from '@testing-library/react';

describe('Tinder text', () => {
  it('should render successfully ', async () => {
    render(<Tinder />);
  });
});
