import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import db from "./config/db";
let app = express();
import cors from "cors";
app.use(cors());
// let http = require('http').Server(app);
let http = require("http");
const {Server} = require("socket.io");
// let io = require('socket.io')(http);



const server = http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
  },
});
// import cors from "cors";
require('dotenv').config();

// Add headers before the routes are defined
app.use(function (req, res, next) {   

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

io.on("connection", (socket) => {
    console.log(`Có người vừa kết nối, socketID: ${socket.id}`);
  
    // //Server nhận key send_message với value data do người dùng gửi lên
    // socket.on("send_message", (data) => {
    //   console.log(data.name + ": " + data.message);
  
    //   //Sau đó nó sẽ update lại database bên phía người nhận
    //   //Vì 1 bên gửi 1 bên nhận nên id_user đôi ngược nhau và category cũng vậy
    //   const newData = {
    //     id: Math.random().toString(),
    //     message: data.message,
    //     name: data.name,
    //     category: "receive",
    //   };
  
    //   console.log(newData.message);
  
    //   const postData = async () => {
    //     const messenger = await Messenger.findOne({
    //       id_user1: data.id_user2,
    //       id_user2: data.id_user1,
    //     });
  
    //     messenger.content.push(newData);
  
    //     messenger.save();
    //   };
  
    //   postData();
  
    //   //Xử lý xong server gửi ngược lại client thông qua socket với key receive_message
    //   socket.broadcast.emit("receive_message");
    // });
  
    // Server nhận key send_order với value data do người dùng gửi lên
    // Phần này dùng để xử lý bên admin history biết được có người vừa đặt hàng
    socket.on('send_order', (data) => {
      console.log(data)
  
      //Xử lý xong server gửi ngược lại client admin thông qua socket với key receive_order
      socket.broadcast.emit("receive_order", data);
    })
    socket.on('update_cart', () => {
      // console.log(data)
  
      //Xử lý xong server gửi ngược lại client admin thông qua socket với key receive_order
      socket.emit("receive_cart");
      socket.broadcast.emit("receive_cart")
    })
    
  })
// app.use(cors({ origin: true }));
//connect to db
db.connect();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;
// let server =  app.listen(port, () =>{
//     //callback
//     console.log("Backend Nodejs is runing on the port : "+port);
// })
// http.listen(port, () => {
//   console.log('listening on *:3000');
// });
server.listen(port, () => {
    console.log("Backend Nodejs is runing on the port : "+port);
  
})