const calculator = {
    displayNumber: "0",
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
};

function updateDisplay() {
    document.querySelector("#display-number").innerText = calculator.displayNumber;
    console.log(calculator.displayNumber);
}

function clearCalculator() {
    calculator.displayNumber = "0";
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.displayNumber === "0") {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll(".button");

for (const button of buttons) {
    button.addEventListener("click", function(event) {
        // get object from element when on click
        const target = event.target;

        if (target.classList.contains("clear")) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains("negative")) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains("equals")) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains("operator")) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}

function inverseNumber() {
    if (calculator.displayNumber === "0") {
        return;
    }

    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // reset value display for the next button start from first number
        calculator.displayNumber = "0";
    } else {
        alert("Operator sudah ditetapkan");
    }
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan opearator");
        return;
    }

    let result = 0;
    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseFloat(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseFloat(calculator.displayNumber);
    }

    // object to be sent as argument function putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result,
    };

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}