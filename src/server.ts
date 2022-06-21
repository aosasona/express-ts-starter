import http from "http";
import dotenv from "dotenv";
import app from "./app";
import { connect, disconnect } from "./services/db";
import redisClient from "./utils/redis.util";
const PORT: string | number = process.env.PORT || 8000;

// Load environment variables from .env file
dotenv.config();

const server = http.createServer(app);

// Start listening on port
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  // Connect to MONGODB database
  connect();

  // Connect to REDIS
  //   redisClient
  //     .connect()
  //     .then(() => {
  //       if (process.env.NODE_ENV !== "test") {
  //         console.log("🛠\tRedis - Connection open");
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Closing server.");
  // Disconnect from MONGODB database
  disconnect();
  process.exit(0);
});