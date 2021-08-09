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
    
    // 닉네임 설정, 어트리뷰트 추가
    socket.nick_name = "Anon"; // 기본값으로 어나니머스

    socket.onAny((event) => {
        log(`Socket event type: ${event}`);
    });
    // log(socket);
    // FE에서 3번째 인자로 보낸 object(Function) 받아서
    // 다음과 같이 처리가 가능해진다 -> done() 함수 체크
    socket.on("enter_room", (roomName, done) => {
        // join 전과 후의 socket Set list의 차이점을 살펴보자!
        // log(socket.id); // -> connection된 socket ID(유일)을 알아서 해당 소켓에만 연결 가능해짐
        // log(socket.rooms);
        // socket.join(roomName);
        // log(socket.rooms);
        // setTimeout(() => {
        //     done("Hello From The Backend ✅");
        // }, 1000);

        socket.join(roomName);
        done(roomName);

        // roomName에게 emit(event triging) => event key
        // FE에서 해당 key를 받으면, 다른 사람이 "해당 room에 들어온 것 처럼"
        // 즉, "같은 소켓 그룹에 들어온 것"이 된다!
        socket.to(roomName).emit("welcome", socket.nick_name);
    });

    // FE에서 방 들어온 뒤에 new msg형태 이벤트를 msg와 함께 보낼때
    socket.on("new_message", (msg, roomName, done) => {
        socket.to(roomName).emit("new_message", `${socket.nick_name}: ${msg}`);
        done();
    });

    // FE에서 방 들어온 뒤에 nick_name형태 이벤트를 msg와 함께 보낼때
    socket.on("nick_name", (nick_name) => {
        // FE에 갈(comunication하는) socket object의 nick_name속성값을 줘버리기
        socket.nick_name = nick_name;
    });

    // disconnecting event type 발생시!
    // socket.rooms로 Socket Set(session)리스트를 모두 가져와서 
    // forEach -> 해당 룸 모두에게 'bye' 이벤트 발생
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => {
            socket.to(room).emit("bye", socket.nick_name);
        });
    });
});


// Set up webscoket server by set port
httpServer.listen(3003, handleListen(3003));