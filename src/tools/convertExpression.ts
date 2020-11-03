/* eslint-disable arrow-body-style */
export const convertToMathExpression = (expression: string) => {
  return expression
    .toLowerCase()
    .split('**')
    .join('^')
    .split('*')
    .join('x')
    .split('/')
    .join('÷');
};

export const convertToJsExpression = (expression: string) => {
  return expression
    .toLowerCase()
    .split('^')
    .join('**')
    .split('x')
    .join('*')
    .split('÷')
    .join('/');
};
