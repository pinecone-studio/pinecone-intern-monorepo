import { createComment } from "apps/L1FG/instagram/backend/src/resolvers/mutations";
import { GraphQLResolveInfo } from "graphql"

jest.mock('apps/L1FG/instagram/backend/src/models/comment.model', ()=>({
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