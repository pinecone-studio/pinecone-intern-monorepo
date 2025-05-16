import { POST_MODEL } from "../../models/post";
import mongoose from "mongoose";

export const getPostById = async (_: any, args: { _id: string }) => {
  try {
    const _id = new mongoose.Types.ObjectId(args._id);
    return await POST_MODEL.findOne({ _id });
  } catch (error) {
    console.error(error);
    return null;
  }
};

