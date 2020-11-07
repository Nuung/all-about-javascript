# OOP, Object Oriented Programming

> 클래스와 오브젝트, 객체 지향, ES6에서 도입됐음

[코드 실습 파일 폴더](https://github.com/Nuung/all-about-javascript/tree/master/Javscript-OOP/Class)

###

## Class and Object

``` 약 3년~ 4년 전 java 객체 배던던 생각나서 추억 돋았다.. ```

- class
    - template, declare once, no data in
    - 정의만 한거리 메모리에 올라가지 않지

- object 
    - instance of a class
    - created many times, data in
    - 메모리를 차지 한거여~ 붕어빵 틀~

- 실습 중심으로 조질꺼라 코드들을 참고하자! 주석도 되어 있다. 위 링크 확인하자! 

- Js MDN Refer 참고 자료 : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference 


## Object

- [MDN Oject](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object)


- a collection of related data and/or functionality. Nearly all objects in JS are instances of Object

    ```javascript
    // soooo simple object
    const people = { // object literal syntax
        name: "Hyeonwoo",
        age: 26
    };
    const people = new Object(); // object constructor syntax

    // js는 real time - run time 
    people.hasJob = true; // object에 key, value 값을 추가할 수 있다는 점 -> 지양
    delete people.hasJob; // 그래서 이와 같이 제거도 가능하다. 
    ```

- Computed Properties
    - objet.propertie 로 접근한다. <-> object['key']로 접근도 가능하다. 이게 배열 처럼, 어떻게 보면 JSON 같은 느낌! 하나 주의할 점은 프로퍼티(키)는 무조건 string type으로

- **어떤 경우에 어떤 것을 써야할까?**
    - dot은 코딩하는 순간 특정 키에 해당하는 값을 가져올때
    - ['key']는 run time에서 그 값을 가져오고 싶을때, 정확히 어떤 값인지 애매할때
    - 코딩할때는 dot을 쓰는게 맞다. 실시간으로 원하는 키 값 가져올때!

    ```javascript
    // 이 코딩을 할때는 key라는 프로퍼티가 있는지 없는지 불확실
    function printValue(obj, key) { 
        // console.log(obj.key);
        console.log(obj['key']); // 그래서 computed properties를 사용 
    }

    printValue(people, 'name');

    ```

- Property Value Shorthand
    - 같은 object를 여러개 찍어내야 할때? class와 다름을 계속해서 생각하자! 

    ```javascript
    // template 느낌으로 찍어내기, 보통 이렇게 object찍어내는 함수들은 대문자 시작으로 암묵적 규칙이 있음. 그리고 return대신 아래와 같이 사용 
    function Person(name, age) {
        //return {
        //    name,
        //    age
        //}
        this.name = name;
        this.age = age;
    }
    const person4 = new Person('hyeon', 99);

    ```
    - **위와 같은 것이 바로 Constructor Function 이다**

- In operator : property existence check (key in object)!
    - console.log('name' in people); 와 같이 사용 가능 

- For .. in VS For .. of
    ```javascript
    // object 전요 
    for (key in people) {
        console.log(key);
    }

    // object보다 Array와 같은 순차적으로 list한! 
    const array = [1, 2, 3, 4, 5];
    for (value of array) {
        console.log(value);
    }
    ```

- Cloning, Object.assign(dest, [obj1, obj2, ...])
    - [링크에서 보는게 더 좋은 듯](https://junwoo45.github.io/2019-09-23-deep_clone/)
        - 핵심은 얕은 복사 vs 깉은 복사 (포인터로 같은 주소만 가르키느냐 vs 똑같은 형태의 값으로 새로운 주소 할당을 받아서 만드냐)
        - Objet static method 이용 -> **Object.assign(Target, Source)**

