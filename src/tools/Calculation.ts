/* eslint-disable */
interface IOperationBinary {
  (a: number, b: number): number;
}

class Calculation {
  private symbols: any;

  constructor() {
    this.symbols = {};
    this.defineOperator('!', this.factorial, 'postfix', 6);
    this.defineOperator('^', this.pow, 'infix', 5, true);
    this.defineOperator('*', this.multiplication, 'infix', 4);
    this.defineOperator('/', this.division, 'infix', 4);
    this.defineOperator('+', this.last, 'prefix', 3);
    this.defineOperator('-', this.negation, 'prefix', 3);
    this.defineOperator('+', this.addition, 'infix', 2);
    this.defineOperator('-', this.subtraction, 'infix', 2);
    this.defineOperator(',', Array.of, 'infix', 1);
    this.defineOperator('(', this.last, 'prefix');
    this.defineOperator(')', null, 'postfix');
    this.defineOperator('min', Math.min);
    this.defineOperator('sqrt', Math.sqrt);
  }

  defineOperator(
    symbol: string,
    f: Function | null,
    notation = 'func',
    precedence = 0,
    rightToLeft = false,
  ) {
    if (notation === 'func') precedence = 0;
    this.symbols[symbol] = {
      ...this.symbols[symbol],
      [notation]: {
        symbol,
        f,
        notation,
        precedence,
        rightToLeft,
        argCount: 1 + (notation === 'infix' ? 1 : 0),
      },
      symbol,
      regSymbol:
        symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') +
        (/\w$/.test(symbol) ? '\\b' : ''),
    };
  }

  last = (...a: number[]) => a[a.length - 1];

  negation = (a: number) => -a;

  pow: IOperationBinary = (a, b) => a ** b;

  addition: IOperationBinary = (a, b) => a + b;

  subtraction: IOperationBinary = (a, b) => a - b;

  multiplication: IOperationBinary = (a, b) => a * b;

  division: IOperationBinary = (a, b) => a / b;

  factorial = (a: number) => {
    if (a % 1 || !(+a >= 0)) return NaN;
    if (a > 170) return Infinity;
    let b = 1;
    while (a > 1) b *= a--;
    return b;
  };

  calculate(expression: string | number[]) {
    let match: any;
    const values: number[] = [];
    const operators = [this.symbols['('].prefix];
    const exec = () => {
      const op = operators.pop();
      values.push(op.f(...[].concat(...(values.splice(-op.argCount) as any))));
      return op.precedence;
    };
    const error = (msg: string) => {
      const notation = match ? match.index : expression.length;
      return `${msg}:\n${expression}\n${' '.repeat(notation)}^`;
    };
    const pattern = new RegExp(
      `\\d+(?:\\.\\d+)?|${Object.values(this.symbols)
        .sort((a: any, b: any) => b.symbol.length - a.symbol.length)
        .map((val: any) => val.regSymbol)
        .join('|')}|(\\S)`,
      'g',
    );
    let afterValue = false;
    pattern.lastIndex = 0;
    do {
      match = pattern.exec(expression as string);
      const [token, bad] = match || [')', undefined];
      const notNumber = this.symbols[token];
      const notNewValue = notNumber && !notNumber.prefix && !notNumber.func;
      const notAfterValue =
        !notNumber || (!notNumber.postfix && !notNumber.infix);
      if (bad || (afterValue ? notAfterValue : notNewValue))
        return error('Erro de sintaxe');
      if (afterValue) {
        const curr = notNumber.postfix || notNumber.infix;
        do {
          const prev = operators[operators.length - 1];
          if ((curr.precedence - prev.precedence || prev.rightToLeft) > 0)
            break;
        } while (exec());
        afterValue = curr.notation === 'postfix';
        if (curr.symbol !== ')') {
          operators.push(curr);
          if (afterValue) exec();
        }
      } else if (notNumber) {
        operators.push(notNumber.prefix || notNumber.func);
        if (notNumber.func) {
          match = pattern.exec(expression as string);
          if (!match || match[0] !== '(')
            return error('Função precisa de parênteses');
        }
      } else {
        values.push(+token);
        afterValue = true;
      }
    } while (match && operators.length);
    return operators.length
      ? error('Faltando parêntese de fechamento')
      : match
      ? error('Muitos parênteses de fechamento')
      : values.pop();
  }
}

export default Calculation;
