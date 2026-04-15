"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";
import API from "../lib/Api";

export default function Signup() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
  try {
    const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("signup", form);

    console.log("LOGIN RESPONSE:", res.data);

    const token = res.data.token; 

    localStorage.setItem("token", token);

    console.log("AFTER STORE:", localStorage.getItem("token"));

    window.location.href = "/dashboard";

  } catch (err) {
    console.error(err);
  }
};
  

  } catch (error) {
    console.error(error.response?.data || "signup failed");
  }

  };

  return (
    <Card title="Create Account">
      <Input
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder="email"
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
        onClick={handleSignup}
      >
        Sign Up
      </Button>

      <p className="text-gray-400 text-sm mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </Card>
  );
}