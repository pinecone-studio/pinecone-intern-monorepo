import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostType } from '@/app/create-post/_components/CreatePostType';

describe('CreatePostType', () => {
  it('renders label and placeholder correctly', () => {
    render(<CreatePostType name="type" value="" onChange={jest.fn()} />);

    expect(screen.getByLabelText('Төрөл')).toBeInTheDocument();
    expect(screen.getByText('Сонгоно уу')).toBeInTheDocument();
  });

  it('shows options when triggered', async () => {
    render(<CreatePostType name="type" value="" onChange={jest.fn()} />); 

    const trigger = screen.getByRole('button');
    fireEvent.mouseDown(trigger);

    expect(await screen.findByText('Орон сууц')).toBeInTheDocument();
    expect(screen.getByText('Хувийн сууц')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();

    render(<CreatePostType name="type" value="apartment" onChange={handleChange} />); 

    const trigger = screen.getByRole('button');
    fireEvent.mouseDown(trigger);

    const option = screen.getByText('Орон сууц');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('apartment');
  });

  it('renders error message when error is passed', () => {
    render(<CreatePostType name="type" value="" onChange={jest.fn()} error="Төрөл сонгоно уу" />);

    expect(screen.getByText('Төрөл сонгоно уу')).toBeInTheDocument();
  });
});
