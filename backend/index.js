import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;


const connectDB = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
    }
};


const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
    };

startServer();
