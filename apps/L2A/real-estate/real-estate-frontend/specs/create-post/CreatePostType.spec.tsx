import React from 'react';
import { CreatePostType } from '@/app/create-post/_components/CreatePostType';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, _value, onValueChange }: any) => (
    <div data-testid="select" onClick={() => onValueChange('apartment')}>
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

describe('CreatePostType', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('should calls onChange when an option is selected', async () => {
    const handleChange = jest.fn();

    render(<CreatePostType name="type" value="" onChange={handleChange} />);

    const trigger = screen.getByTestId('type');
    await userEvent.click(trigger);

    const option = await screen.findByText('Орон сууц');
    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('apartment');
  });

  it('should renders selected value correctly', () => {
    render(<CreatePostType name="type" value="house" onChange={jest.fn()} />);
    expect(screen.getByText('Хувийн сууц')).toBeInTheDocument();
  });

  it('should renders with error styles when error prop is provided', () => {
    const { container } = render(<CreatePostType name="type" value="" onChange={jest.fn()} error="Алдаа гарлаа" />);

    const trigger = container.querySelector('#type');
    expect(trigger).toHaveClass('border-red-500');
    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });

  it('should renders invisible placeholder error space when no error is given', () => {
    render(<CreatePostType name="type" value="" onChange={jest.fn()} />);
    const placeholder = screen.getByText('placeholder');
    expect(placeholder).toHaveClass('invisible');
  });
});
