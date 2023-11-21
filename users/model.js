import mongoose from "mongoose";
import schema from "./schema.js";

const model = mongoose.model("users", schema); // create mongoose model from the schema
export default model; // export so it can be used elsewhere

/*
In earlier sections we demonstrated using the command line client to interact manually with the mongo server using the find command.
Mongoose models provide similar functions to interact with MongoDB programmatically instead of manually.
The functions are similar to the ones found in the mongo shell client: find(), create(), updateOne(), removeOne(), etc.
*/