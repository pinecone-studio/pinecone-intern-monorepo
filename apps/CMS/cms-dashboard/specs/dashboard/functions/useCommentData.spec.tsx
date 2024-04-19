import { renderHook } from '@testing-library/react';
import useCommentData from '../../../src/app/dashboard/functions/useCommentData';
import { useGetCommentsByArticleIdQuery } from '../../../src/generated';

jest.mock('../../../src/generated', () => ({
  useGetCommentsByArticleIdQuery: jest.fn() as jest.Mock<ReturnType<typeof useGetCommentsByArticleIdQuery>>,
}));
describe('useCommentData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('loading state', () => {
    (useGetCommentsByArticleIdQuery as jest.Mock).mockReturnValue({ loading: true });

    const { result } = renderHook(() => useCommentData('article-id'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
    expect(result.current.numberOfComments).toBe(0);
  });
  test('error state', () => {
    const testError = new Error('Test error');
    (useGetCommentsByArticleIdQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: testError,
      data: null,
    });

    const { result } = renderHook(() => useCommentData('articlee-id'));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(testError);
    expect(result.current.data).toBeNull();
    expect(result.current.numberOfComments).toBe(0);
  });
  test('no data state', () => {
    (useGetCommentsByArticleIdQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: null,
    });

    const { result } = renderHook(() => useCommentData('article-id'));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
    expect(result.current.numberOfComments).toBe(0);
  });

  test('data available state', () => {
    const data = {
      getCommentsByArticleId: [
        { id: 1, text: 'This is comment 1' },
        { id: 2, text: 'This is comment 2' },
      ],
    };

    (useGetCommentsByArticleIdQuery as jest.Mock).mockImplementation(() => ({
      loading: false,
      error: null,
      data,
    }));

    const { result } = renderHook(() => useCommentData('article-id'));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBe(data);
    expect(result.current.numberOfComments).toBe(data.getCommentsByArticleId.length);
  });
});
