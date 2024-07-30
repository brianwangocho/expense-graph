const socket = io("http://localhost:3000");

socket.on("connection", (socket) => {
   // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
   
  });
  
  // client-side
  socket.on("connect", () => {
   // console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  });
  
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });