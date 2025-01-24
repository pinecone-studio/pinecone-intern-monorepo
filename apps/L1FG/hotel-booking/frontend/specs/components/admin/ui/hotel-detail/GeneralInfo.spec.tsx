import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GeneralInfo } from '@/components/admin/ui/hotel-detail';

describe('GeneralInfo', () => {
  it('renders GeneralInfo successfully', () => {
    render(<GeneralInfo />);
  });
});
