import 'dotenv/config';
import mongoose from 'mongoose';

// Access the variable using process.env
const dbUri = process.env.MONGO_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(dbUri)
        console.log('Connected to MongoDB!')
    } catch (error) {
        console.error('Connection error:', error)
        process.exit(1);
    }
}

export default connectDB;
