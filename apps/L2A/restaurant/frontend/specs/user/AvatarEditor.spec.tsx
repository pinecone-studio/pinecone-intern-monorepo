import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AvatarEditor } from '@/app/user/_components/AvatarEditor';
describe('AvatarEditor', () => {
  test('renders avatar with correct styles and icon', () => {
    render(<AvatarEditor />);

    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('rounded-full', 'bg-[#F4F4F5]');
    expect(avatar.querySelector('svg')).toBeInTheDocument(); 
  });

  test('renders edit button with correct styles and icon', () => {
    render(<AvatarEditor />);

    const editButton = screen.getByTestId('edit-button');
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass('cursor-pointer', 'absolute');
    expect(editButton.querySelector('svg')).toBeInTheDocument(); 
  });

  test('edit button is clickable (no-op)', () => {
    render(<AvatarEditor />);

    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton); 
    expect(editButton).toBeInTheDocument(); 
  });
});
