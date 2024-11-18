import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { UserContact } from '@/components/main';

describe('Main User Contact', () => {
  it('should render the main user contact', () => {
    render(<UserContact />);
  });
});
