import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // Import useRouter from 'next/navigation'
import { EditJob, Input, TextArea } from '../../src/app/recruiting/_components/index';
import { CreatedSvg } from '../../src/assets';
import { useRouter } from 'next/navigation';
import { LeftArrow } from '../../src/app/asset';

const useRouterMock = useRouter as jest.Mock;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('EditJob', () => {
  test('renders correctly', () => {
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(<EditJob />);
    expect(() => getByTestId('title')).not.toThrow();
    expect(() => getByTestId('back-button')).not.toThrow();
    expect(() => getByTestId('modal-button')).not.toThrow();
  });

  test('back button navigates to /recruiting/job-detail', () => {
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(<EditJob />);
    fireEvent.click(getByTestId('back-button'));
    expect(mockPush).toHaveBeenCalledWith('/recruiting/job-detail');
  });
});

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
