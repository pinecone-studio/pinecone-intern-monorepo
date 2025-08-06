import { connect } from "mongoose"

export const connectToDb = async () => {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
        throw new Error("MONGODB_URI environment variable is not defined");
    }
    try {
        await connect(mongoUri);
        console.log("Successfully connected MongoDB")
    } catch (error) {
        console.error(`Failed to connect to MongoDB: ${error}`);
        throw error;
    }
}