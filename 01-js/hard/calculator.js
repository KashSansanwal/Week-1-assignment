/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

class Calculator {
  constructor() {
      this.result = 0;
  }

  add(num) {
      this.result += num;
  }

  subtract(num) {
      this.result -= num;
  }

  multiply(num) {
      this.result *= num;
  }

  divide(num) {
      if (num === 0) {
          throw new Error("Division by zero is not allowed.");
      }
      this.result /= num;
  }

  clear() {
      this.result = 0;
  }

  getResult() {
      return this.result;
  }

  calculate(str) {
      this.clear();

      const tokenize = (expr) => {
          return expr.match(/(\d+\.\d+|\d+|\+|\-|\*|\/|\(|\))/g);
      };

      const evaluateTokens = (tokens) => {
          let stack = [];
          while (tokens.length) {
              let token = tokens.shift();
              switch (token) {
                  case '+':
                      stack.push(stack.pop() + evaluateTokens(tokens));
                      break;
                  case '-':
                      stack.push(stack.pop() - evaluateTokens(tokens));
                      break;
                  case '*':
                      stack.push(stack.pop() * evaluateTokens(tokens));
                      break;
                  case '/':
                      stack.push(stack.pop() / evaluateTokens(tokens));
                      break;
                  case '(':
                      stack.push(evaluateTokens(tokens));
                      break;
                  case ')':
                      return stack.pop();
                  default:
                      if (isNaN(token)) {
                          throw new Error("Invalid character in expression.");
                      }
                      stack.push(parseFloat(token));
                      break;
              }
          }
          return stack[0];
      };

      const tokens = tokenize(str);
      this.result = evaluateTokens(tokens);
      return this.result;
  }
}

// Test
let calc = new Calculator();
console.log(calc.calculate('10 +   2 *    (   6 - (4 + 1) / 2) + 7')); // Expected: 20

module.exports = Calculator;
