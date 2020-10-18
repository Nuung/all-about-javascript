
/*
  The basic form is a lot of things that I've got from searching, 
  but I've added a lot of options myself to make it more meaningful.

  And I've added keyboard Down event to window, so u can use keyboard!!!!!
*/

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("kr", {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

// for keyboard input event
const numberList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operationList = ["+", "-", "/", "*"];

// Select Dom object - const
const numberButtons = document.querySelectorAll(".data-number");
const operationButtons = document.querySelectorAll(".data-operation");
const equalsButton = document.querySelector(".data-equals");
const deleteButton = document.querySelector(".data-delete");
const allClearButton = document.querySelector(".data-all-clear");
const previousOperandTextElement = document.querySelector(
  ".data-previous-operand"
);
const currentOperandTextElement = document.querySelector(
  ".data-current-operand"
);

// Make calculaotr object
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// add clcik event for all buttons in numberButtons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// add click event for all buttons in operationButtons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

// add window key event!!
window.addEventListener("keydown", (event) => {
  console.log(`key=${event.key},code=${event.code}`, typeof event.key);

  // handle keydown
  if (event.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  } else if (numberList.indexOf(event.key) >= 0) {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  } else if (operationList.indexOf(event.key) >= 0) {
    if (event.key === "/") calculator.chooseOperation("÷");
    else calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  } else if (event.key === "Enter") {
    calculator.compute();
    calculator.updateDisplay();
  }
});
