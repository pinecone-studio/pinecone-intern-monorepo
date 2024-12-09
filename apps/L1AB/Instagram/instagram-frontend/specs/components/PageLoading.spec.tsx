import PageLoading from '@/components/PageLoading';
import { render } from '@testing-library/react';

describe('PageLoading Component', () => {
  test('renders the loading page with logos and text', () => {
    render(<PageLoading />);
  });
});
