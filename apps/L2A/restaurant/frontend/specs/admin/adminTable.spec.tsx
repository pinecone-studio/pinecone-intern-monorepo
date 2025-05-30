import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useGetAllTablesQuery } from '@/generated';
import '@testing-library/jest-dom';
import AdminTableList from '@/app/admin/table/_features/AdminTableList';

// 1. MOCK THE HOOK
jest.mock('@/generated', () => ({
  useGetAllTablesQuery: jest.fn(),
}));

// 2. TEST DATA
const mockTables = [
  {
    _id: '1',
    name: 'Table 1',
    qrCodeUrl: 'https://example.com/qr1',
    createdAt: '2023-01-01',
  },
];

// 3. SETUP
beforeEach(() => {
  (useGetAllTablesQuery as jest.Mock).mockReturnValue({
    data: {
      getAllTables: mockTables,
    },
  });
});

// 4. BASIC RENDER TEST
test('renders table list with name', async () => {
  render(<AdminTableList />);

  expect(await screen.findByTestId('classroom-name-1')).toHaveTextContent('Table 1');
});

// 5. EDIT DIALOG TEST
test('opens edit dialog and types a name', async () => {
  render(<AdminTableList />);

  // Open dialog
  fireEvent.click(await screen.findByTestId('classroom-1-edit-button'));

  // Wait for input inside dialog
  const input = await screen.findByTestId('classroom-1-input');

  // Change input value
  fireEvent.change(input, { target: { value: 'Шинэ нэр' } });

  expect(input).toHaveValue('Шинэ нэр');

  // Click update button
  fireEvent.click(screen.getByTestId('classroom-1-update-button'));

  // We can mock console.log to test it later
  await waitFor(() => {
    expect(screen.getByTestId('classroom-1-update-button')).toBeInTheDocument();
  });
});
