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
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  
  const handleChange = (e) => {
    const key = e.target.name;

    setForm({
      ...form,
      [key]: e.target.value,
    });
  };

  
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) return;

    try {
      const res = await API.post("/tasks",form);
      
      setTasks((prev) => [res.data, ...prev]);

      setForm({
        title: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);

    setTasks((prev) => prev.filter((task) => task._id !== id));
  } catch (err) {
    console.error(err);
  }
};

  const handleEdit = async (id) => {
  const newTitle = prompt("Enter new title:");
  const newDescription = prompt("Enter new description:");

  if (!newTitle || !newDescription) return;

  try {
    const res = await API.put(`/tasks/${id}`, {
      title: newTitle,
      description: newDescription,
    });

    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? res.data : task
      )
    );
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
              key={task._id || task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onEdit={()=> handleEdit(task._id)}
              onDelete={()=> handleDelete(task._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}