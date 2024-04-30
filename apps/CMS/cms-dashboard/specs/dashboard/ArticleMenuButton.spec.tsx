import { fireEvent, render, screen } from '@testing-library/react';
import MenuButton from '../../src/app/dashboard/_components/ArticleMenuButton';

describe('Should render article menu button', () => {
  it('1. Should render icon', () => {
    render(<MenuButton id="1" />);
  });

  it('2. Open menu button on click', () => {
    render(<MenuButton id="1" />);

    const menuButton = screen.getByTestId('morevert-button-test-id');

    fireEvent.click(menuButton);
  });

  it('3. Close menu button on click', async () => {
    const { container, getAllByTestId } = render(<MenuButton id="1" />);

    const moreVertButton = container.getElementsByTagName('button')[0];

    fireEvent.click(moreVertButton);

    const closeMenuButton = getAllByTestId('close-button-menu-test-id')[0];

    await fireEvent.click(closeMenuButton);
  });

  it('4. Copy menu button on click', () => {
    render(<MenuButton id="1" />);

    const menuButton = screen.getByTestId('morevert-button-test-id');
    fireEvent.click(menuButton);

    const copyButton = screen.getByTestId('copy-to-clipboard-id');
    fireEvent.click(copyButton);
  });
});
