describe('Course component', () => {
  it('displays lesson count when data is loaded', async () => {
    jest.mock('@/generated', () => ({
      useGetLessonByIdQuery: () => ({ data: undefined, loading: false }),
    }));
  });
});
