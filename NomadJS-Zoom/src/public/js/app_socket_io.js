// static configue
const log = console.log;

// FE에서 script(src="/socket.io/socket.io.js") 를 이용해서 가져온 socket.js를 통해 
// socket io init -> 생성자 + connection
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room"); // dom div#room
let staticRoomName = ""; // static value

// display none으로 일단 만들어두기 -> room들어가면 on
room.hidden = true;

// join the room -> show chat list
function showRoom(roomName) {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName}`;
    staticRoomName = roomName;

    // snd msg DOM 
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgForm.addEventListener("submit", handleMsgSubmit);
    nameForm.addEventListener("submit", handleNameSubmit);
}

// sent the msg to the room socket
function handleMsgSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    // let roomName = room.querySelector("h3").innerText;
    // roomName = roomName.split(":")[1].trim(); // parsing data 하하 
    socket.emit("new_message", input.value, staticRoomName, () => {
        addMsg(`You: ${input.value}`);
        input.value = "";
    });
}

// sent the nick name
function handleNameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#name input");
    socket.emit("nick_name", input.value);
}

// join the room
function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    // WS와 다르게, 소켓 object의 이벤트 '형태(type)', data '형태(type)' 모두 따로 정의를 해서 
    // 백엔드와 커뮤니케이션이 가능하다 / 게다가 node-mon으로 백엔드 리프레쉬되어도 자동 리커넥션으로 소켓 연동이 계속 되는 걸 확인가능하다
    // 3번째 인자로 callback function을 option으로 받기때문에 ㅈㄴ편해짐
    /*
    socket.emit("enter_room", { payload: input.value }, (returnMsg) => {
        log(`Send enter_room: ${input.value}, server done well ✅`);
        log(returnMsg);
    }); 
    */

    socket.emit("enter_room", input.value, (returnMsg) => {
        showRoom(returnMsg);
    });
    input.value = "";
}

// Append list to ul ~ like chat list
function addMsg(msg) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = msg;
    ul.append(li);
}

// EVENT LISTNER
form.addEventListener("submit", handleRoomSubmit);

// BE에서 클라이언트(FE)보내주는 것들 캐치해보자
// BE와 마찬가지로 on을 통해 해당 key event를 캐치하자!
socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${staticRoomName} (${newCount})`;
    addMsg(`${user} Joined the room!!`);
});

socket.on("bye", (left, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${staticRoomName} (${newCount})`
    addMsg(`${left} left the room!!`);
});

// new msg add to ul (by making list)
socket.on("new_message", addMsg);

// BE에서 새롭게 생긴 방(public room) 모두 얻어서 FE로 가져왔음
socket.on("room_change", (rooms) => {

    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = ""; // 일단 비우고 다시 그려주기

    // room이 0인 상태면 걍 바로 리턴
    if (rooms.length === 0) return;

    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});