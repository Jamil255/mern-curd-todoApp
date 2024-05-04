import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb connected to ${conn.connection.host}`);

    } catch (error) {
        console.log(error.message);

    }
}

export default connectDb