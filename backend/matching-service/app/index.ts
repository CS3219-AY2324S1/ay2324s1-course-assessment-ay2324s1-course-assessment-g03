import express, { Application, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { MATCHING_EVENTS } from "./src/matching/matching.constants";
import { MatchingGateway } from "./src/matching/matching.gateway";

/**
 * Configuration
 */
dotenv.config({ path: `.env.development` });

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/api/matching/websocket",
  cors: {
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  },
});

/**
 * Middleware
 */
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);

/**
 * Routes
 */
app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to PeerPrep (Matching service) - A project for NUS CS3219 - Group 3"
  );
});

/**
 * Start the server
 */
httpServer.listen(process.env.PORT, () => {
  console.log(`Matching Service is live and running ⚡
Container URL: http://localhost:${process.env.PORT}
Local development URL: http://localhost:8004`);
});

const matchingGateway = new MatchingGateway();

io.on("connection", (socket) => {
  socket.on(MATCHING_EVENTS.JOIN_ROOM, (user, preferences) => {
    const matched = matchingGateway.joinRandomRoom({ user, preferences });
    if (matched) {
      socket.join(matched.roomId);
      io.to(matched.roomId).emit(MATCHING_EVENTS.FOUND_ROOM, matched);
    } else {
      const newRoom = matchingGateway.createRoom({ user, preferences });
      socket.join(newRoom);
    }
  });
});
