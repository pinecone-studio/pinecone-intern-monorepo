import { act, fireEvent, render, screen } from '@testing-library/react';
import MenuButton from '../../src/app/dashboard/_components/ArticleMenuButton';

describe('Should render menu icon-button', () => {
  it('1. Should render icon', () => {
    render(<MenuButton />);
  });
  it('2. Open menu button on click', () => {
    render(<MenuButton />);

    const moreVertButton = screen.getByTestId('morevert-button-test-id');

    fireEvent.click(moreVertButton);
  });

  it('3. Close morevert button on click', async () => {
    const { container, getAllByTestId } = render(<MenuButton />);

    const moreVertButtonn = container.getElementsByTagName('button')[0];

    await act(() => {
      fireEvent.click(moreVertButtonn);
    });

    const menuItem = getAllByTestId('close-button-menu-test-id')[0];

    await act(async () => {
      await fireEvent.click(menuItem);
    });
  });
});
