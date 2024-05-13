import { updateCourse } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/course-model', () => ({
  findByIdAndUpdate: jest
    .fn()
    .mockReturnValueOnce({
     id : "1",
     title : "Html",
     description : "Html intro",
     thumbnail : "image.jpg",
     status : "published"
    })
    .mockReturnValueOnce(null)
}));

describe('Update course', () => {
  it('should update a course', async () => {
    const result = await updateCourse!({}, { id: '1', courseInput : {title: 'Html', thumbnail : "image.jpg", description : "Html intro" , status:"published"} }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
        id : "1",
        title : "Html",
        description : "Html intro",
        thumbnail : "image.jpg",
        status : "published"
    });
  });

  it("should throw an error if the course doesn't exist", async () => {
    try {
      await updateCourse!({}, {id: '2', courseInput : {title: 'Html', thumbnail : "image.jpg", description : "Html intro" , status:"published"} }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Failed to update course'));
    }
  });
  it('should throw error if delete section failed' , async() => {
    try {
        await updateCourse!({}, {id: '1', courseInput : {title: 'Html', thumbnail : "image.jpg", description : "Html intro" , status:"published"}  }, {}, {} as GraphQLResolveInfo);
      } catch (error) {
        expect(error).toEqual(new GraphQLError('Failed to update course'));
      }
  });
});