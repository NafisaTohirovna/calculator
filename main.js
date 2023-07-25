let sound = document.querySelector("#click");
let btns = document.querySelectorAll(".button");

btns.forEach((e) => {
  e.addEventListener("click", () => {
    sound.play();
  });
});

function appendValue(value) {
  if (value === "%") {
    value = ".";
  }
  forms.answer.value += value;
  sound.play();
}

function calculate() {
  const expression = forms.answer.value;
  const operators = ["+", "-", "*", "/"];

  let result = "";
  let currentNumber = "";
  let lastOperator = null;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (operators.includes(char)) {
      if (lastOperator) {
        result = operate(result, currentNumber, lastOperator);
      } else {
        result = currentNumber;
      }
      lastOperator = char;
      currentNumber = "";
    } else {
      currentNumber += char;
    }
  }

  if (lastOperator) {
    result = operate(result, currentNumber, lastOperator);
  } else {
    result = currentNumber;
  }

  forms.answer.value = result;
  sound.play();
}

function clearAnswer() {
  forms.answer.value = "";
  sound.play();
}

function operate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (operator === "+") {
    return (num1 + num2).toString();
  } else if (operator === "-") {
    return (num1 - num2).toString();
  } else if (operator === "*") {
    return (num1 * num2).toString();
  } else if (operator === "/") {
    return (num1 / num2).toString();
  }

  return "";
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculate();
  } else if (e.key === ".") {
    appendValue(".");
  } else if (e.key === "*") {
    appendValue("*");
  } else if (e.key === "+") {
    appendValue("+");
  } else if (e.key === "-") {
    appendValue("-");
  } else if (/[0-9]/.test(e.key)) {
    appendValue(e.key);
  }
});
