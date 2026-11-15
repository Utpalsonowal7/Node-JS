import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.static("./public"));
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
     res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
     socket.on("user-msg", (v) => {
          io.emit("msg", v)
     })
})

server.listen(8000, () => console.log("✅ server is running at port 8000"));
