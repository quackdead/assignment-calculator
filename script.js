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
    if (b == 0) return NaN;
    return a / b;
}
let op1, op2, operator;
function operate(operator_, op1_, op2_) {
    switch (operator_) {
        case "+":
            return add(op1_, op2_);
            break;
        case "-":
            return subtract(op1_, op2_);
            break;
        case "x":
            return multiply(op1_, op2_);
            break;
        case "/":
            return divide(op1_, op2_);
            break;
    }
}
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
let display_content = "";
let deciml = 1, oper = 1, calculation = 0;

document.addEventListener("keydown", function(event) {
    if (event.key == "Backspace") {
        display.textContent = display.textContent.slice(0, -1);
        
    }
    else if (deciml && event.key != "Enter") {
        if (calculation && event.key != "+" && event.key != "-" && event.key != "x" && event.key != "/") {
            display.textContent = "";
        }
        display_content = event.key;
        display.textContent += display_content;
        if (event.key == ".") deciml = 0;
        if (oper && (event.key == "+" || event.key == "-" || event.key == "x" || event.key == "/")) oper = 0;
        else if (!oper && (event.key == "+" || event.key == "-" || event.key == "x" || event.key == "/")) {
            display.textContent = display.textContent.slice(0, -2);
            display.textContent += event.key;
        }
        else oper = 1;
        calculation = 0;
    }
    else if (!deciml && event.key != "Enter") {
        if (calculation && event.key != "+" && event.key != "-" && event.key != "x" && event.key != "/") {
            display.textContent = "";
        }
        if (event.key != ".") {
            display_content = event.key;
            display.textContent += display_content;
            if (oper && (event.key == "+" || event.key == "-" || event.key == "x" || event.key == "/")) oper = 0;
            else if (!oper && (event.key == "+" || event.key == "-" || event.key == "x" || event.key == "/")) {
            display.textContent = display.textContent.slice(0, -2);
            display.textContent += event.key;
            }
            else oper = 1;
        }
        if (event.key == "+" || event.key == "-" || event.key == "x" || event.key == "/") {
            deciml = 1;
        }
        calculation = 0;
    }
    if (event.key === "C" || event.key === "c") {
        display_content = "";
        display.textContent = "";
        output = undefined;
    }
    if (display.textContent.split(/[+\-x/=]/).length != 1 && event.key === "Enter") {
        let output;
        console.log("display content", display.textContent.split(/[+\-x/=]/))
        let numbers = display.textContent.split(/[+\-x/=]/)
        let i = 0;
        for (num of numbers) {
            console.log("Before condition:", output);
            if (num == "") continue;
            else if (op1 != undefined && output === undefined) {
                op2 = parseFloat(num)
                operator = display.textContent.match(/[+\-x/]/g)[i++];
                output = parseFloat(operate(operator, op1, op2))
                console.log("output", output, "op1", op1, "op2", op2, "if")
            }
            else if (output !== undefined) {
                op1 = parseFloat(num)
                operator = display.textContent.match(/[+\-x/]/g)[i++];
                output = parseFloat(operate(operator, output, op1))
                console.log("output", output, "op1", op1, "else")
            }
            op1 = parseFloat(num)
            console.log("output", output, "op1", op1, "outside")
        }
        op1 = undefined;
        op2 = undefined;
        operator = undefined;
        if (Number.isInteger(output)) {
            display.textContent = output;
        }
        else {
            display.textContent = output.toString().slice(0, 13);
        }
        calculation = 1;
        console.log(typeof(output))
    }
})
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent == "⌫") {
            display.textContent = display.textContent.slice(0, -1);
            
        }
        else if (deciml && button.textContent != "=") {
            if (calculation && button.textContent != "+" && button.textContent != "-" && button.textContent != "x" && button.textContent != "/") {
                display.textContent = "";
            }
            display_content = button.textContent;
            display.textContent += display_content;
            if (button.textContent == ".") deciml = 0;
            if (oper && (button.textContent == "+" || button.textContent == "-" || button.textContent == "x" || button.textContent == "/")) oper = 0;
            else if (!oper && (button.textContent == "+" || button.textContent == "-" || button.textContent == "x" || button.textContent == "/")) {
                display.textContent = display.textContent.slice(0, -2);
                display.textContent += button.textContent;
            }
            else oper = 1;
            calculation = 0;
        }
        else if (!deciml && button.textContent != "=") {
            if (calculation && button.textContent != "+" && button.textContent != "-" && button.textContent != "x" && button.textContent != "/") {
                display.textContent = "";
            }
            if (button.textContent != ".") {
                display_content = button.textContent;
                display.textContent += display_content;
                if (oper && (button.textContent == "+" || button.textContent == "-" || button.textContent == "x" || button.textContent == "/")) oper = 0;
                else if (!oper && (button.textContent == "+" || button.textContent == "-" || button.textContent == "x" || button.textContent == "/")) {
                display.textContent = display.textContent.slice(0, -2);
                display.textContent += button.textContent;
                }
                else oper = 1;
            }
            if (button.textContent == "+" || button.textContent == "-" || button.textContent == "x" || button.textContent == "/") {
                deciml = 1;
            }
            calculation = 0;
        }
        if (button.textContent === "C") {
            display_content = "";
            display.textContent = "";
            output = undefined;
        }
        if (display.textContent.split(/[+\-x/=]/).length != 1 && button.textContent === "=") {
            let output;
            console.log("display content", display.textContent.split(/[+\-x/=]/))
            let numbers = display.textContent.split(/[+\-x/=]/)
            let i = 0;
            for (num of numbers) {
                console.log("Before condition:", output);
                if (num == "") continue;
                else if (op1 != undefined && output === undefined) {
                    op2 = parseFloat(num)
                    operator = display.textContent.match(/[+\-x/]/g)[i++];
                    output = parseFloat(operate(operator, op1, op2))
                    console.log("output", output, "op1", op1, "op2", op2, "if")
                }
                else if (output !== undefined) {
                    op1 = parseFloat(num)
                    operator = display.textContent.match(/[+\-x/]/g)[i++];
                    output = parseFloat(operate(operator, output, op1))
                    console.log("output", output, "op1", op1, "else")
                }
                op1 = parseFloat(num)
                console.log("output", output, "op1", op1, "outside")
            }
            op1 = undefined;
            op2 = undefined;
            operator = undefined;
            if (Number.isInteger(output)) {
                display.textContent = output;
            }
            else {
                display.textContent = output.toString().slice(0, 13);
            }
            calculation = 1;
            console.log(typeof(output))
        }
    })
})