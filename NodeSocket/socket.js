const SocketIO = require("socket.io");

module.exports = (server) => {
    const io = SocketIO(server, {
        path: "/socket.io",
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });

    // 첫 매개변수 event 이름, "연결"이 되어야 ping - pong 가능
    // FE와 BE의 연결 완료에서 "connection" event 발생
    io.on("connection", (socket) => {

        // FE에서 보낸 event - "broadcast" 를 받고 처리 
        socket.on("broadcast", (msg) => {
            io.emit("receiveAll", msg);
        });
    });
}