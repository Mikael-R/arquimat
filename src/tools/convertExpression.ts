/* eslint-disable arrow-body-style */
export const convertToMathExpression = (expression: string) => {
  return expression
    .split('**')
    .join('^')
    .split('*')
    .join('x')
    .split('/')
    .join('÷');
};

export const convertToJsExpression = (expression: string) => {
  return expression
    .split('^')
    .join('**')
    .split('x')
    .join('*')
    .split('÷')
    .join('/');
};

export const isValidMathExpression = (expression: string) => {
  return (
    expression
      .split(/[0-9]/)
      .join('')
      .split('^')
      .join('')
      .split('x')
      .join('')
      .split('÷')
      .join('')
      .split(')')
      .join('')
      .split('(')
      .join('').length === 0
  );
};
