import express from "express";
import jwt from "jsonwebtoken";
import Task from "../models/Task.js";
import { protect } from "../middleware/Auth.js";
import { createTaskSchema, updateTaskSchema } from "../validators/taskValidator.js";
const taskRouter = express.Router();

taskRouter.use(protect);

taskRouter.post("/", async (req, res) => {
    try {
    const { title, description } = req.body;
    const data= createTaskSchema.parse(req.body);

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const task = await Task.create({
      ...data,
      user: req.user.id
    });

    res.status(201).json(task);


    } catch (err) {
    res.status(500).json({ msg: err.message });
    }
    });


taskRouter.get("/", async (req, res) => {
    try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("user", "username email");
    } else {
      tasks = await Task.find({ user: req.user.id });
    }

    res.json(tasks);


    } catch (err) {
    res.status(500).json({ msg: err.message });
    }
    });


taskRouter.get("/:id", async (req, res) => {
    try {
    const task = await Task.findById(req.params.id);


    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    res.json(task);


    } catch (err) {
    res.status(500).json({ msg: err.message });
    }
    });

taskRouter.put("/:id", async (req, res) => {
    try {
    
    const data= updateTaskSchema.parse(req.body);
    const task = await Task.findById(req.params.id);


    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);


    } catch (err) {
    res.status(500).json({ msg: err.message });
    }
    });


taskRouter.delete("/:id", async (req, res) => {
    try {
    const task = await Task.findById(req.params.id);


    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      task.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await task.deleteOne();

    res.json({ msg: "Task deleted" });


    } catch (err) {
    res.status(500).json({ msg: err.message });
    }
    });

export default taskRouter;
