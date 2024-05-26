import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import MainBannerFromArticles from '../../src/app/articles/_components/MainBannerFromArticles';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));
describe('MainBannerFromArticles', () => {
  let getItemMock: jest.SpyInstance;
  let routerPushMock: jest.Mock;
  let setIsShownMock: jest.Mock;

  beforeEach(() => {
    getItemMock = jest.spyOn(Storage.prototype, 'getItem');
    routerPushMock = jest.fn();
    setIsShownMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should have correct props', () => {
    const { getByTestId } = render(<MainBannerFromArticles date="2024.04.12" articlesTitle="Welcome" categories="Coding" cover="/Academy.svg" id="663097b58073930529faddfc" />);

    const date = getByTestId('mainDate');
    expect(date.textContent).toEqual('');

    const title = getByTestId('mainTitle');
    expect(title.textContent).toEqual('Welcome');

    const category = getByTestId('mainCategory');
    expect(category.textContent).toEqual('#Coding');

    const cover = getByTestId('mainCover');
    expect(cover.textContent).toEqual('');
  });
  it('should buttons are clickable', () => {
    const { getByTestId } = render(<MainBannerFromArticles date="2024.04.12" articlesTitle="Welcome" categories="Coding" cover="/Academy.svg" id="663097b58073930529faddfc" />);
    const button = getByTestId('mainBtn');
    act(() => {
      fireEvent.click(button);
    });
    const imgButton = getByTestId('imgButton');
    act(() => {
      fireEvent.click(imgButton);
    });
    const jumperBtn = getByTestId('jumper');
    act(() => {
      fireEvent.click(jumperBtn);
    });
  });
  it('should redirect to /sign-in if no token is found', () => {
    getItemMock.mockReturnValue(null);
    const { getByTestId } = render(<MainBannerFromArticles date="2024.04.12" articlesTitle="Welcome" categories="Coding" cover="/Academy.svg" id="663097b58073930529faddfc" />);
    const btn = getByTestId('jumper');

    render(<MainBannerFromArticles />);

    fireEvent.click(btn);

    expect(getItemMock).toHaveBeenCalledWith('token');
    expect(routerPushMock).toHaveBeenCalledWith('/sign-in');
    expect(setIsShownMock).not.toHaveBeenCalled();
  });
  it('should call setIsShown(true) if token is found', () => {
    getItemMock.mockReturnValue('mockToken');

    const { getByTestId } = render(<MainBannerFromArticles />);

    const btn = getByTestId('jumper');

    render(<MainBannerFromArticles />);

    fireEvent.click(btn);

    expect(getItemMock).toHaveBeenCalledWith('token');
    expect(routerPushMock).not.toHaveBeenCalled();
    expect(setIsShownMock).toHaveBeenCalledTimes(0);
  });

  it('should close the modal when handleModalClose is called', () => {
    getItemMock.mockReturnValue('mockToken');

    const { getByTestId, queryByTestId } = render(<MainBannerFromArticles date="2024.04.12" articlesTitle="Welcome" categories="Coding" cover="/Academy.svg" id="663097b58073930529faddfc" />);

    const jumperBtn = getByTestId('jumper');
    fireEvent.click(jumperBtn);
    expect(queryByTestId('modal')).toBeDefined();
    const closeButton = queryByTestId('modalCloseBtn');
    closeButton && fireEvent.click(closeButton);
    expect(queryByTestId('modal')).toBeNull();
  });
});
