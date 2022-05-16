import { Schema, model } from "mongoose";

const dummySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default model("Dummy", dummySchema);
