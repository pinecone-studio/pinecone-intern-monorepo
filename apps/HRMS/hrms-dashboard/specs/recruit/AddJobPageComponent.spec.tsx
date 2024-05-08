import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // Import useRouter from 'next/navigation'
import { AddJobPageComponent, Input, TextArea } from '../../src/app/recruiting/_components';
import { CreatedSvg, LeftArrow } from '../../src/app/asset';
import { useRouter } from 'next/navigation';

const useRouterMock = useRouter as jest.Mock;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('AddJobPageComponent', () => {
  test('renders correctly', () => {
    // Mock the router object with a push function
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(<AddJobPageComponent />);
    expect(() => getByTestId('title')).not.toThrow();
    expect(() => getByTestId('back-button')).not.toThrow();
    expect(() => getByTestId('modal-button')).not.toThrow();
  });

  test('back button navigates to /recruiting', () => {
    // Mock the router object with a push function
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(<AddJobPageComponent />);
    fireEvent.click(getByTestId('back-button'));
    expect(mockPush).toHaveBeenCalledWith('/recruiting');
  });
});

// Test Input and TextArea components
describe('Input and TextArea components', () => {
  test('Input renders correctly', () => {
    const { getByLabelText } = render(<Input label="Label" placeholder="Placeholder" />);
    expect(getByLabelText('Label')).toBeDefined();
  });

  test('TextArea renders correctly', () => {
    const { getByLabelText } = render(<TextArea label="Label" placeholder="Placeholder" />);
    expect(getByLabelText('Label')).toBeDefined();
  });
});

describe('Arrow svg', () => {
  it('renders LeftArrow svg correctly', () => {
    const { getByTestId } = render(<LeftArrow />);
    const svgElement = getByTestId('left-arrow');
    expect(svgElement).toBeDefined();
  });
});
describe('CreateSVG', () => {
  it('renders CreatedSvg correctly', () => {
    const { getByTestId } = render(<CreatedSvg />);
    const svgElement = getByTestId('created-svg');
    expect(svgElement).toBeDefined();
  });
});
