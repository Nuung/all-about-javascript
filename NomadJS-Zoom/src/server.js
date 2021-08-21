import http from "http";            // import HTTP, middle ware concept FRAMEWORK for node 
import https from "https";          // for https with openssl (mobile camera issue)
import fs from "fs";                // for openssl pem file load
import SocketIo from "socket.io";
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
app.get("/", (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    log(`${new Date().toISOString()}: ${fullUrl}`);
    res.render("home");
});
// app.get("/*", (req, res) => {
//     const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//     log(`${new Date().toISOString()}: ${fullUrl}`);
//     res.redirect("/")
// }); // use only home url!
// ======================================================

const httpsOption = {
    key: fs.readFileSync("/Users/nuung/.ssh/https_private.pem"),
    cert: fs.readFileSync("/Users/nuung/.ssh/https_public.pem")
}

// set up server listen port with log
const handleListen = (port) => {
    if (port) log(`http Server Run Clear with express, hello Noom world! :  ${protocol}://${host}:${port}`);
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
const httpsServer = https.createServer(httpsOption, app);
const wsServer = SocketIo(httpServer);

// Socket Io request 처리 
wsServer.on("connection", socket => {
    socket.on("join_room", (roomName) => {
        socket.join(roomName);
        // done();
        socket.to(roomName).emit("welcome"); // FE로 welcome event (socket) 트리깅하기 
    });

    // 받은 offer를 이제 필요할 peer B에게 보내줘야 함! 
    socket.on("offer", (offer, roomName) => {
        socket.to(roomName).emit("offer", offer);
    });

    // Peer B는 offer를 받았고, 자신의 remote sds값을 받은 offer로 set했다
    // 이제 그에 응답을 서버로 줘야했고, 아래는 그 응답을 Peer A가 받을 것이다. 
    socket.on("answer", (answer, roomName) => {
        socket.to(roomName).emit("answer", answer);
    });

    // Icecandidate 를 통한 data, peer A <-> peer B 주고 받기 
    socket.on("ice", (ice, roomName) => {
        socket.to(roomName).emit("ice", ice);
    });
});

// Set up webscoket server by set port
httpServer.listen(3003, handleListen(3003));
// httpsServer.listen(443, handleListen(443));