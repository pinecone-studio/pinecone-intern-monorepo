import '@testing-library/jest-dom';
import { DeleteDialog } from '@/components/admin';
import { render } from '@testing-library/react';

const mockDataProps = {
  title: 'delete food',
  submitText: 'delete',
  commet: 'are you sure',
  onClick: () => undefined,
  children: <div>test</div>,
};

describe('DeleteDialog', () => {
  it('should render', () => {
    const { getByText } = render(
      <DeleteDialog title={mockDataProps.title} comment={mockDataProps.commet} submitText={mockDataProps.submitText} onClick={mockDataProps.onClick}>
        {mockDataProps.children}
      </DeleteDialog>
    );

    expect(getByText('test')).toBeInTheDocument();
  });
});
