const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const digits = document.querySelectorAll(".digit");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");

let currentInput = "";
let operatorUsed = false;
let equalsPressed = false;
let isError = false;

function updateDisplay(value) {
    display.style.color = "#fff";

    currentInput += value;
    display.textContent = currentInput;
}

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (isError) return;

        if (operatorUsed || currentInput === "") {
            operate();

            if (isError) return;
        }

        if (currentInput === "") {
            return;
        }

        if (equalsPressed) {
            currentInput = display.textContent;
            equalsPressed = false;
        }

        updateDisplay(operator.textContent);
        operatorUsed = true;
    });
});

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (isError) return;

        if (equalsPressed) {
            currentInput = "";
            display.textContent = "";
            operatorUsed = false;
            equalsPressed = false;
        }

        updateDisplay(digit.textContent);
    });
});

decimal.addEventListener("click", () => {
    if (isError) return;

    const parts = currentInput.split(/[+−×÷]/);
    const lastPart = parts[parts.length - 1];

    if (!lastPart.includes(".")) {
        updateDisplay(decimal.textContent);
    }
})

clear.addEventListener("click", () => {
    currentInput = "";
    display.textContent = currentInput;
    operatorUsed = false;
    equalsPressed = false;
    isError = false;
});

equal.addEventListener("click", () => {
    if (operatorUsed && !equalsPressed && !isError) {
        operate();
        equalsPressed = true;
    }
});

function operate() {
    const signs = "+−×÷";

    const numbers = currentInput.split(/[+−×÷]/).map(n => parseFloat(n));
    const sign = currentInput.split("")
    .filter((char) => signs.includes(char));

    const num1 = numbers[0];
    const num2 = numbers[1];
    const operatorSign = sign[0];
    let result = "";

    if (numbers.length < 2 || isNaN(num2)) {
        result = "Malformed expression";
        isError = true;
    } else if (operatorSign === "÷" && num2 === 0) {
        result = "Cannot divide by zero";
        isError = true;
    } else {
        switch (operatorSign) {
        case "+":
            result = num1 + num2;
            break;
        case "−":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "÷":
            result = num1 / num2;
            break;
        }

        result = Math.round(result * 100) / 100;
        equalsPressed = true;
    }

    display.textContent = result;

    if (!isError) {
        currentInput = result.toString();
    } else {
        display.style.color = "#d00";
    }

    operatorUsed = false;
}