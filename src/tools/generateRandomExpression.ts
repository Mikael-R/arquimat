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

const getMultiplesOf = (number: number): number[] => {
  const multiples: number[] = [];

  for (let count = 1; number >= count; count += 1) {
    if (number % count === 0) multiples.push(count);
  }

  return multiples;
};

const generateRandomExpression: IGenerateRandomExpression = (
  minResult,
  maxResult,
  operator
) => {
  const result = randInt(minResult, maxResult);
  const multiples = getMultiplesOf(result);
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
    y = multiples[randInt(0, multiples.length)];
    x = result / y;
  }
  if (operator === '÷') {
    y = multiples[randInt(0, multiples.length)];
    x = result * y;
  }
  if (operator === '^') {
    y = randInt(1, 3);
    x = result ** (1 / y);
  }

  x = String(x).split('.').length > 1 ? Number(x.toFixed(2)) : x;
  y = String(y).split('.').length > 1 ? Number(y.toFixed(2)) : y;

  const xStr = x < 0 ? `(${x})` : `${x}`;
  const yStr = y < 0 ? `(${y})` : `${y}`;

  expression = `${xStr} ${operator} ${yStr}`;

  return { x, y, result, expression };
};

export default generateRandomExpression;
