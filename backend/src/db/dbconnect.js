import mongoose from 'mongoose';
import { DB_NAME } from "../contants.js";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
        console.log(`DB Connected to ${connection.connection.host}`)
    } catch (error) {
        console.log("Error", err);
        process.exit(1);
    }
}

export default connectDB;