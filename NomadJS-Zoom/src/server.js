import http from "http";
import SocketIO from "socket.io";
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

// WS와 비슷한 개념으로 http server 위에 socket io 올린다, init이 굉장히 간단하다.
// http://localhost:3003/socket.io/socket.io.js <- socket io js 라이브러리 코드를 볼 수 있다.
// 위 라이브러리를 front end에서 import 함으로써 굉장히 간단하게 FE <- socket  io -> BE 형태가 쌉가능하다 -> script(src="/socket.io/socket.io.js")
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    log(socket);
});


// Set up webscoket server by set port
httpServer.listen(3003, handleListen(3003));