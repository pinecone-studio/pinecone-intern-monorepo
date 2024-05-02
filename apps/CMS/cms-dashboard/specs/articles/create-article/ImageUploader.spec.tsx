import { fireEvent, render } from '@testing-library/react';
import ImageUploader from '../../../src/app/articles/_components/create-article/ImageUploader';

describe('ImageUploader  Component', () => {
    it('1. Should render ImageUploader Component', () => {
      const { getByTestId } = render(<ImageUploader />);
      const switchBtn = getByTestId('imageUploader');
      expect(switchBtn).toBeDefined();
    });
    it('2. ImageUploader button clicked', async () => {
      const { getByTestId } = render(<ImageUploader />);
      const switchBtn = getByTestId('imageUploader');
      fireEvent.click(switchBtn);
    });
  });
  