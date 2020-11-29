'use strict';

// 기본 문법에서 사용하던 static - instance 방법 

/*
function Shape(x, y) {
    this.name = 'Shape';
    this.move(x, y);
}

// static fun
Shape.create = function(x, y) {
    return new Shape(x, y);
}

// instance fun
Shape.prototype.move = function(x, y) {
    this.x = x; 
    this.y = y;
}

Shape.prototype.area = function() {
    return 0;
}

// 또는 (위와 같지만 다른 방식)
Shape.prototype = {
    move: function(x, y) {
        this.x = x;
        this.y = y;
    },
    area: function() {
        return 0;
    }
};

const s = new Shape(0, 0);
console.log(s.area());
*/

// ES6 Class 도입으로 달라진 방법 
class Shape {
    static create(x, y) { return new Shape(x, y); }
    name = 'Shape'; // 멤버 변수

    constructor(x, y) { // 생성자 
        this.move(x, y);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    area() {
        return 0;
    }
}

const s = new Shape(0, 0);
console.log(s.area());


class Circle extends Shape {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    area() {
        if(this.radius === 0) return super.area();
        return this.radius * this.radius;
    }
}

const c = new Circle(0, 0, 10);
console.log(c.area());