import Redis from "ioredis";

let client: Redis;

export function connectToRedis() {
    if (!client) {
        console.log("Initializing Redis...");
        // eslint-disable-next-line no-secrets/no-secrets
        const redisUrl = "redis://localhost:6379";

        client = new Redis(redisUrl);

        client.on("connect", () => {
            console.log("Connected to Redis.");
        });

        client.on("error", (error) => {
            console.error("Redis Client Error: ", error.message);
        });
    } else {
        console.log("Redis client already initialized.");
    }
    return client;
}