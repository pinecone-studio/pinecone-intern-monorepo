import React from 'react';
import { render } from '@testing-library/react';
import { FooterButtonWithIcon } from '../../src/app/dashboard/_components/FooterButtonWithIcon';
import AddIcon from '@mui/icons-material/Add';

describe('FooterButtonWithIcon', () => {
  it('should render with correct text and icon', () => {
    const text = 'Test Button';
    const icon = <AddIcon />;

    const { getByText, getByTestId } = render(<FooterButtonWithIcon text={text} icon={icon} />);

    expect(getByText(text)).toBeDefined();

    expect(getByTestId('footer-button-with-icon-test-id')).toBeDefined();
  });
});
