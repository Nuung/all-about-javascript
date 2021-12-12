'use strick';

// Class Declarations
class Person {
    // 생성자 
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // methods
    speak() {
        console.log(`${this.name}아 안녕!?`);
    }

    // getter and setter
    get age() {
        return this._age;
    }

    set age(value) {
        // if(value < 0) {
        //     throw Error('age can not be negative!');
        // }
        this._age = value < 0 ? 0 : value;
    } 
    // -> what the fuxk? 'Call Stack size exceed!?'
    // -> getter and setter의 변수 명을 바꿔주야함
    // y? thsi.age = age하는 순간 setter를 호출하기 때문에 무한 루프 
    // 그래서 변수 명 앞에 언더바를 추가하는 경우가 많음 
}




// Fields! (public vs private) -> 정말 최근에 추가됨. 사파리에서 지원 X, 바벨 이용해야함 
// 멤버 변수에 # 붙이냐 안붙이냐 접근 차이, 자바 생각행~ 


// About Static, Typescript에서 많이 사용해 먹음 
class Article {
    static publisher = 'Nuung';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }

    static printPublisher() {
        console.log(this.publisher);
        // console.log(Article.publisher);
    }
}
// Static, class 자체에 붙어 있음, object마다 가지고 있는게 아님! 

const test = new Article(3);
console.log(test.publisher);
console.log(test.printPublisher);
console.log(Article.publisher);
Article.printPublisher();
test.printPublisher();