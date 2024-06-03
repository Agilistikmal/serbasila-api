import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

var jsonParser = bodyParser.json();

app.listen(3000, () => {
  console.log("Running on port 3000");
});

app.post("/leaderboard", jsonParser, async (req, res) => {
  const body = req.body;
  if (body.timer_seconds == 0) {
    res.json({
      data: null,
    });
    return;
  }

  const data = await prisma.leaderboard.create({ data: body });
  res.json({ data: data });
});

app.get("/leaderboard", async (req, res) => {
  const data = await prisma.leaderboard.findMany({
    orderBy: {
      timer_seconds: "asc",
    },
    where: {
      timer_seconds: {
        gt: 0,
      },
    },
  });
  res.json({ data: data });
});
