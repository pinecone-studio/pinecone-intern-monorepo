import { EmergencyContact } from '@/features/user/profile/EmergencyContact';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('EmergencyContact', () => {
  it('should render Booked successfully', async () => {
    render(<EmergencyContact />);
  });
});
