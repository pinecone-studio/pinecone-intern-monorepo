import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GeneralInfo } from '@/components/admin/add-room';

describe('GeneralInfo Component', () => {
  it('renders GeneralInfo successfully', () => {
    render(<GeneralInfo />);
  });
});
