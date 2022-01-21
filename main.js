'use strict'
let displayValue = '0';
let firstNumber = null;
let waitingForsecondNumber = false;
let operator = null;
const keys = document.querySelector('#digits');
const display = document.querySelector('#display');

const calculate = (nr1, nr2, operator) => {
    if (operator == '+') {
        return nr1 + nr2;
    } else if (operator == '-') {
        return nr1 - nr2;
    } else if (operator == '*') {
        return nr1 * nr2;
    } else if (operator == '/')
        return nr1 / nr2;

}
function listenToKeys() {
    keys.addEventListener('click', (e) => {
        if (e.target.matches('.grid')) {
            let key = e.target;
            let action = key.dataset.action;
            let digit = key.dataset.value;
            console.log(action);

            if (!action) {
                console.log('eine Ziffer wurde geklickt')
                inputDigits(digit);
                updateDisplay();
            }

            if (
                action === '+' ||
                action === '-' ||
                action === '*' ||
                action === '/' ||
                action === '='
            ) {
                console.log('ein Rechenoperator wurde geklickt')
                handleOperator(action);
                updateDisplay();
            }

            if (action === '.') {
                console.log('der Dezimalpunkt wurde geklickt')
                inputDot(action);
                updateDisplay();
            }
            if (action === 'clear') {
                console.log('Die Taste AC wurde geklickt')
                resetAll();
                updateDisplay();
            }
        }

    })
}
listenToKeys();

function updateDisplay() {
    display.textContent = displayValue;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);
    if (operator && waitingForsecondNumber) {
        operator = nextOperator;
        return
    }
    if (firstNumber === null && !isNaN(inputValue)) {
        firstNumber = inputValue;
    } else if (operator) {
        const result = calculate(firstNumber, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstNumber = result;
    }
    waitingForsecondNumber = true;
    operator = nextOperator;
}

function inputDigits(digit) {
    if (waitingForsecondNumber === true) {
        displayValue = digit;
        waitingForsecondNumber = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDot(dot) {
 if(waitingForsecondNumber === true){
     displayValue = '0.';
     waitingForsecondNumber = false;
     return
 }
 if(!displayValue.includes(dot)){
     displayValue += dot;
 }
}

function resetAll() {
    operator = null;
    displayValue = "0";
    firstNumber = null;
    waitingForsecondNumber = false;
}

function init() {
    updateDisplay();
    listenToKeys();
    //listenToKeyboard(); = optional
}