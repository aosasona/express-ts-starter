import mongoose from "mongoose";
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017";

export function connect(): void {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e: any) => {
      console.log(e);
    });
}

export function disconnect(): void {
  mongoose.disconnect().then(() => {
    console.log("Disconnected from MongoDB");
  });
}
