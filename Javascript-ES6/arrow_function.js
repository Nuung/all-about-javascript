// Arrow functions(화살표 함수)

/** ===================================================
 * @title ES5- 에서 함수 선언과 사용
 =================================================== */

// case 1
function myFunc(name) {
    return '안녕' + name;
}

console.log(myFunc('영희')); // 출력 => 안녕 영희

// case 2
const myArrary = ['진수', '영철', '영희', 5];

let arr1 = myArrary.map(function (item) {
    return item;
});

console.log(arr1); // 출력 => (4) ["진수", "영철", "영희", 5]


/** ===================================================
 * @title ES6+ 화살표 함수
 =================================================== */

// case 1
const myFunc = (name) => {
    return `안녕 ${name}`;
}

console.log(myFunc('영희')); // 출력 => 안녕 영희

// 또는 화살표를 사용하거나 'return' 키워드를 사용하지 않아도 됩니다
const myFunc = (name) => `안녕 ${name}`;
console.log(myFunc('영희')); // 출력 => 안녕 영희

// case 2
let arr2 = myArrary.map((item) => item);
console.log(arr2); // 출력 => (4) ["진수", "영철", "영희", 5]
