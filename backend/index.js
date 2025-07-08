const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    
    origin: "*",
    methods: ["GET", "POST"]
  },
  path: "/socket.io/"
});
 
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    console.log("invalid username");
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

app.use(cors());
app.get('/', (req, res) => {
  res.send('Socket.IO server is running!');
});
const users = new Map();
io.on('connection', (socket) => {
  const username = socket.username
  users.set(username,socket);

  console.log(`${username} connected as ${socket.id}`);
  socket.on('request-connection', ({to}) => {
    const targetSocket = users.get(to);
    if(targetSocket){
      targetSocket.emit("connection-request",{
        from:username,
      });
    }
  });
  socket.on("accept-connection", ({ from }) => {
    const fromSocket = users.get(from);
    if (fromSocket) {
      // Notify both users that connection is established
      fromSocket.emit("connection-accepted", { with: username });
      socket.emit("connection-accepted", { with: from });
    }
  });

  // Handle private message
  socket.on("private-message", ({ to, message }) => {
    const targetSocket = users.get(to);
    if (targetSocket) {
      targetSocket.emit("private-message", {
        from: username,
        message,
      });
    }
  });

  // On disconnect
  socket.on("disconnect", () => {
    users.delete(username);
    console.log(`${username} disconnected`);
  });
});


server.listen(4000, () => {
  console.log('listening on *:4000');
});