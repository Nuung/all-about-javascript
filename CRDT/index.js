const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let drawingData = []; // 좌표 데이터를 저장할 배열
let debounceTimeout; // debounce를 위한 타이머 변수


// 웹소켓 연결
const socket = new WebSocket("ws://localhost:8080");

// ====================================================== //
// Event 정의
// ====================================================== //

const sendDrawingData = () => {
    if (drawingData.length > 0) {
        socket.send(JSON.stringify(drawingData));
        drawingData = []; // 데이터 전송 후 배열 초기화
    }
};

const draw = (event) => {
    if (!drawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();

    const data = {
        start: {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop
        },
        end: {
            x: event.clientX - canvas.offsetLeft,
            y: event.clientY - canvas.offsetTop
        }
    };

    // 웹소켓을 통해 데이터 전송
    socket.send(JSON.stringify(data));
};

const drawLine = (start, end, emit = true) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();

    if (!emit) return;
    const data = {
        start,
        end
    };
    socket.send(JSON.stringify(data));
};

// ====================================================== //
// Event 바인딩
// ====================================================== //

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    drawLine(data.start, data.end, false);
};

canvas.addEventListener("mousedown", () => {
    drawing = true;
    ctx.beginPath();
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener("mousemove", draw);