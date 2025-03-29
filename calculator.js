let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = 0;

const display = document.querySelector("#display");
display.value = "0";
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const decimalButton = document.querySelector(".decimal");
operatorCount = 0; // Servira plus tard lorsque je voudrais mettre plusieurs opérateurs 

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

function remainder(a, b) {
    return a % b;
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
        case "^":
            return power(firstNumber, secondNumber);
        case "%":
            return remainder(firstNumber, secondNumber);
        default:
            return "Invalid operator";
    }
}

function updateDisplay(value, operator) {
    if (display.value === "0") {
        display.value = value;
    } else {
        display.value += value;
    }

    if(display.operator !== "") {
        display.operator += operator;
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(operator === "") {
            firstNumber += button.value;
            updateDisplay(button.value, operator);
        }
        else {
            secondNumber += button.value;
            updateDisplay(button.value);
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        operator += button.value;
        updateDisplay(button.value, operator);
    });
});

decimalButton.addEventListener('click', () => {
    if (operator === "") {
        firstNumber += ".";
        updateDisplay(".", operator);
    }
    else {
        secondNumber += ".";
        updateDisplay(".", operator);
    }
});

backspaceButton.addEventListener('click', () => {
    if (secondNumber === "" && operator === "") {
        firstNumber = firstNumber.slice(0, -1);
        display.value = firstNumber || "0";  // Afficher "0" si firstNumber est vide
    } 
    else if (secondNumber === "") {
        operator = "";
        display.value = firstNumber; // Afficher juste firstNumber
    } 
    else {
        secondNumber = secondNumber.slice(0, -1);
        display.value = firstNumber + operator + secondNumber;
    }
});

clearButton.addEventListener('click', () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";

    display.value = "0";
});

equalButton.addEventListener('click', () => {
    if (firstNumber.includes(".") === true) {
        firstNumber = parseFloat(firstNumber);
    }
    else {
        firstNumber = parseInt(firstNumber);
    }

    if (secondNumber.includes(".") === true) {
        secondNumber = parseFloat(secondNumber);
    }
    else {
        secondNumber = parseInt(secondNumber);
    }

    result = operate(firstNumber, operator, secondNumber);
    console.log(result);
});