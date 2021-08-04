// static configue
const log = console.log;
log(window.location.host);
const socket = new WebSocket(`ws://${window.location.host}`);

// static target dom
const msgList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const msgForm = document.querySelector('#msg');

// websocket으로 주고 받는 data의 형태가 just string이다, 하지만 우린 여러 data형태를 구분한 상태로 주고 받고 싶다
// 즉 object 이면 좋겠다. 그럴때 JSON stringify <-> parse를 이용하자! 
// 그러기 위해 캐스팅이 필요하다! -> 서버(Backend)에서는 당연히 Parse를 통해서 체크를 해야겠지?
function makeMsg(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}

// BE에서 'send' 했으니까 'client'가 일단 받아야지!
// 역시 socket의 event type에 해당하는 여러 형태가 있다 
socket.addEventListener("open", () => {
    log("⃝ Connected to the WebSocketServer ✅");
});

// 서버에서 메시지 보내니까 아래 이벤트 핸들링됨
socket.addEventListener("message", (message) => {
    /*
    log(message); // 아래는 해당 message object log
    MessageEvent {isTrusted: true, data: "HELLO!!", origin: "ws://localhost:3003", lastEventId: "", source: null, …}
        bubbles: false
        cancelBubble: false
        cancelable: false
        composed: false
        currentTarget: WebSocket {url: "ws://localhost:3003/", readyState: 1, bufferedAmount: 0, onopen: null, onerror: null, …}
        data: "HELLO!!"
        defaultPrevented: false
        eventPhase: 0
        isTrusted: true
        lastEventId: ""
        origin: "ws://localhost:3003"
        path: []
        ports: []
        returnValue: true
        source: null
        srcElement: WebSocket {url: "ws://localhost:3003/", readyState: 1, bufferedAmount: 0, onopen: null, onerror: null, …}
        target: WebSocket {url: "ws://localhost:3003/", readyState: 1, bufferedAmount: 0, onopen: null, onerror: null, …}
        timeStamp: 234.60000002384186
        type: "message"
        userActivation: null
    */
    // log(`New msg: ${message.data}`);

    // create li and append to ul DOM
    const li = document.createElement('li');
    li.innerText = message.data;
    msgList.append(li);
});

// 서버를 끄니까 아래 이벤트 핸들링됨 
socket.addEventListener("close", () => {
    log("X Disconnected from the WebSocketServer 🚫");
});

// 10초 뒤에 서버로 msg 보내기 (역으로 socket object 전달~) -> msg send from cilent to server test
/*
setTimeout(() => {
    socket.send("hello~ from the browser!");
}, 10000);
*/

// Add event to [ msgForm ] dom object
msgForm.addEventListener("submit", handleMsgSubmit);
function handleMsgSubmit(event) {
    event.preventDefault();
    const msgInput = msgForm.querySelector('input');
    // log(msgInput.value);
    socket.send(makeMsg("new_msg", msgInput.value));
    msgInput.value = ""; // empty target dom's value
    
    // front에서 효과 추가 

}

// Add event to [ nickForm ] dom object
nickForm.addEventListener("submit", handleNickSubmit);
function handleNickSubmit(event) {
    event.preventDefault();
    const nickInput = nickForm.querySelector('input');
    const nickValue = nickForm.querySelector('#nick__value');
    nickValue.innerText = nickInput.value;
    socket.send(makeMsg("nickname", nickInput.value));
}