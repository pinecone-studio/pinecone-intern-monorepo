import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { JobDetail } from '../../src/app/recruiting/_components';
import { DeletedSvg } from '../../src/assets';
import { useRouter } from 'next/navigation';
import { LeftArrow } from '../../src/app/asset';

const useRouterMock = useRouter as jest.Mock;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('JobDetail', () => {
  it('renders correctly', () => {
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(<JobDetail />);
    expect(() => getByTestId('title')).not.toThrow();
    expect(() => getByTestId('back-button')).not.toThrow();
    expect(() => getByTestId('modal-button')).not.toThrow();
  });

  it('back button navigates to /recruiting', () => {
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(<JobDetail />);
    fireEvent.click(getByTestId('back-button'));
    expect(mockPush).toHaveBeenCalledWith('/recruiting');
  });
  it('edit button navigates to /recruiting/edit-job', () => {
    const mockPush = jest.fn();
    useRouterMock.mockReturnValue({ push: mockPush });

    const { getByTestId } = render(<JobDetail />);
    fireEvent.click(getByTestId('edit-button'));
    expect(mockPush).toHaveBeenCalledWith('/recruiting/edit-job');
  });
  describe('Arrow svg', () => {
    it('renders LeftArrow svg correctly', () => {
      const { getByTestId } = render(<LeftArrow />);
      const svgElement = getByTestId('left-arrow');
      expect(svgElement).toBeDefined();
    });
  });
  describe('DeleteSVG', () => {
    it('renders CreatedSvg correctly', () => {
      const { getByTestId } = render(<DeletedSvg />);
      const svgElement = getByTestId('deleted-svg');
      expect(svgElement).toBeDefined();
    });
  });
});
