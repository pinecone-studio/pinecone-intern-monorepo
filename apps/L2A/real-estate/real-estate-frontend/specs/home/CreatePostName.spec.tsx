import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CreatePostName } from '@/app/create-post/_components/CreatePostName';

describe('CreatePostName', () => {
  it('renders input and updates value when typed', async () => {
    render(<CreatePostName/>);
    const input = screen.getByTestId('Name');

    expect(input).toBeInTheDocument(); 

    await userEvent.type(input, 'Name');

    expect(input).toHaveValue('Name');
  });
});
