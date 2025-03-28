let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

const button = document.querySelectorAll(".buttons");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
function power(a, b) {
    return Math.pow(a, b);
}

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return secondNumber !== 0 ? divide(firstNumber, secondNumber) : "Error: Division by zero";
        case"^":
            return power(firstNumber, secondNumber);
        default:
            return "Invalid operator";
    }
}

function clear() {

}

function displayValue() {
    let displayedValue = "";
    const display = document.querySelector("#display");
    const digitButtons = document.querySelectorAll(".buttons");

    digitButtons.forEach(button => {
        button.addEventListener("click", () => {
            displayedValue += button.textContent;
            display.textContent = displayedValue;
        });
    });
}

displayValue();
