import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

router.get("/", async (request, response) => {
  const tasks = await db.getTasks(request.user.sub);
  response.json(tasks);
});

router.delete("/:id", async (request, response) => {
  await db.deleteTask(request.params.id);
  response.status(204).end();
});

router.use(express.json());
router.post("/", async (request, response) => {
  const task = await db.addTask(request.user.sub, request.body.name);
  response.status(201).json(task);
});

export default router;
