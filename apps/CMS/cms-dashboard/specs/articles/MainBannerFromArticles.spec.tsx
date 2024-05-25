import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import MainBannerFromArticles from '../../src/app/articles/_components/MainBannerFromArticles';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));
describe('MainBannerFromArticles', () =>
  it('should have correct props', () => {
    const { getByTestId } = render(<MainBannerFromArticles date="2024.04.12" articlesTitle="Welcome" categories="Coding" cover="/Academy.svg" id="663097b58073930529faddfc" />);
    const button = getByTestId('mainBtn');
    act(() => {
      fireEvent.click(button);
    });
    const imgButton = getByTestId('imgButton');
    act(() => {
      fireEvent.click(imgButton);
    });
    const jumper = getByTestId('jumper');
    act(() => {
      fireEvent.click(jumper);
    });
  }));
