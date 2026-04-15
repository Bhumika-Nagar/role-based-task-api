import { z } from "zod";

export const createTaskSchema = z.object({
title: z
.string()
.min(1, "Title is required")
.max(100, "Title too long"),

description: z
.string()
.max(500, "Description too long")
.optional(),

status: z
.enum(["pending", "completed"])
.optional()
});


export const updateTaskSchema = z.object({
title: z
.string()
.min(1)
.max(100)
.optional(),

description: z
.string()
.max(500)
.optional(),

status: z
.enum(["pending", "completed"])
.optional()
});
