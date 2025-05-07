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

    const option = await screen.findByText((content, element) => {
      return element?.textContent === 'Орон сууц';
    });

    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('apartment');
  });

  it('renders selected value correctly', () => {
    render(<CreatePostType name="type" value="house" onChange={jest.fn()} />);
    expect(screen.getByText('Хувийн сууц')).toBeInTheDocument();
  });

  it('renders with error styles when error prop is true', () => {
    const { container } = render(<CreatePostType name="type" value="house" onChange={jest.fn()} error={true} />);
    expect(container.querySelector('.border-destructive')).toBeInTheDocument();
  });
});
