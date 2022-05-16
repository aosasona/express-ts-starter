import mongoose from "mongoose";
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017";

export default function connect(): any {
  mongoose
    .connect(MONGO_URI)
    .then((response: any) => {
      console.log("Connected to MongoDB");
    })
    .catch((e: any) => {
      console.log(e);
    });
}
