import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import AdminTableList from '@/app/admin/table/_features/AdminTableList';
import * as generatedHooks from '@/generated';

jest.mock('@/generated', () => ({
  useGetAllTablesQuery: jest.fn(),
  useDeleteTableMutation: jest.fn(),
}));

const mockDeleteTableMutation = jest.fn();

const mockTables = [
  {
    _id: '1',
    name: 'Table 1',
    createdAt: '2025-01-01',
    qrCodeUrl: 'https://example.com/qr1.png',
  },
  {
    _id: '2',
    name: 'Table 2',
    createdAt: '2025-01-02',
    qrCodeUrl: 'https://example.com/qr2.png',
  },
];

beforeEach(() => {
  (generatedHooks.useGetAllTablesQuery as jest.Mock).mockReturnValue({
    data: { getAllTables: mockTables },
  });

  (generatedHooks.useDeleteTableMutation as jest.Mock).mockReturnValue([mockDeleteTableMutation]);
});

it('renders classroom table rows', () => {
  render(<AdminTableList />);
  expect(screen.getByTestId('classroom-row-1')).toBeInTheDocument();
  expect(screen.getByTestId('classroom-row-2')).toBeInTheDocument();
});

it('deletes a table when delete button is clicked', async () => {
  render(<AdminTableList />);
  const deleteButton = screen.getByTestId('classroom-1-delete-button');

  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(mockDeleteTableMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          _id: '1',
        },
      },
    });
  });
});

it('opens dialog and updates input value', () => {
  render(<AdminTableList />);
  const editButton = screen.getByTestId('classroom-1-edit-button');

  fireEvent.click(editButton);

  const input = screen.getByTestId('classroom-1-input');
  fireEvent.change(input, { target: { value: 'Updated Table Name' } });

  expect(input).toHaveValue('Updated Table Name');
});
