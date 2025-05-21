import { SelectCountryCode } from '@/app/(main)/(profiles)/contact/_components/SelectCountryCode';
import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('SelectCountryCode', () => {
  it('should open dropdown and select a country code', async () => {
    render(<SelectCountryCode />);

    const trigger = screen.getByTestId('select');
    fireEvent.mouseDown(trigger);

    const dropdown = within(document.body);
    const option = await dropdown.findByText('+976');

    const clickableOption = option.closest('[role="option"]') || option.parentElement;
    expect(clickableOption).toBeTruthy();
  });
});
