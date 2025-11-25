const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const digits = document.querySelectorAll(".digit");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        display.textContent += operator.textContent;
        
        operators.forEach((operator) => {
            operator.disabled = true;
        });
    });
});

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        display.textContent += digit.textContent;
    });
});

decimal.addEventListener("click", () => {
    display.textContent += decimal.textContent;
    decimal.disabled = true;
})

clear.addEventListener("click", () => {
    window.location.reload();
});

equal.addEventListener("click", () => {
    operate();

    digits.forEach((digit) => {
        digit.disabled = true;
    });

    decimal.disabled = true;
    equal.disabled = true;
});

function operate() {
    const operatorSigns = "+−×÷";

    const numbers = display.textContent.split(/[+−×÷]/);
    const operatorSign = display.textContent.split("")
    .filter((char) => operatorSigns.includes(char));

    const num1 = numbers[0];
    const num2 = numbers[1];
    const sign = operatorSign[0];
    let result = "";

    switch (sign) {
        case "+":
            result = +num1 + +num2;
            break;
        case "−":
            result = +num1 - +num2;
            break;
        case "×":
            result = +num1 * +num2;
            break;
        case "÷":
            result = +num1 / +num2;
            break;
    }

    display.textContent = result;
}