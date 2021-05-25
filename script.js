const btnClear = document.getElementById('clear');
const btnPlusMinus = document.getElementById('plus-minus');
const btnPercent = document.getElementById('percent');
const selectedNumber = document.querySelectorAll('.number');
const selectedOperator = document.querySelectorAll('.operator');

let displayedNum = "0"
let firstNum = ""
let secondNum = ""
let operation = ""


selectedNumber.forEach(function(item) {
    item.addEventListener('click', configureNumber);
});

 selectedOperator.forEach(function(item) {
     item.addEventListener('click', selectOperation);
 });


function configureNumber(e) {
    console.log(displayedNum);
    let selection = e.target.value; 
    if(operation == "=") {
        firstNum = ""
    }
    if(displayedNum === "0" && e.target.value != '.') {
        displayedNum = ""
    }
    if(displayedNum.length < 10) {
        if (displayedNum.includes('.') && selection == ".") {
        } else {
            let selection = e.target.value; 
            displayedNum += selection;
            updateDisplay(displayedNum);
        }

    }
    console.log(displayedNum)
}

function selectOperation(e) {
    console.log('first numb = ' + firstNum);
    console.log(firstNum.toString().length);
    if(e.target.value == "=") {
        secondNum = displayedNum;
        console.log(firstNum + " " + operation +" " + secondNum)
        resolveOperation(firstNum, secondNum, operation);
        operation = e.target.value
    } else {
        if(firstNum.toString().length <= 0) {
            firstNum = displayedNum;
            displayedNum = "0";
            console.log('first' + firstNum)
            operation = e.target.value;  
        } else {
            if(operation == "=") {
                operation = e.target.value;
            } else {
                console.log("second = " + secondNum)
                secondNum = displayedNum;
                console.log("before op" + firstNum + " " + operation +" " + secondNum)
                resolveOperation(firstNum, secondNum, operation);
                operation = e.target.value;
                console.log("after op" + firstNum + " " + operation +" " + secondNum)
            }
            
        }
    }
} 

function resolveOperation(a, b, op) {
    let operations = {
        '/': (a,b) => (a/b),
        '*': (a,b) => (a*b),
        '+': (a,b) => (a+b),
        '-': (a,b) => (a-b)
    }
    if(b == 0 && op == '/') {
        displayedNum = "REEEEEEE";
    } else {
        let result = operations[op](parseFloat(a), parseFloat(b));
        firstNum = result;
        if(result.toString().length > 10) {
            result = result.toExponential();
            console.log(result);
            let firstHalf = result.slice(0, 6);
            let secondHalf =  result.slice(result.indexOf("e"), result.toString().length);
            result = firstHalf + secondHalf;
            console.log(result);
        }
        displayedNum = result
        secondNum = ""
    }
    updateDisplay(displayedNum);
    displayedNum = "0"
}

function clear() {
    displayedNum = "0"
    firstNum = ""
    secondNum = ""
    operation = ""
    updateDisplay(displayedNum);
    console.log(displayedNum);
}

function plusMinus() {
    displayedNum *= -1;
    updateDisplay(displayedNum);
    return displayedNum;
}

function convertToPercent() {
    displayedNum /= 100;
    updateDisplay(displayedNum);
    return displayedNum
}

function updateDisplay(displayedNum) {
    let display = document.getElementById('display');
    display.textContent = displayedNum;
    displayedNum = '0'
    if(displayedNum == "8008135" || displayedNum == "8008" || displayedNum == "80085") {
        display.style.filter = "blur(5px)"
    } else {
        display.style.filter = "blur(0px)"
    }
    
}

btnClear.addEventListener('click', clear);
btnPlusMinus.addEventListener('click', plusMinus);
btnPercent.addEventListener('click', convertToPercent);

