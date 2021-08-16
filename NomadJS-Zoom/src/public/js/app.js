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

async function handleCameraChange() {
    log(camerasSelect.value);
    await getMedia(camerasSelect.value);
}

function startMedia() {
    // display 처리 해주기
    welcome.hidden = true;
    call.hidden = false;
    getMedia(); // 비디오 스트리밍의 스타트 지점! 
}

function handleWelcomeSubmit(event) {
    event.preventDefault();
    const input = welcomeForm.querySelector("input");
    // log(input.value);

    // socket io를 통해 서버로 데이터를 보내주자 
    socket.emit("join_room", input.value, startMedia);
    roomName = input.value; // room name 저장하기!
    input.value = "";
}

// ------------------------- Socket code area -------------------------- //

socket.on("welcome", () => {
    log("someone joined");
})


// ----------------------------- Main area ----------------------------- //

const init = () => {
    call.hidden = true;
}

init();