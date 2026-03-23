import express from "express";
import { configDotenv } from "dotenv";
import { v4 } from "uuid";
import cors from "cors";
import { WebSocketServer } from "ws";
configDotenv();
const app = express();
const expressPort = process.env.EXPRESSPORT || 9091;
const webSocketPort = process.env.WEBSOCKETPORT || 9093;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
const rooms = new Map();
app.get("/", (req, res) => {
  const roomId = v4();
  rooms.set[(roomId, [])];
  res
    .cookie("application", "chatSpace", { maxAge: 300000 })
    .json(roomId, roomId);
  console.log(rooms.entries());
});
app.listen(expressPort, () => {
  console.log(`application is running on Port ${expressPort}`);
});
// web socket configuration
const wss = new WebSocketServer({ port: webSocketPort });
wss.on("connection", (ws, req) => {
  const queryParam = req.url.substring(9, req.url.length - 1);
  if (!rooms.has(queryParam)) {
    return ws.close();
  }
  const room = rooms.get(queryParam);
  ws.on("open", () => {
    console.log(`client is connected`);
  });
  ws.on("message", (message) => {
    console.log(message);
  });
  ws.on("close", () => {
    console.log("connection is closed");
  });
});
