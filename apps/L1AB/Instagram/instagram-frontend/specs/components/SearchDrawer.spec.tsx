import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SearchDrawer } from '@/components/SearchDrawer';

const mockToggleDrawer = jest.fn();

const sampleProps = {
  isOpen: true,
  toggleSearchDrawer: mockToggleDrawer,
};

const sampleProps1 = {
  isOpen: false,
  toggleSearchDrawer: mockToggleDrawer,
};

describe('SearchDrawer', () => {
  it('should render successfully', () => {
    render(<SearchDrawer {...sampleProps} />);

    expect(mockToggleDrawer);
  });

  it('should render successfully', () => {
    render(<SearchDrawer {...sampleProps1} />);

    expect(mockToggleDrawer);
  });
});
