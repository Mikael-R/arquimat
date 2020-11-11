import React, { ReactElement, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import warningIcon from '../../assets/icons/warning.svg';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import './styles.css';
import Calculation from '../../tools/Calculation';
import {
  convertToJsExpression,
  convertToMathExpression
} from '../../tools/convertExpression';

const Calc = new Calculation();

type TMathOperators = '+' | '-' | '•' | '÷' | '^';
interface IPreferences {
  totalPairs: string;
  flipTime: string;
  result: { min: string; max: string };
  highlightRevealedCards: boolean;
  operators: TMathOperators[];
  customExpressions: string[];
}

function StartMatch(): ReactElement {
  const history = useHistory();

  const lastPreferences: IPreferences | null = (() => {
    const data = sessionStorage.getItem('lastPreferences');
    return data ? JSON.parse(data) : null;
  })();

  const [preferences, setPreferences] = useState<IPreferences>(
    lastPreferences || {
      totalPairs: '',
      flipTime: '',
      result: { min: '', max: '' },
      highlightRevealedCards: false,
      operators: [],
      customExpressions: []
    }
  );

  function addNewCustomExpression() {
    if (preferences.totalPairs === '') {
      toast.error('Selecione o número de pares!');
      document.getElementById('total-pairs')?.focus();
    } else if (
      preferences.customExpressions.length >= Number(preferences.totalPairs)
    ) {
      toast.error('O número de pares foi atingido!');
      document.getElementById('total-pairs')?.focus();
    } else if (
      preferences.customExpressions[
        preferences.customExpressions.length - 1
      ] === ''
    ) {
      const customExpressions = document.getElementsByName('custom-expression');
      customExpressions[customExpressions.length - 1].focus();
      toast.error('Preencha o campo anterior!');
    } else {
      setPreferences({
        ...preferences,
        customExpressions: [...preferences.customExpressions, '']
      });
    }
  }

  function addNewCustomExpressionValue(position: number, value: string) {
    const customExpressionItems = preferences.customExpressions.map(
      (expression, index) => {
        const returnValue = index === position ? value : expression;
        return returnValue === '' ? '' : returnValue;
      }
    );

    setPreferences({
      ...preferences,
      customExpressions: customExpressionItems
    });
  }

  function customExpressionsByTotalPairs(totalPairs: number) {
    const customExpressionItems = preferences.customExpressions.filter(
      (_, index) => index < totalPairs
    );

    return customExpressionItems;
  }

  function verifyPreferences(): string | null {
    const customExpressionHTMLElements: HTMLElement[] = Array.prototype.slice.call(
      document.getElementsByName('custom-expression')
    );

    const customExpressionElementInvalid = customExpressionHTMLElements.find(
      ({ value }: any) =>
        typeof Calc.calculate(convertToJsExpression(value)) === 'string'
    );

    const customExpressionElementInfinity = customExpressionHTMLElements.find(
      ({ value }: any) =>
        Calc.calculate(convertToJsExpression(value)) === Infinity
    );

    switch (true) {
      case !!customExpressionElementInvalid:
        customExpressionElementInvalid?.focus();
        return Calc.calculate(
          convertToJsExpression((customExpressionElementInvalid as any).value)
        ) as string;

      case !!customExpressionElementInfinity:
        customExpressionElementInfinity?.focus();
        return 'Expressão customizada não pode conter divisão por 0.';

      default:
        return null;
    }
  }

  function setCameInLastMatch() {
    localStorage.setItem(
      'cameInLastMatchAsMilliseconds',
      String(new Date().getTime())
    );
  }

  function setTotalMatches() {
    localStorage.setItem(
      'totalMatches',
      String(Number(localStorage.getItem('totalMatches') || 0) + 1)
    );
  }

  function setLastCustomExpression(expression: string) {
    localStorage.setItem('lastCustomExpression', expression);
  }

  function handleSubmit(event: FormEvent) {
    const errorMessage = verifyPreferences();

    if (errorMessage === null) {
      sessionStorage.setItem(
        'lastPreferences',
        JSON.stringify({ ...preferences, customExpressions: [] })
      );

      const lastCustomExpression =
        preferences.customExpressions[preferences.customExpressions.length - 1];

      toast.info(
        'Infelizmente os cards não estão prontos, por que não volta mais tarde?'
      );

      setCameInLastMatch();
      setTotalMatches();
      lastCustomExpression && setLastCustomExpression(lastCustomExpression);

      history.push('/');
    } else {
      toast.error(errorMessage, { bodyStyle: { whiteSpace: 'pre-line' } });
      event.preventDefault();
    }
  }

  return (
    <div className="container" id="start-match-form">
      <PageHeader
        title="Que bom que você quer jogar."
        description="Primeiramente, preencha este formulário com as suas preferências e divirta-se no seu estilo."
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Regras de jogo</legend>
            <Select
              required
              label="Número de pares"
              options={[
                { value: '3', label: '3 pares' },
                { value: '4', label: '4 pares' },
                { value: '5', label: '5 pares' },
                { value: '6', label: '6 pares' },
                { value: '7', label: '7 pares' },
                { value: '8', label: '8 pares' }
              ]}
              values={[preferences.totalPairs]}
              onChange={values => {
                setPreferences({
                  ...preferences,
                  totalPairs: values[0],
                  customExpressions: customExpressionsByTotalPairs(
                    Number(values[0])
                  )
                });
              }}
            />
            <Select
              required
              label="Tempo de visualização"
              options={[
                { value: '-1', label: 'Sem tempo' },
                { value: '4', label: '4 segundos' },
                { value: '5', label: '5 segundos' },
                { value: '6', label: '6 segundos' },
                { value: '7', label: '7 segundos' },
                { value: '8', label: '8 segundos' },
                { value: '9', label: '9 segundos' },
                { value: '10', label: '10 segundos' }
              ]}
              values={[preferences.flipTime]}
              onChange={values => {
                setPreferences({ ...preferences, flipTime: values[0] });
              }}
            />
            <CheckBox
              label="Destacar cards revelados"
              value={preferences.highlightRevealedCards === true ? 1 : 0}
              onChange={() => {
                setPreferences({
                  ...preferences,
                  highlightRevealedCards: !preferences.highlightRevealedCards
                });
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Geração dos cálculos</legend>
            <Select
              required
              multi
              label="Escolha os operadores"
              options={[
                { value: '+', label: '(+) adição' },
                { value: '-', label: '(-) subtração' },
                { value: '•', label: '(•) multiplicação' },
                { value: '÷', label: '(÷) divisão' },
                { value: '^', label: '(^) exponenciação' }
              ]}
              values={preferences.operators}
              onChange={values => {
                setPreferences({
                  ...preferences,
                  operators: values
                });
              }}
            />
            <Input
              required
              type="number"
              min="-999"
              max="999"
              label="Valor mínimo de resultado"
              value={preferences.result.min}
              onFocus={() => {
                if (preferences.result.min === '') {
                  toast.info(
                    'O resultado das expressões customizadas não são afetadas!'
                  );
                  toast.info('Use números com até 3 dígitos!');
                }
              }}
              onChange={({ target }) => {
                setPreferences({
                  ...preferences,
                  result: { ...preferences.result, min: target.value }
                });
              }}
            />
            <Input
              required
              type="number"
              min="-999"
              max="999"
              label="Valor máximo de resultado"
              value={preferences.result.max}
              onFocus={() => {
                if (preferences.result.max === '') {
                  toast.info(
                    'O resultado das expressões customizadas não são afetadas!'
                  );
                  toast.info('Use números com até 3 dígitos!');
                }
              }}
              onChange={({ target }) => {
                setPreferences({
                  ...preferences,
                  result: { ...preferences.result, max: target.value }
                });
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Expressões customizadas
              <button onClick={addNewCustomExpression} type="button">
                + Expressão
              </button>
            </legend>
            {preferences.customExpressions.map((expression, index) => (
              <div key={Number(index)} className="expression-item">
                <Input
                  name="custom-expression"
                  label={`Expressão ${Number(index) + 1}`}
                  value={expression}
                  onChange={({ target }) => {
                    addNewCustomExpressionValue(
                      index,
                      convertToMathExpression(target.value)
                    );
                  }}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados.
            </p>
            <button type="submit">Iniciar Partida</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default StartMatch;
