// static configue
const log = console.log;

// FE에서 script(src="/socket.io/socket.io.js") 를 이용해서 가져온 socket.js를 통해 
// socket io init -> 생성자 + connection
const socket = io();

// -------------------- static dom selector area -------------------- //
const myFace = document.getElementById("myFace");           // video tag
const muteBtn = document.getElementById("mute");            // mute button
const cameraBtn = document.getElementById("camera");        // camera on/off button
const camerasSelect = document.getElementById("cameras");   // select area
const welcome = document.getElementById("welcome");         // welcome div for joining room action
const welcomeForm = welcome.querySelector("form");          // form under the welcome
const call = document.getElementById("call");               // origin DIV (video) 

// add Events
muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);
welcomeForm.addEventListener("submit", handleWelcomeSubmit)

// not const
let myStream;
let muted = false;
let cameraOff = false;
let roomName = "";
let myPeerConnection;

// -------------------------- Function area -------------------------- //

// get user media HTML api 사용하기 -> 비동기 + await!!
async function getMedia(deviceId) {
    // deviceId가 없을때, 초기 설정 
    const initConstraints = {
        audio: true,
        video: { facingMode: "user" }
    }

    // deviceId로 select한 option의 value 값으로 카메라 변경!
    const cameraConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } }
    }

    try {
        
        // getUserMedia에 값으로 오는 것들이 constraints ( https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia )
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initConstraints
        );
        // log(myStream);
        myFace.srcObject = myStream;

        // 아래 행위는 최초 (init)일때 한 번 만! 
        if (!deviceId) {
            await getCameras(); // 카메라 장치 정보 얻어오기    
        }
    } catch (error) {
        log(error);
    }
}

// 연결된 비디오 장치 모두 array형태로 얻어오기! -> 이것 중 kind가 video input인 것만 잡으면 된다 (그게 카메라!)
async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === "videoinput");

        // 호출했을때 지금 스트리밍 중인 해당 카메라 정보를 얻고 싶다!
        const currentCamera = myStream.getVideoTracks()[0]; // 첫번째 트렉을 가져온다! 

        cameras.forEach(camera => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;

            // 지금 내가 스트리밍 중인, 해당하는 option을 선택하게 만들고 싶다! 
            if (currentCamera.label == camera.label) {
                option.selected = true;
            }

            camerasSelect.appendChild(option);
        });
    } catch (error) {
        log(error);
    }
}

function handleMuteClick() {
    myStream
        .getAudioTracks()
        .forEach(track => {
            track.enabled = !track.enabled;
        });
    if (!muted) {
        muteBtn.innerText = "Unmute";
        muted = true;
    }
    else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
}

function handleCameraClick() {
    myStream
        .getVideoTracks()
        .forEach(track => {
            track.enabled = !track.enabled;
        });
    if (cameraOff) {
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    }
    else {
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }
}

// Peer 2 Peer 연결할때 작동 안하는 issuse
async function handleCameraChange() {
    // log(camerasSelect.value);
    // 카메라가 바뀔 때 new stream이 만들어진다! 해당하는 그 stream을 update해줘야 한다! 
    await getMedia(camerasSelect.value);

    // peer 2 peer connection이 되어 있을때 카메라 변경을 하면
    // myStream이 새롭게 생겼고, 그 값 바탕으로 sender를 수정해줘야 한다!! 
    if (myPeerConnection) {
        const videoTrack = myStream.getVideoTracks()[0];

        // log(myPeerConnection.getSenders());
        // video에 해당하는 sender만 가져오기!
        const videoSender = myPeerConnection.getSenders()
            .find(sender => sender.track.kind === "video");

        videoSender.replaceTrack(videoTrack);
    }

}

// called by handleWelcomeSubmit
async function initCall() {
    // display 처리 해주기
    // welcome.hidden = true;
    welcome.style.display = "none";
    call.hidden = false;
    await getMedia(); // 비디오 스트리밍의 스타트 지점! 
    makeConnection();
}

async function handleWelcomeSubmit(event) {
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    // welcomeForm.hidden = true;
    // log(input.value);

    // socket io를 통해 서버로 데이터를 보내주자 
    // 다음 문제 핸들링 위해 await로 먼저 호출하고, join room에는 넘겨주지 않는 방식으로 변경
    // -> undefined가 일어난다 -> socket io 통신이 myPeerConnection이 정의 되기 전에 offer값이 들어오기 때문에
    await initCall();
    socket.emit("join_room", input.value);
    roomName = input.value; // room name 저장하기!
    input.value = "";
}

// peer A <-> peer B / IceCandidate !
function handleIce(data) {

    // Icecandidate의 data들은 peer A <-> peer B 끼리 주고 받아야 한다 
    // data를 서버를 통해 주고 받기 
    socket.emit("ice", data.candidate, roomName);
    log("🔴 Send icecandidate");
    // log(data);
}

// Peer connection이 된 후에 이제 서로 스트림을 공유하기! 
function handleAddStream(data) {
    log("⚫️ got an stream from my peer");

    // Peer A와 Peer B의 아래 값이 어떻게 다른지, 어떤 값을 서로 가지고 있는지 확인해보자!
    log("⚫️ Target Peer's Stream:", data.stream);
    log("⚫️ My Stream Stream:", myStream);

    // 이제 서로 스트림 값 공유하니, 그 값을 DOM에 insert 해주기만 하면 된다. 
    const peerFace = document.getElementById("peerFace");
    peerFace.srcObject = data.stream;
}

// ------------------------- Socket code area -------------------------- //
// Peer A
socket.on("welcome", async () => {
    log("someone joined");

    // 누가 peer A일까? 누가 peer B일까? offer를 알아보자!
    const offer = await myPeerConnection.createOffer();
    // log(offer); // sdp 값이 peer 끼리 연결해주는 값! RTCsessionDescription!! 초대장!
    myPeerConnection.setLocalDescription(offer); // 나의 peerConnection을 초대장 값으로!

    // 위 오퍼 값을 peer B로 보내줘야 한다
    // 누구한테 이걸 보낼지!
    log("🔵 Peer A Send The Offer");
    socket.emit("offer", offer, roomName);
});

// Peer B
socket.on("offer", async (offer) => {
    log("🟢 Peer B Get The Offer");
    // log(offer);

    // remote (peer B 입장에서) offer값을 set 해주기 
    // undefined가 일어난다 -> socket io 통신이 myPeerConnection이 정의 되기 전에 offer값이 들어오기 때문에
    myPeerConnection.setRemoteDescription(offer);

    // answer 만들어줘서 peer A에게 응답해주자
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer); // Peer B의 local은 answer로 정의!!
    // log(answer); // offer 값과 비슷하게 생겼다! 이걸 이제 Peer A에게 보내주자! 
    socket.emit("answer", answer, roomName);
    log("🟢 Peer B Send The Answer");
});

// Peer A
// 위에서 peer B가 보낸 answer을 서버를 통해 받는다
socket.on("answer", (answer) => {
    // peer A도 이제 remote 값을 answer로 세팅해주자!! 
    log("🔵 Peer A Get The Answer");
    myPeerConnection.setRemoteDescription(answer);

    // 이제 peer A <-> peer B 의 peer Connection이 완료, 생성 되었다.
    // 이때부터 IceCandidate 가 일어난다
    // IceCandidate는 webRTC에 필요한 프로토콜을 의미한다. -> 멀리 떨어진 장치와 소통할 수 있게 하기 위함이다! (프로토콜)

});

// Peer A <-> Peer B ice candidate data socket handle
socket.on("ice", (ice) => {
    log("🔴 Get the candidate");
    myPeerConnection.addIceCandidate(ice);
})
// --------------------------- RTC code area ---------------------------- //
// RTC peer 만들기
function makeConnection() {
    // const peerConnection = new RTCPeerConnection();
    // 이 연결을 모든 곳에 공유하고 싶다! 그 stream을 공유한 것 처럼! 
    // 다른 네트워크 환경에서도 사용 가능하게 (stream이 공유 가능하게) 하려면 stun 서버를 사용해야 한다!
    // 장치에 공용 주소를 알려주는 역할이다! 서로 찾을 수 있게! 
    // https://alnova2.tistory.com/1110
    myPeerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                    "stun:stun3.l.google.com:19302",
                    "stun:stun4.l.google.com:19302",
                ],
            },
        ],
    });
    // myPeer에 (peer A또는 peerB 모두) data를 주고 받는 이벤트 활성화, 그 이벤트는 icecandidate
    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("addstream", handleAddStream);
    // log(myStream.getTracks()); // 이 각각(오디오, 비디오)의 트랙, 그 데이터들을 peer connection에 담아야 한다
    // myStream obj에 해당 track을 add 해주기 -> 근데 myPeerConnection에다가 add해주기 
    myStream
        .getTracks()
        .forEach(track => myPeerConnection.addTrack(track, myStream));
}

// ----------------------------- Main area ----------------------------- //
// media start 핸들링 처리는 방 입장 버튼이 해줌! welcomeForm -> handleWelcomeSubmit -> 
const init = () => {
    call.hidden = true;
}

init();