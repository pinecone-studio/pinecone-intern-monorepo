import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { AddClassModal } from '../../src/app/class/_features/AddClassModal';
import { GetClassesDocument, CreateClassDocument } from '../../src/generated';
import { ClassType } from '../../src/generated/index';
import '@testing-library/jest-dom';

const mocks = [
  {
    request: {
      query: CreateClassDocument,
      variables: {
        input: {
          name: 'JavaScript Basics',
          teachers: ['John Doe', 'Jane Smith'],
          startDate: '2024-09-01',
          endDate: '2024-12-15',
          classType: ClassType.Coding,
        },
      },
    },
    result: {
      data: {
        createClass: {
          __typename: 'Class', // Add this line
          id: '1', // Add this line if it's expected in the response
          name: 'JavaScript Basics',
          teachers: ['John Doe', 'Jane Smith'],
          startDate: '2024-09-01',
          endDate: '2024-12-15',
          classType: ClassType.Coding,
        },
      },
    },
  },
  {
    request: {
      query: GetClassesDocument,
    },
    result: {
      data: {
        getClasses: [
          {
            name: 'JavaScript Basics',
            teachers: ['John Doe', 'Jane Smith'],
            startDate: '2024-09-01',
            endDate: '2024-12-15',
            classType: ClassType.Coding,
          },
        ],
      },
    },
  },
];

describe('AddClassModal', () => {
  const mockOnOpenChange = jest.fn();

  const renderComponent = (open = true) => {
    render(
      <MockedProvider mocks={mocks as any} addTypename={false}>
        <AddClassModal open={open} onOpenChange={mockOnOpenChange} />
      </MockedProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when open is true', () => {
    renderComponent();
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-header')).toHaveTextContent('Анги нэмэх');
  });

  it('does not render the modal when open is false', () => {
    renderComponent(false);
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('renders all form fields', () => {
    renderComponent();
    expect(screen.getByTestId('class-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('teacher1-input')).toBeInTheDocument();
    expect(screen.getByTestId('teacher2-input')).toBeInTheDocument();
    expect(screen.getByTestId('start-date-input')).toBeInTheDocument();
    expect(screen.getByTestId('end-date-input')).toBeInTheDocument();
    expect(screen.getByTestId('class-type-radio-group')).toBeInTheDocument();
  });

  it('validates form fields on submission', async () => {
    renderComponent();

    // Submit the form without filling any fields
    fireEvent.click(screen.getByTestId('submit-button'));

    // Wait for and check error messages
    await waitFor(() => {
      expect(screen.getByText('Class name is required')).toBeInTheDocument();
      expect(screen.getAllByText('Teacher name is required')).toHaveLength(2);
      expect(screen.getByText('Start date is required')).toBeInTheDocument();
      expect(screen.getByText('End date is required')).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    renderComponent();

    await userEvent.type(screen.getByTestId('class-name-input'), 'JavaScript Basics');
    await userEvent.type(screen.getByTestId('teacher1-input'), 'John Doe');
    await userEvent.type(screen.getByTestId('teacher2-input'), 'Jane Smith');
    await userEvent.type(screen.getByTestId('start-date-input'), '2024-09-01');
    await userEvent.type(screen.getByTestId('end-date-input'), '2024-12-15');

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('changes class type when radio buttons are clicked', async () => {
    renderComponent();

    const codingRadio = screen.getByTestId('coding-radio-button');
    const designRadio = screen.getByTestId('design-radio-button');

    expect(codingRadio).toBeChecked();
    expect(designRadio).not.toBeChecked();

    await userEvent.click(designRadio);

    expect(codingRadio).not.toBeChecked();
    expect(designRadio).toBeChecked();
  });

  it('resets form on successful submission', async () => {
    renderComponent();

    await userEvent.type(screen.getByTestId('class-name-input'), 'JavaScript Basics');
    await userEvent.type(screen.getByTestId('teacher1-input'), 'John Doe');
    await userEvent.type(screen.getByTestId('teacher2-input'), 'Jane Smith');
    await userEvent.type(screen.getByTestId('start-date-input'), '2024-09-01');
    await userEvent.type(screen.getByTestId('end-date-input'), '2024-12-15');

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('class-name-input')).toHaveValue('');
      expect(screen.getByTestId('teacher1-input')).toHaveValue('');
      expect(screen.getByTestId('teacher2-input')).toHaveValue('');
      expect(screen.getByTestId('start-date-input')).toHaveValue('');
      expect(screen.getByTestId('end-date-input')).toHaveValue('');
      expect(screen.getByTestId('coding-radio-button')).toBeChecked();
    });
  });

  it('displays the correct labels for form fields', () => {
    renderComponent();

    expect(screen.getByText('Ангийн нэр')).toBeInTheDocument();
    expect(screen.getByText('Багш 1-н нэр')).toBeInTheDocument();
    expect(screen.getByText('Багш 2-н нэр')).toBeInTheDocument();
    expect(screen.getByText('Эхлэх огноо')).toBeInTheDocument();
    expect(screen.getByText('Дуусах огноо')).toBeInTheDocument();
    expect(screen.getByText('Кодинг анги')).toBeInTheDocument();
    expect(screen.getByText('Дизайн анги')).toBeInTheDocument();
  });

  it('displays the save button with correct text', () => {
    renderComponent();

    const saveButton = screen.getByTestId('submit-button');
    expect(saveButton).toHaveTextContent('Хадгалах');
  });
});
