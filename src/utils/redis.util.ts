import * as redis from "redis";

// Start REDIS

// Create a redis connection client
const redisClient: redis.RedisClientType = redis.createClient({
  url: process.env.REDIS_URL,
});

// process.env.NODE_ENV === "development"
//     ? redis.createClient()
//     : redis.createClient({ url: process.env.REDIS_URL });

// Log error status
redisClient.on("error", (err: any) => {
  console.log("Redis client error", err);
});

export default redisClient;
