import { HeaderPart } from '@/components/header/Header';
import { render } from '@testing-library/react';
describe('HeaderPart', () => {
  it('HeaderPart render successfully', async () => {
    render(<HeaderPart />);
  });
});
