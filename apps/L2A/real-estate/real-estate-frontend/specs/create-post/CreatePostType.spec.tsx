import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreatePostType } from '@/app/create-post/_components/CreatePostType';
import '@testing-library/jest-dom';
window.HTMLElement.prototype.hasPointerCapture = () => false;
// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = () => {};

describe('CreatePostType component (Shadcn)', () => {
  const mockOnChange = jest.fn();

  const setup = (props = {}) => {
    render(
      <CreatePostType
        name="type"
        value=""
        onChange={mockOnChange}
        {...props}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders label and placeholder', () => {
    setup();
    expect(screen.getByLabelText('Төрөл')).toBeInTheDocument();
    expect(screen.getByText('Сонгоно уу')).toBeInTheDocument();
  });

  test('shows options and selects "APARTMENT"', async () => {
    setup();
    const user = userEvent.setup();
    await user.click(screen.getByTestId('type'));

    const apartmentOption = await screen.findByRole('option', { name: /APARTMENT/i });
    await user.click(apartmentOption);

    expect(mockOnChange).toHaveBeenCalledWith('APARTMENT');
  });

  test('shows error message when error prop is passed', () => {
    setup({ error: 'Field is required' });

    expect(screen.getByText('Field is required')).toBeInTheDocument();
    expect(screen.getByTestId('type')).toHaveClass('border-red-500');
  });

  test('renders placeholder paragraph when no error', () => {
    setup();
    const placeholder = screen.getByText('placeholder');
    expect(placeholder).toHaveClass('invisible');
  });

  test('can select "house" and fire onChange', async () => {
    setup();
    const user = userEvent.setup();
    await user.click(screen.getByTestId('type'));

    const houseOption = await screen.findByRole('option', { name: /Хувийн сууц/i });
    await user.click(houseOption);

    expect(mockOnChange).toHaveBeenCalledWith('house');
  });
});
