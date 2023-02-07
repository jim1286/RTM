/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ["+", "-", "*", "/", "="];

const initalState = {
  total: 0,
  sign: "",
  currentNum: 0,
  check: false,
};

const calculate = (x, y, sign) => {
  let cal;
  sign === "+"
    ? (cal = x + y)
    : sign === "-"
    ? (cal = x - y)
    : sign === "*"
    ? (cal = x * y)
    : (cal = x / y);
  return cal;
};

function render({ total, sign, currentNum, check }) {
  console.log(total, sign, currentNum, check);

  const handleClickNumber = (num) => {
    !sign
      ? render({
          total: total * 10 + num,
          sign,
          currentNum: currentNum * 10 + num,
          check,
        })
      : render({
          total,
          sign,
          currentNum: currentNum * 10 + num,
          check: false,
        });
  };

  const handleClickOperator = (oper) => {
    if (sign)
      render({
        total: calculate(total, currentNum, sign),
        sign: oper,
        currentNum: 0,
        check: true,
      });
    else render({ total, sign: oper, currentNum: 0, check });
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{check ? total : currentNum}</p>
      <div>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </div>
      <div>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </div>
    </div>
  );

  document.getElementById("app").textContent = "";
  document.getElementById("app").appendChild(element);
}

render(initalState);
