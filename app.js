"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const { Server } = require("http"); // 1. 모듈 불러오기
const socketIo = require("socket.io"); // 1. 모듈 불러오기

const http = Server(app); // 2. express app을 http 서버로 감싸기
const io = socketIo(http); // 3. http 객체를 Socket.io 모듈에 넘겨서 소켓 핸들러 생성


app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우팅
const rootRouting = require("./src/routes");
app.use("/", rootRouting); 



// 4. 소켓 연결 이벤트 핸들링
io.on("connection", (sock) => {
  console.log("새로운 소켓이 연결됐어요!");

    sock.on("update_lecture", data => { 
        const emitData = {
            lecture_id: data.lecture_id,
            lecturer: data.lecturer, 
            title: data.title,
            date:new Date().toISOString()
        };
        io.emit("alarm_update", emitData);
    });

  sock.on("disconnect", () => {
    console.log(sock.id, "연결이 끊어졌어요!");
  });
});


http.listen(process.env.PORT, () => {
  console.log(process.env.PORT, " 포트로 서버가 열렸어요!");
});
module.exports = {app};
