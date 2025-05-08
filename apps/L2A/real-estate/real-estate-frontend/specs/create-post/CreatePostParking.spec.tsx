import React from 'react';
import { CreatePostParking } from '@/app/create-post/_components/CreatePostParking';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, _value, onValueChange }: any) => (
    <div data-testid="select" onClick={() => onValueChange('yes')}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value, ...props }: any) => (
    <div {...props} data-value={value}>
      {children}
    </div>
  ),
  SelectGroup: ({ children }: any) => <div>{children}</div>,
}));

describe('CreatePostParking', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('should calls onChange when an option is selected', async () => {
    const handleChange = jest.fn();

    render(<CreatePostParking name="parking" value="" onChange={handleChange} />);

    const trigger = screen.getByTestId('parking');
    await userEvent.click(trigger);

    const option = await screen.findByText('Байхгүй');
    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('yes');
  });

  it('should renders selected value correctly', () => {
    render(<CreatePostParking name="parking" value="yes" onChange={jest.fn()} />);
    expect(screen.getByText('Байхгүй')).toBeInTheDocument();
  });

  it('should renders with error styles when error prop is provided', () => {
    const { container } = render(<CreatePostParking name="parking" value="" onChange={jest.fn()} error="Алдаа гарлаа" />);

    const trigger = container.querySelector('#parking');
    expect(trigger).toHaveClass('border-red-500');
    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });

  it('should renders invisible placeholder error space when no error is given', () => {
    render(<CreatePostParking name="parking" value="" onChange={jest.fn()} />);
    const placeholder = screen.getByText('placeholder');
    expect(placeholder).toHaveClass('invisible');
  });
});
