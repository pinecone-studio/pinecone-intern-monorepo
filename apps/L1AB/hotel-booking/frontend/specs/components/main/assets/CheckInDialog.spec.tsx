import { CheckInDialog } from '@/components/main/assets';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main ViewRulesDialog', () => {
  it('should render the main ViewRules Dialog ', () => {
    render(<CheckInDialog />);
  });
});
