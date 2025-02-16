import redis from './redis';

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

async function markVisited(url) {
  await redisClient.sAdd("visitedUrls", url); 
}


async function isVisited(url) {
  return await redisClient.sIsMember("visitedUrls", url); 
}

async function enqueueUrl(url, depth) {
  await redisClient.lPush("urlQueue", JSON.stringify({ url, depth }));
}

async function dequeueUrl() {
  const task = await redisClient.rPop("urlQueue"); 
  return task ? JSON.parse(task) : null; 
}

module.exports = { enqueueUrl, dequeueUrl, markVisited, isVisited };