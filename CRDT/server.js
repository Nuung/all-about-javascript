const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    // 클라이언트로부터 메시지를 받았을 때
    ws.on("message", (message) => {
        const stringData = message.toString('utf8'); // Buffer를 문자열로 변환

        // 다른 모든 클라이언트에게 메시지 전송
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                // console.log(typeof (stringData))
                // console.log(stringData);
                client.send(stringData);
            }
        });
    });
});

console.log("Server started on port 8080");
