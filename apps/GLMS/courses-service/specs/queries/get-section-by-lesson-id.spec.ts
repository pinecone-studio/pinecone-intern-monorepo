jest.mock('../../src/model/lesson-model', () => ({
  findById: jest.fn(),
}));

describe('Get section By LessonId', () => {
  it("should throw an error if the section-by-lessonId doesn't exist", async () => {
    try {
    } catch (error) {
      expect(error).toEqual(new Error('cannot find section'));
    }
  });
});
