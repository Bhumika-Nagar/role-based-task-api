"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";
import API from "../lib/Api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/signin", {
      email,
      username,
      password,
    });

    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");

  } catch (error) {
    console.error(error.response?.data || error.message);
  }
    
  };

  return (
    <Card title="Welcome Back">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
        <Input
        value={username}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full username"
        />     
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <Input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="(user or admin)"
      />

      <Button
        onClick={handleLogin}
      >
        Login
      </Button>

      <p className="text-gray-400 text-sm mt-4 text-center">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </Card>
  );
}