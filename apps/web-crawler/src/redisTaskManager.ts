import redisClient from "./redisClient.js";

export async function enqueueUrl(url: string): Promise<void> {
    try {
        const isAlreadyQueued = await redisClient.sismember("queuedUrls", url);
        if (!isAlreadyQueued) {
            await redisClient.sadd("queuedUrls", url);
            await redisClient.lpush("urlQueue", url);
            console.log(`Enqueued: ${url}`);
        }
    } catch (error) {
        console.error("Error Enqueueing URL: ", (error as Error).message);
    }
}

export async function dequeueUrl(): Promise<string | null> {
    try {
        return await redisClient.rpop("urlQueue");
    } catch (error) {
        console.error("Error Dequeueing URL: ", (error as Error).message);
        return null;
    }
}

export async function isVisited(url: string): Promise<boolean> {
    const result = await redisClient.sismember("visitedUrls", url);
    return result === 1;
}

export async function markVisited(url: string): Promise<void> {
    await redisClient.sadd("visitedUrls", url);
}