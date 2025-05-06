import { CreatePostInput } from "../../../generated"; 
import { POST_MODEL } from "../../../models/post";     


export const createPost = async (_: any, args: { input: CreatePostInput }) => {
  const { propertyOwnerId, title, description, price, propertyDetail } = args.input;
    const newPost = await POST_MODEL.create({
      propertyOwnerId,
      title,
      description,
      price,
      propertyDetail,
      status: "pending", 
    });
    return {
      id: newPost._id.toString(),
      propertyOwnerId: newPost.propertyOwnerId.toString(),
      title: newPost.title,
      description: newPost.description,
      price: newPost.price,
      propertyDetail: newPost.propertyDetail.toString(),
      status: newPost.status,
      updatedAt: newPost.updatedAt.toString(),
      createdAt: newPost.createdAt.toString(),
    };
  }

