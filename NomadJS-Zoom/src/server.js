import http from "http";
import WebSocket from "ws";
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
app.get("/*", (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    log(`${new Date().toISOString()}: ${fullUrl}`);
    res.redirect("/")
}); // use only home url!
// ======================================================

// set up server listen port with log
const handleListen = (port) => {
    if (port) log(`http Server Run Clear with express, hello Noom world! : ws://${host}:${port}`);
    else log(`WebSocket Server Run Clear with http module!! hello Noom world! : ${protocol}://${host}:${defaultPort}`);
};
// app.listen(defaultPort, handleListen); -> websocket 예시를 위해 주석

// ======================================================
// Socket Server
// ======================================================
/**
 * @WsRequestResponse
 */
// WS protocol (웹소켓 프로토콜) 서버를 만들자
// application 계증의 프로토콜, http 프로토콜 기반으로 웹소켓 서버 구축, 그래서 http 모듈 이용 
// Create A Server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // ws 모듈 내부 Server 클래스 object 생성, 생성자매개변수 server 전달

// connection으로 생성된 socket object를 list에 (array) 담아서 보관하자!!
// 단톡방 개념으로 한꺼번에 커넥션을 관리하고, recieve msg <-> send msg 를 리스트에 담긴 모든 소켓에게 트리깅
const socketLists = [];

// client side에서 data를 object(JSON)으로 보내기로 결심했다
// parse해주는 과정이 필요해졌다!
function parseMsg(msg) {
    return JSON.parse(msg);
}

// Run, Create WebScoketServer
wss.on("connection", handleConnection);

// 이벤트 인식 기반으로, 웹소켓도, node작동 원리처럼, 이벤트 풀에서 이벤트 발생 여부 계속 체크하면서 그 이벤트 발생시 해당하는 object(함수포함) 비동기 callback
// 예시로 addEventListenr를 생각해보자~ 'type' 이있다. 그 type에 해당하는 여러 형태가 있다. 
// connection, close, error, header, listening
function handleConnection(socket) {
    socketLists.push(socket);
    socket["nickname"] = "Anonymous" // nick네임 설정을 object의 attribute로 꾀하기 위함

    // log(socket);
    log("⃝ Connected to the Browser ✅");
    // socket.send("HELLO!!");

    // client로부터 socket connection이 끊기면
    socket.on("close", () => onSocketClose);

    // client로부터 msg를 받으면
    socket.on("message", (msg) => {
        // msg what server got send to client 
        // socketLists.forEach(targetSocket => targetSocket.send(msg.toString('utf8')));
        // socket.send(msg.toString('utf8')); 

        // 위 상황과 다르게 client side에서 data를 just string으로 보내지만
        // JSON을 stringify 해서 보냈다! 이제 parse해서 type에 따라서 처리해주자!
        const parsedMsg = parseMsg(msg);

        // type 핸들링
        switch (parsedMsg.type) {
            case "new_msg": {
                socketLists.forEach(targetSocket => {
                    targetSocket.send(`${socket.nickname}: ${parsedMsg.payload.toString('utf8')}`);
                });
                break;
            }
            case "nickname": {
                socket["nickname"] = parsedMsg.payload.toString('utf8');
                break;
            }
            default:
                break;
        }
    });
}

// On socket object close
function onSocketClose() {
    log("X Disconnected from the Browser 🚫")
}

// On socket object get msg
// function onSocketMsg(msg) {
//     log(msg.toString('utf8')); // msg ENCODE check
// }




// Set up webscoket server by set port
server.listen(3003, handleListen(3003));