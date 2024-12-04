import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonGroup from '@/components/main/assets/ChooseRoomButtonGroup';


describe('ButtonGroup Component', () => {
  it('renders buttons correctly and displays the selected label', () => {
    const mockOnSelect = jest.fn();
    render(<ButtonGroup selected="All rooms" onSelect={mockOnSelect} />);

    const buttons = screen.getByTestId('button-0');
    fireEvent.click(buttons);


  });

});

