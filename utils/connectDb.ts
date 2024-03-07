import mongoose from "mongoose"
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("connection SuccessFul")
    } catch (error) {
        console.error("Connection Failed:", error);
    }
}