import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { GeneralInfoDialog } from '../../../../src/components/admin/dialogs/GeneralInfoDialog';

describe('Admin General Info Dialog', () => {
  it('should render the GeneralInfoDialog', () => {
    render(<GeneralInfoDialog />);
  });
});
