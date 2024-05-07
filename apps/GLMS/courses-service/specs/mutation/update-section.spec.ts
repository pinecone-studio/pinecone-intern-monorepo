import { updateSection } from '@/graphql/resolvers/mutations';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

jest.mock('@/model/section-model', () => ({
  findByIdAndUpdate: jest
    .fn()
    .mockReturnValueOnce({
     id : "1",
     title : "Html",
     description : "Html intro",
     contentImage : "image.jpg",
    })
    .mockReturnValueOnce(null)
}));

describe('Update section', () => {
  it('should update a section', async () => {
    const result = await updateSection!({}, { id: '1', sectionInput : {title: 'Html', contentImage : "image.jpg", description : "Html intro"} }, {}, {} as GraphQLResolveInfo);

    expect(result).toEqual({
        id : "1",
        title : "Html",
        description : "Html intro",
        contentImage : "image.jpg",
    });
  });

  it("should throw an error if the section doesn't exist", async () => {
    try {
      await updateSection!({}, {id: '2', sectionInput : {title: 'Html', contentImage : "image.jpg", description : "Html intro"} }, {}, {} as GraphQLResolveInfo);
    } catch (error) {
      expect(error).toEqual(new GraphQLError('Failed to update section'));
    }
  });
  it('should throw error if delete section failed' , async() => {
    try {
        await updateSection!({}, {id: '1', sectionInput : {title: 'Html', contentImage : "image.jpg", description : "Html intro"}  }, {}, {} as GraphQLResolveInfo);
      } catch (error) {
        expect(error).toEqual(new GraphQLError('Failed to update section'));
      }
  });
});