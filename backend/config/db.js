import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // to ensure .env variables are loaded

// db connection function
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`); // make sure to use `` instead of '' or ""

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exits the process with an error code
    }
};