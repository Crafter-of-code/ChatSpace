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
  console.log(roomId);
  rooms.set(roomId, []);
  res
    .cookie("application", "chatSpace", { maxAge: 300000 })
    .json({ roomId: roomId });
});
app.listen(expressPort, () => {
  console.log(`application is running on Port ${expressPort}`);
});
// web socket configuration
const wss = new WebSocketServer({ port: webSocketPort });
wss.on("connection", (ws, req) => {
  console.log(`client is connected`);
  const roomId = new URLSearchParams(req.url.slice(1)).get("roomId");
  let room;
  ws.roomId;
  if (!rooms.has(roomId)) {
    ws.send("You room doesn't exist");
    ws.close();
    return;
  } else {
    room = rooms.get(roomId);
    if (room.length > 2) {
      ws.send("room is already full");
      ws.close();
    } else {
      room.push(ws);
      console.log("connected has been pushed to the array");
    }
  }
  ws.on("message", (message) => {
    const otherMemberInRoom = room.filter((client) => {
      if (client != ws) {
        return client;
      }
    });
    otherMemberInRoom.forEach((client) => {
      client.send(message.toString());
    });
  });
  ws.on("close", () => {
    const room = rooms.get(ws.roomId);
    if (!room) return;
    room.forEach((client) => {
      if (client !== ws) {
        client.send("Your partner has exited the room");
        client.close();
      }
    });
    rooms.delete(ws.roomId);
  });
});
