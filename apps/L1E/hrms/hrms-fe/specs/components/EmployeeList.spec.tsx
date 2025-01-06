import { render } from '@testing-library/react';
import { EmployeeList } from '@/components/EmployeeList';

describe('Leave', () => {
  it('should render ', () => {
    render(<EmployeeList />);
  });
});
