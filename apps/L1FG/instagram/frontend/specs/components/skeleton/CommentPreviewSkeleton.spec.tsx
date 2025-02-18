import CommentPreviewSkeleton from '@/components/skeleton/CommentPreviewSkeleton';
import { render } from '@testing-library/react';

describe('CommentPreviewSkeleton', () => {
  it('renders 4 skeleton comment placeholders', () => {
    render(<CommentPreviewSkeleton />);
  });
});
