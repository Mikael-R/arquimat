const validChars = ['(', ')', '^', '**', '*', '•', '÷', '/', '+', '-'];

export const convertToMathExpression = (expression: string) =>
  expression
    .split('')
    .filter(char => validChars.includes(char) || char.match(/[0-9]/))
    .join('')
    .split('**')
    .join('^')
    .split('*')
    .join('•')
    .split('/')
    .join('÷');

export const convertToJsExpression = (expression: string) =>
  expression
    .split('')
    .filter(char => validChars.includes(char) || char.match(/[0-9]/))
    .join('')
    .split('^')
    .join('**')
    .split('•')
    .join('*')
    .split('÷')
    .join('/');
