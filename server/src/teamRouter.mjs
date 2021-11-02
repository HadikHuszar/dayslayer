import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

router.get("/", async (request, response) => {
  const team = await db.getTeam(request.user);
  response.json(team);
});

router.use(express.json());
router.post("/", async (request, response) => {
  const team = await db.addTeam(request.user.sub, request.body.name);
  response.status(201).json(team_member);
});

export default router;
