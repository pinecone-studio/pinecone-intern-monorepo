import { EstateHome } from '@/components/estatesPage/EstateHome';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render successfully', () => {
    render(<EstateHome />);
  });
});
