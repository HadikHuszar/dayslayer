import express from "express";

import * as db from "./db.mjs";

const router = express.Router();


fetch('https://google.com')
.then(res => res.text())
.then(text => console.log("fetch results:  ",(text));



router.get("/", async (request, response) => {
  const tasks = await db.getTasks(request.user.sub);
  response.json(tasks);
});

router.use(express.json());
router.post("/", async (request, response) => {
  const task = await db.addTask(request.user.sub, request.body.name);
  response.status(201).json(task);
});

export default router;
