# Async · Defer
> script를 load 할때 어케하지?! 그리고 아주 기본, 기초적 내용 쌓아 올리기
- js 공식사이트는 ecma-international.org이지만 developer.mozilla.org가 그 공식 문서를 정리해놓은 공식 사이트임 

- ``` 'use strick'; ``` 정의 해주자! (typescript는 필요 없음) -> 유연함을 없애주기

###


## Web API

- 브라우저가 이해할 수 있는 함수들
- [MDN 설명 부록](https://developer.mozilla.org/ko/docs/Web/%EC%B0%B8%EC%A1%B0/API)
- 크롬 개발자 도구 -> Sources -> break point 이용가능함 (ide에서만 하려고 하디말장)

## js를 포함할때 어떻게 해야 더 효율적인가?

- script tag를 만나면 parsing을 멈추고 fetching과 executing과정을 가진다! 

- head 끝에 넣기? body 제일 끝에 넣기?
    ```html
    <script src="one.js"></script>
    <script src="two.js"></script>
    ```
    - head에 넣으면 아래 이미지와 같은 과정
        
        <img src="https://github.com/Nuung/vanilla-javascript/blob/master/note/%EC%97%98%EB%A6%AC%EC%9C%A0%ED%88%BD/class2_img1.png" width="70%" />

    - body끝에 넣으면 아래 이미지와 같은 과정
        
        <img src="https://github.com/Nuung/vanilla-javascript/blob/master/note/%EC%97%98%EB%A6%AC%EC%9C%A0%ED%88%BD/class2_img2.png" width="70%" />

        - js에 의존적인 page라면, 정상적인 결과를 위해 client가 모든 dom요소를 파싱이 다 될때까지 + fetching, executing을 기다려야하는 문제점이 있다. 

    - head안에 **"asyn src"** 로 불러온다면?
        
        <img src="https://github.com/Nuung/vanilla-javascript/blob/master/note/%EC%97%98%EB%A6%AC%EC%9C%A0%ED%88%BD/class2_img3.png" width="70%" />

        - 모두 DOM요소를 모두 parsing하기 전에 js를 executing하기때문에 querySelect... 등의 DOM 제어한다면 그 제어시점과 엇나갈 수 있다!! 
        - blocking 시간이 있다

    - head안에 **"asyn src"** 로 여러개를 불러온다면?
        
        <img src="https://github.com/Nuung/vanilla-javascript/blob/master/note/%EC%97%98%EB%A6%AC%EC%9C%A0%ED%88%BD/class2_img4.png" width="70%" />

        - 순서가 중요한 js의 경우? 호환이 안될 가능성이 농후함!

    - head안에 **"defer src"** 로 불러온다면?
        
        <img src="https://github.com/Nuung/vanilla-javascript/blob/master/note/%EC%97%98%EB%A6%AC%EC%9C%A0%ED%88%BD/class2_img5.png" width="70%" />

        - 가장 좋은 옵션이다. 다운로드만 parsing과 동시에 해두고 page가 ready되었을때 바로 executing을 하는 것이다. 

    - head안에 **"defer src"** 로 여러개를 불러온다면?
        
        <img src="https://github.com/Nuung/vanilla-javascript/blob/master/note/%EC%97%98%EB%A6%AC%EC%9C%A0%ED%88%BD/class2_img6.png" width="70%" />

        - 다운로드만 받아놓고 순서대로 실행함 