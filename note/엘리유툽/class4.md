# Basic of Coding

> operator, if, for loop code review tip

###

## Operator

- String +, 사칙연산, 전위 · 후위 연산, x +=y <=> x = x + y, logical operatior (||, &&, !), 
    - or은 true를 만나면 무조건 더 이상 조건을 탐색 안한다! (반대로 and는 false를 만나면)
    > 그렇기 때문에 or일때 true가 가장 먼저 올놈 가장 앞으로, 시간 낭비할 놈 뒤로!!

- Equality, loose equality ( == ) vs strict equality ( === type까지 신경)

- 3항 연산!
    - name === 'A' ? "it's true" : "it's false";

## Loop

- for ~ continue ~ break, for each, while, do ~ whle

## More about Function And Arrow Function!!

> ES6 added! 화살표 함수! 그리고 함수에 대해 

### function 

- fundamental building block in the prohgram, sub program can be used multiple times, performs a task or calculates a value

- one function === one thing, 이름은 동사 형태로 하는게 좋음, **function은 js에서 object이다!**

- js에서는 매개변수 type, return type명시 필요 없음 (typescript가 필요한 이유)

- Rest Parameters (added in ES6) ```...args``` 형태의 인자!
    ```javascript
    function printAll(...args) {
        for( const arg of args) {
            console.log(arg);
        }
        args.forEach((arg) => console.log(arg));
    }
    ```

- Local Scope! 

- anonymous function, debug할때 익명함수에 이름 붙이는 경우도 있음
    ```javascript
    const print = function() {
        console.log("Something");
    }
    ```
    - hosting이 된다. 선언되기 이전에 호출되어도 가능하다는 것이다! 
    - 선언 된 것을 가장 위로 올려주기 때문이다. 

### Arrow

```javascript
const simplePrint = () => console.log("SOMETHING");
const add = (a, b) => {
    // ... do something;
}
```

- IIFE: Imeediately Invoked Function Expression
    - 함수 선언과 덩어리를 ()로 묶어서 바로 () 로 call