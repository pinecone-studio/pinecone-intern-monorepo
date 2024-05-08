import { act, fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import { ArticleMenuButton } from '../../src/app/dashboard/_components/ArticleMenuButton';

const mockTest = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockTest,
  },
});

jest.useFakeTimers();

describe('Should render article menu button', () => {
  it('1. Article Menu Button', () => {
    render(<ArticleMenuButton id="123" />);
    expect(getByTestId);
  });

  it('2. Open menu button on click', () => {
    const { getByTestId, getByText } = render(<ArticleMenuButton id="123" />);

    const menuButton = getByTestId('menu-button-test-id');

    act(() => {
      fireEvent.click(menuButton);
    });

    const archiveOption = getByText('Архив');
    expect(archiveOption);
  });

  it('3. Close menu button on click', () => {
    const { getByTestId } = render(<ArticleMenuButton id="123" />);

    const menuButton = getByTestId('menu-button-test-id');

    act(() => {
      fireEvent.click(menuButton);
    });

    const closeMenuButton = getByTestId('close-menu-button-test-id');

    act(() => {
      fireEvent.click(closeMenuButton);
    });
  });

  it('4. Copy to clipboard menu button on click', async () => {
    const id = 'copy-clipboard-button-test-id';

    const { getByTestId } = render(<ArticleMenuButton id={id} />);

    const menuButton = getByTestId('menu-button-test-id');

    act(() => {
      fireEvent.click(menuButton);
    });

    const copyToClipboard = getByTestId('copy-clipboard-button-test-id');

    act(() => {
      fireEvent.click(copyToClipboard);
    });

    await waitFor(() => {
      expect(mockTest).toHaveBeenCalledWith(`${window.location.origin}/articles/copy-article/${id}`);
    });

    act(() => {
      jest.advanceTimersByTime(1300);
    });
  });
});
