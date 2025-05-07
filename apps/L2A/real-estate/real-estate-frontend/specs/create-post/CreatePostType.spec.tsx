import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreatePostType } from '@/app/create-post/_components/CreatePostType';
import '@testing-library/jest-dom';

describe('CreatePostType', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('calls onChange when an option is selected', async () => {
    const handleChange = jest.fn();

    render(<CreatePostType name="type" value="" onChange={handleChange} />);

    const trigger = screen.getByTestId('type');
    await userEvent.click(trigger);

    const option = await screen.findByText('Орон сууц');
    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('apartment');
  });

  it('renders selected value correctly', () => {
    render(<CreatePostType name="type" value="house" onChange={() => {}} />);
    expect(screen.getByText('Хувийн сууц')).toBeInTheDocument();
  });

  it('renders with error styles when error prop is provided', () => {
    const { container } = render(<CreatePostType name="type" value="" onChange={() => {}} error="Алдаа гарлаа" />);

    const trigger = container.querySelector(`#type`);
    expect(trigger).toHaveClass('border-red-500');

    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });

  it('renders invisible placeholder error space when no error is given', () => {
    render(<CreatePostType name="type" value="" onChange={() => {}} />);

    const placeholder = screen.getByText('placeholder');
    expect(placeholder).toHaveClass('invisible');
  });
});
