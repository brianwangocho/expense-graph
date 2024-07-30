require('dotenv').config();
const express = require('express');
const expresslayout = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const expressStatic = require('express-static');
const connectDB = require('./server/config/db');

const app = express();


const httpServer = require("http").createServer(app);
httpServer.listen(3000); // Listen
const io = require("socket.io")(httpServer, {
  // options goes here i.e perm keys ...
  cors: {
    origins: ['http://localhost:5000']
}
});

io.on("connection", (socket) => {
    console.log("connected")
  // ...
});
const PORT = 5000 || process.env.PORT

var roomno = 1;
io.on('connection', function(socket){
   socket.join("room-"+roomno);
   //Send this event to everyone in the room.
   io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
})

//// routes that dont need templating

app.get('/Login', (req, res, next)=>{
    res.render('login');
});

/// TEMPLATING ENGINE

app.use(expresslayout)
app.use(bodyParser());
app.use(express.static('public'));
app.set('layout','./layouts/main');
app.set('view engine','ejs');




app.use('/',require('./server/routes/main'))
app.listen(PORT,()=>{
  connectDB();
console.log(`listening on port ${PORT}`)
});