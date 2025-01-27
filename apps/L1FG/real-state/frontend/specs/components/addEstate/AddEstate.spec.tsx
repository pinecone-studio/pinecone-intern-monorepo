import AddEstate from '@/components/addEstate/AddEstate';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render successfully', () => {
    render(<AddEstate />);
  });
});
