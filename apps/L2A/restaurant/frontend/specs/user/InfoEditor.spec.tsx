import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { InfoEditor } from '@/app/user/_components/InfoEditor';

describe('InfoEditor', () => {
  it('renders label and value correctly', () => {
    render(<InfoEditor label="Имэйл хаяг:" value="test@example.com" />);
    
    expect(screen.getByText('Имэйл хаяг:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('calls onEditClick when edit icon is clicked', () => {
    const handleClick = jest.fn();
    render(<InfoEditor label="Утас:" value="99780680" onEditClick={handleClick} />);
    
    const editIcon = screen.getByTestId('edit-icon');
    fireEvent.click(editIcon);
    expect(handleClick).toHaveBeenCalledTimes(1);    

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders bottom border if withBorder is true', () => {
    render(<InfoEditor label="Имэйл хаяг:" value="test@example.com" withBorder />);
    const border = screen.getByTestId('info-editor-border');
    expect(border).toBeInTheDocument();
  });
  
  it('does not render bottom border if withBorder is false', () => {
    const { queryByTestId } = render(
      <InfoEditor label="Имэйл хаяг:" value="test@example.com" />
    );
    expect(queryByTestId('info-editor-border')).toBeNull();
  });
  
});
