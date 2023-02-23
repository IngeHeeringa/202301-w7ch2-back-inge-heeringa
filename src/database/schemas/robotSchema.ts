import { Schema } from "mongoose";

const robotSchema = new Schema({
  name: String,
  image: String,
  stats: {
    speed: Number,
    endurance: Number,
  },
  creationDate: Date,
});

robotSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  },
});

export default robotSchema;
