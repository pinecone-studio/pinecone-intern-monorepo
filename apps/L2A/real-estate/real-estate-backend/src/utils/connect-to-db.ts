import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("connection successful");
  } catch (error) {
    console.log("Mongoose connection error", error);
    console.log("connection Failed");
  }
};
