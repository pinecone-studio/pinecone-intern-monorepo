// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import RoleModal from '../../src/app/users/components/RoleModal';

// describe('RoleModal Component', () => {
//   test('renders the RoleModal component', () => {
//     render(<RoleModal />);
//     const editButton = screen.getByRole('button');
//     expect(editButton).toBeInTheDocument();
//   });

//   test('opens the dialog on trigger button click', () => {
//     render(<RoleModal />);
//     const editButton = screen.getByRole('button');
//     fireEvent.click(editButton);

//     const dialogTitle = screen.getByText('Edit roles');
//     expect(dialogTitle).toBeInTheDocument();

//     const dialogDescription = screen.getByText('ID:901923101');
//     expect(dialogDescription).toBeInTheDocument();
//   });

//   test('contains role selection and save button', () => {
//     render(<RoleModal />);
//     const editButton = screen.getByRole('button');
//     fireEvent.click(editButton);

//     const selectTrigger = screen.getByText('Select roles');
//     expect(selectTrigger).toBeInTheDocument();

//     const saveButton = screen.getByText('Save changes');
//     expect(saveButton).toBeInTheDocument();
//   });

//   test('selects a role from the dropdown', async () => {
//     render(<RoleModal />);
//     const editButton = screen.getByRole('button');
//     fireEvent.click(editButton);

//     const selectTrigger = screen.getByText('Select roles');
//     fireEvent.mouseDown(selectTrigger);

//     await waitFor(() => {
//       expect(screen.getByText('Admin')).toBeInTheDocument();
//     });

//     fireEvent.click(screen.getByText('Admin'));

//     await waitFor(() => {
//       expect(screen.getByText('Admin')).toBeInTheDocument();
//     });
//   });
// });