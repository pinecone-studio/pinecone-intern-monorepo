import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Policies } from '@/components/admin/add-hotel';

describe('Policies Component', () => {
  it('renders Policies successfully', () => {
    render(<Policies />);
  });
});
