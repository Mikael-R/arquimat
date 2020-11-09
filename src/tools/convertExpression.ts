export const convertToMathExpression = (expression: string) =>
  expression
    .toLowerCase()
    .split('**')
    .join('^')
    .split('*')
    .join('x')
    .split('/')
    .join('÷');

export const convertToJsExpression = (expression: string) =>
  expression
    .toLowerCase()
    .split('^')
    .join('**')
    .split('x')
    .join('*')
    .split('÷')
    .join('/');
