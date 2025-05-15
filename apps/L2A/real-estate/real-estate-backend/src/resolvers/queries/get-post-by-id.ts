import { POST_MODEL } from "../../models/post";
import mongoose from "mongoose";

export const getPostById = async (_: any, args: { _id: string }) => {
  try {
    const _id = new mongoose.Types.ObjectId(args._id);
    const post = await POST_MODEL.findOne({ _id });
    return post;    
  } catch (error) {
    console.error(error);
    return [];
  }
};