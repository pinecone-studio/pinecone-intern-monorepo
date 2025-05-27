import { CreatePostInput } from "../../../generated";
import { POST_MODEL } from "../../../models/post";
export const createPost = async (_: any, args: { input: CreatePostInput },context:{user:{_id :string;email:string} | null}) => {
  const {
    garage,
  } = args.input;
if(!context.user) {
  throw new Error("Unauthorized");
}
  const newPost = await POST_MODEL.create({
    ...args.input, 
    garage: garage || false,
    propertyOwnerId: context.user._id,
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return newPost;
};



