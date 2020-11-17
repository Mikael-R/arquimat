import { TMathOperators } from '../types';
import Calculation from './Calculation';
import generateRandomExpression from './generateRandomExpression';

interface IGetCardsContent {
  ({
    minResult,
    maxResult,
    totalPairs,
    operators,
    customExpressions,
    sortArray,
    customReturn
  }: {
    minResult: string | number;
    maxResult: string | number;
    totalPairs: string | number;
    operators: TMathOperators[];
    customExpressions?: string[];
    sortArray?: boolean;
    customReturn?: (value: string, index: number, array: string[]) => any;
  }): string[];
}

const Calc = new Calculation();

const getCardsContent: IGetCardsContent = ({
  minResult,
  maxResult,
  totalPairs,
  operators,
  customExpressions,
  sortArray,
  customReturn
}) => {
  let contents: string[] = [];

  customExpressions?.forEach(expression => {
    contents.push(expression, String(Calc.calculate(expression)));
  });

  for (
    let count = 0;
    contents.length < Number(totalPairs) * 2;
    count += count === operators.length - 1 ? 0 : 1
  ) {
    const { expression, result } = generateRandomExpression(
      Number(minResult),
      Number(maxResult),
      operators[count]
    );

    contents.push(expression, String(result));
  }

  if (customReturn) contents = contents.map(customReturn);

  if (sortArray) contents = contents.sort(() => 0.5 - Math.random());

  return contents;
};

export default getCardsContent;
