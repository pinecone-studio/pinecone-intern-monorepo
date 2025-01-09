import { GraphQLResolveInfo } from "graphql"
import { createComment } from "../../../src/resolvers/mutations"

jest.mock('../../../src/models/comment.model', ()=>({
    CommentModel: {
        create: jest.fn().mockReturnValue({
            input:{
                comment: "",
                userId:"",
                postId:""
            }
        })
    }
}))

describe('create comment', () => {
    it('should be a comment', async () => {
      const input = {
        comment: "",
        userId: "",
        postId: "",
      };
  
      
  
const result = await createComment!({},{input}, {}, {} as GraphQLResolveInfo);
  
      expect(result).toEqual({
        input:{
            comment: "",
            userId:"",
            postId:""
        }
      });
    });
  });