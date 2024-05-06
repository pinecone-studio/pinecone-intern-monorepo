import { fireEvent, render, act } from '@testing-library/react';
import ImageUploader from '../../../src/app/articles/_components/create-article/ImageUploader';

describe('ImageUploader  Component', () => {
  it('1. Should render ImageUploader Component', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<ImageUploader coverPhoto="test" setCoverPhoto={mockFunction} />);
    const imageUploader = getByTestId('imageUploader');
    expect(imageUploader).toBeDefined();
  });
  it('2. ImageUploader button clicked', async () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<ImageUploader coverPhoto="test" setCoverPhoto={mockFunction} />);
    const imageUploader = getByTestId('imageUploader');

    act(() => {
      fireEvent.click(imageUploader);
    });
  });
});
