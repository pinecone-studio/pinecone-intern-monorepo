import { act, fireEvent, render, screen } from '@testing-library/react';
import MenuButton from '../../src/app/dashboard/_components/ArticleMenuButton';

describe('Should render article menu button', () => {
  it('1. Should render icon', () => {
    render(<MenuButton />);
  });

  it('2. Open menu button on click', () => {
    render(<MenuButton />);

    const menuButton = screen.getByTestId('morevert-button-test-id');

    fireEvent.click(menuButton);
  });

  it('3. Close menu button on click', async () => {
    const { container, getAllByTestId } = render(<MenuButton />);

    const moreVertButton = container.getElementsByTagName('button')[0];

    fireEvent.click(moreVertButton);

    const closeMenuButton = getAllByTestId('close-button-menu-test-id')[0];

    await fireEvent.click(closeMenuButton);
  });
});
