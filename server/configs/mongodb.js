import mongoose from "mongoose";


// Function to connect to MongoDB
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database Connected");
        });

        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("DB Error:", error.message);
    }
};

export default connectDB;