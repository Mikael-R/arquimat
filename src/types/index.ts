export type TMathOperators = '+' | '-' | '•' | '÷' | '^';

export interface IPreferences {
  totalPairs: string;
  flipTime: string;
  minResult: string;
  maxResult: string;
  highlightRevealedCards: boolean;
  operators: (TMathOperators | string)[];
  customExpressions: string[];
}
