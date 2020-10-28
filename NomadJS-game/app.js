
// https://developer.mozilla.org/ko/docs/Web/HTML/Canvas 
// golbal value area
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// size를 꼭 줘야한다! 
canvas.width = 700; 
canvas.height = 700;

// context setting (config)
ctx.strokeStyle = "#2C2C2C";
ctx.lineWidth = 2.5; // line Width는 굵기다 

// others
let painting = false; // mouse click status

//-----------------------------------------------------------//
// function area

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
}

const stopPainting = () => {
    painting = false;
}

const startPainting = () => {
    painting = true;
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
        // canvas.addEventListener("mouseleave", stopPainting); 
    }
}

//-----------------------------------------------------------//
// main area

initMain();