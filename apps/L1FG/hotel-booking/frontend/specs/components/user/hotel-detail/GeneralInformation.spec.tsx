import { GeneralInformation } from '@/components/user/hotel-detail';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('GeneralInformation', () => {
  it('should render GeneralInformation successfully', async () => {
    render(<GeneralInformation />);
  });
});
