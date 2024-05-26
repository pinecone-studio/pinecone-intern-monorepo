import { DroppedListItem } from '@/app/dashboard/_components/DroppedListItem';
import { render } from '@testing-library/react';

describe('dropped list item', () => {
  it('1. Should render dropped list item component', () => {
    const mockIcon = <span data-testid="mock-icon">icon</span>;
    const mockText = 'Test Item';
    const mockTestId = 'dropped-list-item';
    const mockOnClick = jest.fn();
    const { getByTestId } = render(<DroppedListItem text={mockText} icon={mockIcon} testId={mockTestId} onClick={mockOnClick} />);
    const listItem = getByTestId(mockTestId);
    expect(listItem).toBeDefined();
  });
});
