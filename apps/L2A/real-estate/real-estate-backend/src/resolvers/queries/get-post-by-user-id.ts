import { POST_MODEL } from "../../models/post";
import mongoose from "mongoose";

export const getPostsByUserId = async (_: any, args: { propertyOwnerId: string }) => {
  try {
    const propertyOwnerId = new mongoose.Types.ObjectId(args.propertyOwnerId);
    const posts = await POST_MODEL.find({ propertyOwnerId });
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};


