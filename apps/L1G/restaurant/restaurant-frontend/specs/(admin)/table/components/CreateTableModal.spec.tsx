import { CreateTableModal } from '@/components/table/CreateTableModal';
import { CreateTableDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
const refetchMock = jest.fn();

const createTableMock: MockedResponse = {
  request: {
    query: CreateTableDocument,
    variables: {
      input: {
        tableName: '2A',
      },
    },
  },
  result: {
    data: {
      createTable: {
        tableName: '2A',
        tableQr: 'testQr',
        tableId: 'testId',
      },
    },
  },
};

const createTableApolloErrorMock: MockedResponse = {
  request: {
    query: CreateTableDocument,
    variables: {
      input: {
        tableName: '2A',
      },
    },
  },
  error: new Error('table already exists'),
};

describe('createTableModal', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[createTableMock]}>
        <CreateTableModal refetch={refetchMock} />
      </MockedProvider>
    );
  });
  it('should throw an error message if user not enters table name', async () => {
    const DialogTrigger = screen.getByTestId('Admin-Create-Table-Dialog-Trigger');
    act(() => {
      fireEvent.click(DialogTrigger);
    });
    const DialogContainer = screen.getByTestId('admin-table-dialog-container');
    expect(DialogContainer).toBeDefined();

    const DialogInput = screen.getByTestId('Admin-Create-Table-Input');
    act(() => {
      fireEvent.change(DialogInput, { target: { value: '' } });
    });
    const DialogSubmit = screen.getByTestId('Admin-Create-Table-Button');
    act(() => {
      fireEvent.click(DialogSubmit);
    });
    await waitFor(() => {
      const DialogInputError = screen.getByTestId('Admin-Create-Table-Error-Message');
      expect(DialogInputError).toBeDefined();
    });
  });

  it('should throw an error message if user enters invalid table name', async () => {
    const DialogTrigger = screen.getByTestId('Admin-Create-Table-Dialog-Trigger');
    act(() => {
      fireEvent.click(DialogTrigger);
    });
    const DialogContainer = screen.getByTestId('admin-table-dialog-container');
    expect(DialogContainer).toBeDefined();

    const DialogInput = screen.getByTestId('Admin-Create-Table-Input');
    act(() => {
      fireEvent.change(DialogInput, { target: { value: '999999999999' } });
    });
    const DialogSubmit = screen.getByTestId('Admin-Create-Table-Button');
    act(() => {
      fireEvent.click(DialogSubmit);
    });
    await waitFor(() => {
      const DialogInputError = screen.getByTestId('Admin-Create-Table-Error-Message');
      expect(DialogInputError).toBeDefined();
    });
  });

  it('should create table and display success toast if user enters valid table name', async () => {
    const DialogTrigger = screen.getByTestId('Admin-Create-Table-Dialog-Trigger');
    act(() => {
      fireEvent.click(DialogTrigger);
    });
    const DialogContainer = screen.getByTestId('admin-table-dialog-container');
    expect(DialogContainer).toBeDefined();

    const DialogInput = screen.getByTestId('Admin-Create-Table-Input');
    act(() => {
      fireEvent.change(DialogInput, { target: { value: '2A' } });
    });
    const DialogSubmit = screen.getByTestId('Admin-Create-Table-Button');
    act(() => {
      fireEvent.click(DialogSubmit);
    });

    const toastMessage = await screen.findByText('2A Ширээ амжилттай үүслээ');

    expect(toastMessage).toBeDefined();
  });
});

describe('createTableModalError', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[createTableApolloErrorMock]}>
        <CreateTableModal refetch={refetchMock} />
      </MockedProvider>
    );
  });
  it('should display error toast if user enters exist table name', async () => {
    const DialogTrigger = screen.getByTestId('Admin-Create-Table-Dialog-Trigger');
    act(() => {
      fireEvent.click(DialogTrigger);
    });
    const DialogContainer = screen.getByTestId('admin-table-dialog-container');
    expect(DialogContainer).toBeDefined();

    const DialogInput = screen.getByTestId('Admin-Create-Table-Input');
    act(() => {
      fireEvent.change(DialogInput, { target: { value: '2A' } });
    });
    const DialogSubmit = screen.getByTestId('Admin-Create-Table-Button');

    act(() => {
      fireEvent.click(DialogSubmit);
    });

    const toastMessage = await screen.findByText('Ширээ үүссэн байна! өөр нэр сонгоно уу');
    expect(toastMessage).toBeDefined();
  });
});
