const port = process.env.PORT || 4000;

const io = require("socket.io")();

io.origins("*:*");

io.listen(port);

io.on("connection", (socket) => {
  console.log("new socket connected");
  socket.on("join-room", (roomId, userId, name) => {
    console.log("new peer joined", userId);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId, name);

    socket.on("disconnect", () => {
      console.log("disconnected", userId);
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

io.httpServer.on("listening", function () {
  console.log("socket listening on port", io.httpServer.address().port);
});
