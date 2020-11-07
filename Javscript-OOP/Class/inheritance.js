'use strick';

// A way for one class to extend another class.
class Shape {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        console.log(`Drawing ${this.color} color of`);
    }

    getArea() {
        return this.width * this.height;
    }
}

// 상속 받기 , 공통되는 부분을 새롭게 만들 필요가 없고! 수정도 편하고! 
// 다양성이 생긴다! , 다형성! - 오버라이딩
class Rectangle extends Shape {}
class Triangle extends Shape {
    draw() {
        super.draw();
        console.log("Something more about logs");
    }

    getArea() {
        return (this.width * this.height) / 2;
    }
}

const triangle = new Triangle(100, 200, "Blue");

// Class Checking Instance Of
console.log(triangle instanceof Shape) // -> triangle instanceof Shape는 True
console.log(triangle instanceof Object)