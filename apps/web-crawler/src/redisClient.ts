import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error("REDIS_URL is not defined in environment variables");
}

const client = new Redis(redisUrl);

client.on("connect", () => {
    console.log("Connected to Redis.");
});

client.on("error", (error) => {
    console.error("Redis Client Error: ", error.message);
});

export default client;