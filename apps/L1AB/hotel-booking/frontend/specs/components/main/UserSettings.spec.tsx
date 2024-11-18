import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { UserSettings } from '@/components/main';

describe('Main User Settings', () => {
  it('should render the main user settings', () => {
    render(<UserSettings />);
  });
});
