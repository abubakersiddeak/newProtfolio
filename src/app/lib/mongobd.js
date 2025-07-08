import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectMongodb() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Mongodb Connection Success");
  } catch (error) {
    console.log(error);
    console.log("mongodb connection faild");
  }
}
await connectMongodb();
