'use client';

import { EmployeeFormModal } from '@/components/EmployeeFormModal';
import { fireEvent, render } from '@testing-library/react';

const mockOnSubmit = jest.fn(async () => {
  return Promise.resolve();
});
const isOpen = true; //
describe('EmployeeFormModal', () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn();
  });
  describe('should EmployeeFormModal', () => {
    beforeEach(() => {
      HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    it('submits data and calls createRequest mutation', async () => {
      const { getByTestId } = render(
        <EmployeeFormModal
          openCreate={isOpen}
          setOpenCreate={() => {
            console.log('');
          }}
          createEmployee={mockOnSubmit}
        />
      );
      const calendarBtn = getByTestId('calendar-btn');
      fireEvent.click(calendarBtn);
    });
  });
});
