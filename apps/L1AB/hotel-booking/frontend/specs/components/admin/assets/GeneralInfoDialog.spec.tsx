import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { GeneralInfiDialog } from '../../../../src/components/admin/assets/GeneralInfiDialog';

describe('Admin GeneralInfoDialog', () => {
  it('should render the GeneralInfoDialog', () => {
    render(<GeneralInfiDialog />);
  });
});
