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
let decimalCount = 0; // Servira plus tard pour empeche l'utilisateur de mettre plusieurs virgules
let secondDecimalCount = 0;

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
    let div = a / b;

    if (Number.isInteger(a / b) === false) {
        return div.toFixed(3);
    }
    else {
        return div;
    }
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
        if (operator === "") {
            operator += button.value;
            updateDisplay(button.value, operator);
        }
    });
});

decimalButton.addEventListener('click', () => {
    if (operator === "" && decimalCount === 0) {
        firstNumber += ".";
        decimalCount += 1;
        updateDisplay(".", operator);
    }
    else if (operator !== "" && secondDecimalCount === 0) {
        secondNumber += ".";
        secondDecimalCount += 1;
        updateDisplay(".", operator);
    }
});

backspaceButton.addEventListener('click', () => {
    if (secondNumber === "" && operator === "") {
        firstNumber = firstNumber.slice(0, -1);

        if (firstNumber.includes(".") === false) {
            decimalCount = 0;
        }
        display.value = firstNumber || "0";  // Afficher "0" si firstNumber est vide
    } 
    else if (secondNumber === "") {
        operator = "";
        display.value = firstNumber; // Afficher juste firstNumber
    } 
    else {
        secondNumber = secondNumber.slice(0, -1);

        if (secondNumber.includes(".") === false) {
            secondDecimalCount = 0;
        }
        display.value = firstNumber + operator + secondNumber;
    }
});

clearButton.addEventListener('click', () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    decimalCount = 0;
    secondDecimalCount = 0;

    display.value = "0";
});

equalButton.addEventListener('click', () => {
    if (firstNumber === "" || secondNumber === "" || operator === "") {
        display.value = "Write your calcul entirely!!";

        setTimeout(() => {
            display.value = "0";
        }, 2000);

        firstNumber = "";
        secondNumber = "";
        operator = "";

        return;
    }

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

    if (typeof result === "string" && result.startsWith("Error")) {
        display.value = result;

        setTimeout(() => {
            display.value = "0";
        }, 2000);

        firstNumber = "";
        secondNumber = "";
        operator = "";
        return;
    }
    
    display.value = "0";
    firstNumber = result.toString();
    operator = "";
    updateDisplay(firstNumber, operator);
});