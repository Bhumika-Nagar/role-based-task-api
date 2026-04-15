import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "*"
}));

app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running");
});


app.use("/api/v1/auth", userRouter);
app.use("/api/v1/tasks", taskRouter);


app.use((req, res) => {
    res.status(404).json({ msg: "Route not found" });
});


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
    message: err.message || "Server Error"
});
});

export default app;
