
// https://developer.mozilla.org/ko/docs/Web/HTML/Canvas 
// golbal static int value
const config = {
    INITIAL_COLOR: "#2C2C2C",
    CANVAS_SIZE: 700
};

// golbal value area
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colorBtns = document.getElementsByClassName("jsColor");
const brushSize = document.getElementById("jsRange");
const colorPicker = document.getElementById("jsColorPicker"); // color picker

// interaction BTN
const jsReset = document.getElementById("jsReset");
const jsMode = document.getElementById("jsMode");
// canvas는 png파일로 바로 저장할 수 있는 기적이 있다!
const jsSave = document.getElementById("jsSave"); 

// size를 꼭 줘야한다! 
canvas.width = config.CANVAS_SIZE; 
canvas.height = config.CANVAS_SIZE;
const initConfigSetting = () => {
    // context setting (config)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, config.CANVAS_SIZE, config.CANVAS_SIZE);
    ctx.strokeStyle = config.INITIAL_COLOR;
    ctx.fillStyle = config.INITIAL_COLOR;
    ctx.lineWidth = 2.5; // line Width는 굵기다 
}

// others
let painting = false; // mouse click status
let filling = false; // 컨버스에 채우기 액션을 위해 

//-----------------------------------------------------------//
// function area

const stopPainting = () => painting = false;
const startPainting = () => painting = true;
const onMouseMove = (event) => {
    // mousemove event 값 중 clientX,Y는 윈도우 전체 범위 내에서 마우스 위치값
    // offsetX,Y는 target Dom Object에서 위치값임! <- 이걸 써야함! 
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) { 
        // 그림 시작 위치는 계속 기억해야하니까 아래같은 작업이 있는 것
        ctx.beginPath(); // start to get path position
        ctx.moveTo(x, y); // and move them to x, y
    }
    else {
        ctx.lineTo(x, y); // path의 전 위치에서 지금 위치까지 선을 만드는 것
        ctx.stroke(); // sub-path를 획을 긋는다! 
    }
};

// change color action!
const handleColorClick = (event) =>  {
    const nowColor = event.target.style.backgroundColor;
    ctx.strokeStyle = nowColor;
    ctx.fillStyle = nowColor;
}

// change brush size
const handleRangeChange = (event) => ctx.lineWidth = event.target.value;

// fill and paint mode change button
const handleModeClick = (event) => {
    if(filling === true) {
        filling = false;
        jsMode.innerText = "Fill";
        handleModeToggleAction();
    }
    else {
        filling = true;
        jsMode.innerText = "Paint"
        handleModeToggleAction();

        // ctx.fillStyle = ctx.strokeStyle; // 채우기 색상 맞춰주기! -> handleColorClick
    }
}

const handleModeToggleAction = () => {
    // mouse cursor change on canvas
    canvas.classList.toggle("grab");
    jsMode.classList.toggle("paint_mode");
}

// paint! click! event! on canvas
const handleCanvasClick = () => {
    if(filling) ctx.fillRect(0, 0, config.CANVAS_SIZE, config.CANVAS_SIZE);
}

// save button action
const handleCM = (event) => event.preventDefault(); // 우클릭 방지가 된다! 
const handleSaveClick = (event) => {
    const image = canvas.toDataURL("image/png"); // 코드 형태로
    // temp 앵커 태그를 만들어서 attribute 세팅하고 click 액션을 만들자! 
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[EXPORT]";
    link.click();
    console.log(event);
}

const initMain = () => {
    if(canvas) {
        // canvas Dom object에 mousemove이벤트 추가
        canvas.addEventListener("mousemove", onMouseMove);
        // 캔버스위에서 클릭하는 순간 (그리기 시작 -> painting boolean)
        canvas.addEventListener("mousedown", startPainting)
        // 때는 순간 (그리기 스탑)
        canvas.addEventListener("mouseup", stopPainting)
        // 개인적으로 이게 없는게 더 그리는게 자연스러움
        canvas.addEventListener("mouseleave", stopPainting); 
        // 채우기 액션을 위한 canvas click event
        canvas.addEventListener("click", handleCanvasClick);
        // 우클릭 방지하기모띠
        canvas.addEventListener("contextmenu", handleCM);
    }

    // color button obj
    if(colorBtns) {
        // "Array.from" change objet to array!!
        Array.from(colorBtns).forEach(
            color => color.addEventListener("click", handleColorClick)
        );
    }

    // brush Range obj
    if(brushSize) {
        brushSize.addEventListener("input", handleRangeChange);
        brushSize.addEventListener("change", handleRangeChange);
    }

    // action button obj
    if(jsReset) {
        jsReset.addEventListener("click", () => {
            initConfigSetting();
            brushSize.value = 2.5; // range input value change
            // console.log();
        })
    }
    if(jsMode) jsMode.addEventListener("click", handleModeClick);
    if(jsSave) jsSave.addEventListener("click", handleSaveClick);
    
    // color picker
    if(colorPicker) {
        colorPicker.addEventListener("click", (event => {
            const inputColorPicker = document.createElement("input");
            inputColorPicker.type = "color";
            inputColorPicker.onchange = (event) => { 
                const nowColor = event.target.value;
                colorPicker.style.backgroundColor = nowColor; 
                ctx.strokeStyle = nowColor;
                ctx.fillStyle = nowColor;
            }
            inputColorPicker.click();
        }));
    }  

}

//-----------------------------------------------------------//
// setup env val AND main area

initConfigSetting();
initMain();