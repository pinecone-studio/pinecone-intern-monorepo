import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GeneralInfo } from '@/components/admin/ui/add-hotel';

describe('GeneralInfo Component', () => {
  it('renders GeneralInfo successfully', () => {
    render(<GeneralInfo />);
  });
});
