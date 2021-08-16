import http from "http";
import SocketIo from "socket.io";
// import HTTP, middle ware concept FRAMEWORK for node 
import express from "express";

// static configue
const log = console.log;
const protocol = "http";
const host = "127.0.0.1";
const defaultPort = "3000";
const app = express();

// set node view tempelete engine
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// public static file load
app.use("/public", express.static(__dirname + "/public"));

// ======================================================
// Get Request / return Response
// ======================================================
/**
 * @httpRequestAndResponse
 */
app.get("/", (_, res) => res.render("home"));
// app.get("/*", (req, res) => {
//     const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//     log(`${new Date().toISOString()}: ${fullUrl}`);
//     res.redirect("/")
// }); // use only home url!
// ======================================================

// set up server listen port with log
const handleListen = (port) => {
    if (port) log(`http Server Run Clear with express, hello Noom world! : ws://${host}:${port}`);
    else log(`WebSocket Server Run Clear with http module!! hello Noom world! : ${protocol}://${host}:${defaultPort}`);
};
// app.listen(defaultPort, handleListen); // -> websocket 예시를 위해 주석

// ======================================================
// Socket Server with Socket.io [ https://socket.io/ ]
// ======================================================
/**
 * @WsRequestResponse
 */

// application 계증의 프로토콜, http 프로토콜 기반으로 웹소켓 서버 구축, 그래서 http 모듈 이용 
// Create A Server
const httpServer = http.createServer(app);
const wsServer = SocketIo(httpServer);

// Socket Io request 처리 
wsServer.on("connection", socket => {
    socket.on("join_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.protocol(roomName).emit("welcome"); // FE로 welcome event (socket) 트리깅하기 
    })
});

// Set up webscoket server by set port
httpServer.listen(3003, handleListen(3003));