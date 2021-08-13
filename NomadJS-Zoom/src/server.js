import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui"; // socket io 만을 위한 admin페이지 구축해보기! 
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
const wsServer = new Server(httpServer, {
    cors: {
      origin: ["https://admin.socket.io"],
      credentials: true
    }
});

// instrument setting!! 
// 세부 사항 : https://socket.io/docs/v4/admin-ui/
instrument(wsServer, {
    auth: false
});
  

// 우리가 서버를 종료하고 다시 시작할 때 모든 room, msg, socket은 DB 정보 없으면
// 모든 것들이 당연히 처음부터 시작되는 것이다. -> DB에 저장하고 싶다! How2?
// connection open상태를 유지해야 한다? -> 많은 브라우저들은 하나의 서버에 많은 커넥션요청!
// -> 많은 메모리 사용!! -> 지금 서버 메모리에서 "Adaptor"를 사용하고 있다
// => 예시로 3개의 서버는, 같은 connection이지만 같은 memory pool을 공유하지 않는다!!
// https://socket.io/docs/v4/adapter/ 에서 더 세부사항 체크 
// => 모두 같은 정보, 실제론 다른 백엔드 서버 / 분리된 메모리 / in Adaptor 메모리 사용하기 때문
wsServer.on("connection", (socket) => {

    // 닉네임 설정, 어트리뷰트 추가
    socket.nick_name = "Anon"; // 기본값으로 어나니머스

    socket.onAny((event) => {
        // adapter check!! rooms (Map), sids (Map)을 확인 가능하다 
        // log(wsServer.sockets.adapter); // 자료구조 생각하고, private room / public room에 대한 고찰
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
        socket.to(roomName).emit("welcome", socket.nick_name, countRoom(roomName));

        // rooms와 sids이용한 전체 방에 대한 msg공지를 위해 전체 방 정보 전달 
        wsServer.sockets.emit("room_change", publicRooms());
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

    // disconnection을 더 완벽하게 만들어 주기 위해! 
    // 더 완벽하게 방의 개수(public room 정보를 모두)를 전달해 주자!!!
    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    });

    // disconnecting event type 발생시!
    // socket.rooms로 Socket Set(session)리스트를 모두 가져와서 
    // forEach -> 해당 룸 모두에게 'bye' 이벤트 발생
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => {
            // count에 -1 해쥬는 이유는 우리도 포함되기 때문에! 
            socket.to(room).emit("bye", socket.nick_name, countRoom(room) - 1);
        });
    });
});

// wsServer.sockets.adapter로 부터 sids, room를 가져와서
// private, public room info를 이용해 모든 public room을 찾는다!!
// 새로운 '방'이 만들어지면 유저한테 알릴 수 있음!!! 
function publicRooms() {
    // const sids = wsServer.sockets.adapter.sids;
    // const rooms = wsServer.socket.adapter.rooms;
    const { sockets: { adapter: { sids, rooms } } } = wsServer;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

// 해당 total room에 접속한 유저 count, 개수 리턴!! 
function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}


// Set up webscoket server by set port
httpServer.listen(3003, handleListen(3003));