import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { GeneralInfoDialog } from '../../../../src/components/admin/dialogs/GeneralInfoDialog';

describe('Admin GeneralInfoDialog', () => {
  it('should render the GeneralInfoDialog', () => {
    render(<GeneralInfoDialog />);
  });
});
