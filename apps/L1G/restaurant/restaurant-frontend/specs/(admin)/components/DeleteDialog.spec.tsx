import '@testing-library/jest-dom';
import { DeleteDialog } from '@/components/admin';
import { render } from '@testing-library/react';

const mockData = {
  title: 'delete',
  comment: 'are you sure',
  submit: 'delete',
  onClick: () => null,
  children: <div>test</div>,
};

describe('DeleteDialog', () => {
  it('should render', () => {
    render(<DeleteDialog title={mockData.title} submit={mockData.submit} comment={mockData.submit} onClick={mockData.onClick} children={mockData.children} />);
  });
});
