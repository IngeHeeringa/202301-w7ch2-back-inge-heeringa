import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("robots:database");

const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(url);
    debug(`Connected to database ${url}`);
  } catch (error) {
    throw new Error("Error connecting to database");
  }
};

export default connectDatabase;
