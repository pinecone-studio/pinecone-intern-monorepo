import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CreateDropDownMenu } from '@/components/CreateDropDownMenu';

describe('CreateDropDownMenu', () => {
  it('sould render successfully', async () => {
    render(<CreateDropDownMenu />);
  });
});
