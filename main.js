let firstNumber = '';
let secondNumber = '';
let operation = '';
let shouldResetScreen = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Clear the calculator screen
function clearScreen() {
    firstNumber = '';
    secondNumber = '';
    operation = '';
    display.value = '';
}

// Handle the calculation result
function calcResult() {
    if (firstNumber === '' || secondNumber === '' || operation === '') {
        return;
    }

    let result;
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '×':
            result = num1 * num2;
            break;
        case '÷':
            result = num1 / num2;
            break;
    }

    display.value = result;
    firstNumber = result;
    secondNumber = '';
    operation = '';
}

// Handle number input
function numberPressed(number) {
    if (shouldResetScreen) {
        clearScreen();
        shouldResetScreen = false;
    }

    if (operation === '') {
        firstNumber += number;
        display.value = firstNumber;
    } else {
        secondNumber += number;
        display.value = firstNumber + ' ' + operation + ' ' + secondNumber;
    }
}

// Handle operation input
function operationPressed(op) {
    if (firstNumber === '') return;

    if (secondNumber !== '') {
        calcResult();
    }

    operation = op;
    display.value = firstNumber + ' ' + operation; // Display operator after first number
    shouldResetScreen = false;
}

// Update display on button press
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9') {
            numberPressed(value);
        } else if (value === 'C') {
            clearScreen();
        } else if (value === '.') {
            if (!firstNumber.includes('.') || (operation !== '' && !secondNumber.includes('.'))) {
                numberPressed(value);
            }
        } else if (value === '=') {
            calcResult();
            shouldResetScreen = true;
        } else {
            operationPressed(value);
        }
    });
});
