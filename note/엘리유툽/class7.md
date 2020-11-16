# All about Array! and APIs

> Array를 유용하게 사용해보자! 

- 자료구조와 Object? 그리고 Class? 비슷한 오브젝트를 묶어 놓는 걸 array -> JS는 dynamically typed language! -> 다른 종류의 데이터도 array로 묶는 미친 짓 가능

###

## Array

- index (주소값(을 실제로는 우리가 알아보기 쉬운 순서로 시작함), 0부터 시작)

- how 2 make and 실습
    ```javascript
    const arr1 = new Array(); 
    arr1.push(1); arr1.push("Something");
    const fruits = ["🔥", "📚"];
    fruits.pop(); // stack처럼 사용 가능! 

    // callback함수! 벨류 하나 하나마다 콜백 함수 호출 -> value, index, array (parameter) 
    fruits.forEach((fruit, index, array) => {
        console.log(fruit, index, array); // array는 잘 사용하지 않음 
    }); 

    // unshift: "add" an item from the beginning
    fruits.unshift("one", "two");

    // shift: "remove" an item from the beginning
    fruits.shift();
    ```

- shift연산들은  pop / push 에 비해서 굉장히 느리다!! -> 밀고, 재할당하고, 다시 넣고의 반복 연산이기때문이다
    - 그래서 target index를 remove하기 위해 **splice**를 쓰는게 좋다!
    ```javascript
    fruits.splice(startIndex: number, howMany?: number); 
    fruits.splice(startIndex: number, howMany?: number, [그자리에 넣을 것들...]?); 
    ```

- 두가지 배열을 묶어서도 가능하다! - concat을 이용하면 됨

- find할때는 array.indexOf("data"); 를 이용하고, 들어있는지만 체크하려면 array.includes("target data"); 를! 근데 indexOf 도 포함되어 있지 않으면 -1을 리턴한다. 

- lastIndexOf('target data');  / sort() 


## 그 외 유용한 Array API

- join()
    - ```origin.join(구분자?: string);``` object의 모든 값을 구분자 기준으로 string으로 만들어서 리턴한다! -> 디폴트 구분자는 콤마!

- string to array 
    - String api인 ```split(구분자: string | 정규표현식, 리턴받을 배열사이즈?: )```

- reverse(): 순서 거꾸로 / object도 변경해버린다!

- Class - object에서, 그 object들의 array가 있을때 - Student 클래스에서 점수가 50점인 obj찾기
    - find() // predicate -> callback함수!!! -> 리턴은 boolean으로
    - ```students.find((student, index) => student.socre === 90);``` 와 같이 작성이 가능하다. 
        - Arrow function 특성상 한줄이면 세미콜론 중괄호, 리턴 명시 모두 생략이 가능하다는 점!

    - object중 특정 멤버변수(특정 어트리뷰트)가 true인것만 가져오려면? // filter, 역시 callback + arrow function
    - ```const result = students.filter((student) => student.enrolled);```

    - object중 점수만 가져오기 / map API 이용, 맵핑! / 리턴되어진 값들로 대체하기!
    - ```const result = students.map((student) => student.score);```
    - ```const result = students.map((student) => student.score * 2);```

    - 배열 요소중 callback함수가 true가 되는애가 있는지 없는지! / some이용
    - ```const result = students.some((student) => student.score < 50);```  => 하나라도 이 조건에 만족되면 true / 아니면 false // 몇 몇!
    - ```const result = !students.every((student) => student.score >= 50);```  => 모든 object가 이 조건에 만족되면 true / 아니면 false // 모두!

    - 평균 점수를 가져오기? / reduce 이용하기! / callback || 이니셜벨류! 
    ```javascript
    const result = students.reduce((prev, curr) => {
        // console.log(prev + ", " + curr);
        // return curr; // 리턴하는 것들이 순차적으로 prev값이 된다! 
        return prev + curr.score;
    }, 0); // <- 0부터 시작한다는 것을 명시! 

    console.log(result / students.length); // 평균값 구하기

    // reduceRight은 순서만 반대로 되는 것!
    ```

    - 모든 점수를 하나의 string으로 묶어서 표현하기 / 여러개 api묶어서 사용해보자 
    ```javascript
    const result = students.map((student => student.score))
    .filter(socre => score >= 50)
    .join();
    ```
    - 위와 같은 것을 "**함수형 프로그래밍**" 이라고도 부른다!
