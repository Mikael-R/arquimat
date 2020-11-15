import { TMathOperators } from '../types';
import randInt from './randInt';

interface IGenerateRandomExpression {
  (minResult: number, maxResult: number, operator: TMathOperators): {
    x: number;
    y: number;
    result: number;
    expression: string;
  };
}

const generateRandomExpression: IGenerateRandomExpression = (
  minResult,
  maxResult,
  operator
) => {
  const result = randInt(minResult, maxResult);
  let expression = '';
  let x = 0;
  let y = 0;

  if (operator === '+') {
    y = randInt(minResult, result);
    x = result - y;
  }
  if (operator === '-') {
    y = randInt(minResult, result);
    x = result + y;
  }
  if (operator === '•') {
    y = randInt(1, 10);
    x = result / y;
  }
  if (operator === '÷') {
    y = randInt(1, 10);
    x = result * y;
  }
  if (operator === '^') {
    y = randInt(1, 3);
    x = result ** (1 / y);
  }

  x = String(x).split('.').length > 1 ? Number(x.toFixed(2)) : x;
  y = String(y).split('.').length > 1 ? Number(y.toFixed(2)) : y;

  expression = `${x} ${operator} ${y}`;

  return { x, y, result, expression };
};

export default generateRandomExpression;
