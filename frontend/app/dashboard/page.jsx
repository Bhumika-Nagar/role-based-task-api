"use client";

import { useState, useEffect } from "react";
import API from "../lib/Api";
import Input from "../components/Input";
import Button from "../components/Button";
import TaskCard from "../components/TaskCard";
import Card from "../components/Card";

export default function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(res.data.tasks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  
  const handleChange = (e) => {
    const key = e.target.getAttribute("name");

    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) return;

    try {
      const res = await API.post("/tasks", form);

      setTasks([res.data.task, ...tasks]);

      setForm({
        title: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      
      <Card className="max-w-xl mb-6">
        <form onSubmit={handleAddTask} className="space-y-4">
          <Input
            name="title"
            label="Task Title"
            placeholder="Enter task title"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            name="description"
            label="Description"
            placeholder="Enter description"
            value={form.description}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full">
            Add Task
          </Button>
        </form>
      </Card>

      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks yet...</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
            />
          ))
        )}
      </div>
    </div>
  );
}