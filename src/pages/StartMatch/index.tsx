/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
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
  convertToMathExpression,
} from '../../tools/convertExpression';

const Calc = new Calculation();

type TDifficulty = 'fácil' | 'médio' | 'difícil' | 'impossível' | '';

function StartMatch(): ReactElement {
  const history = useHistory();

  const [preferences, setPreferences] = useState({
    totalPairs: '',
    flipTime: '',
    maxResult: '',
    highlightRevealedCards: false,
    difficulty: '' as TDifficulty,
    customExpressions: [] as string[],
  });

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
        customExpressions: [...preferences.customExpressions, ''],
      });
    }
  }

  function addNewCustomExpressionValue(position: number, value: string) {
    const customExpressionItems = preferences.customExpressions.map(
      (expression, index) => {
        const returnValue = index === position ? value : expression;
        return returnValue === '' ? '' : returnValue;
      },
    );

    setPreferences({
      ...preferences,
      customExpressions: customExpressionItems,
    });
  }

  function customExpressionsByTotalPairs(totalPairs: number) {
    const customExpressionItems = preferences.customExpressions.filter(
      (_, index) => index < totalPairs,
    );

    return customExpressionItems;
  }

  function verifyPreferences(): string | null {
    const customExpressionHTMLElements = document.getElementsByName(
      'custom-expression',
    );

    const customExpressionElements = {
      lessThanOne: [] as HTMLElement[],
      invalid: [] as HTMLElement[],
      infinity: [] as HTMLElement[],
    };

    customExpressionHTMLElements.forEach((element) => {
      const calculatedResult = Calc.calculate(
        convertToJsExpression((element as any).value),
      );

      if (Number(calculatedResult) < 1) {
        customExpressionElements.lessThanOne.push(element);
      }
      if (typeof calculatedResult === 'string') {
        customExpressionElements.invalid.push(element);
      }
      if (calculatedResult === Infinity) {
        customExpressionElements.infinity.push(element);
      }
    });

    switch (true) {
      case preferences.totalPairs === '':
        document.getElementById('total-pairs')?.focus();
        return 'Preencha todos os campos';

      case preferences.flipTime === '':
        document.getElementById('flip-time')?.focus();
        return 'Preencha todos os campos';

      case preferences.difficulty === '':
        document.getElementById('difficulty')?.focus();
        return 'Preencha todos os campos';

      case preferences.maxResult === '':
        document.getElementById('max-result')?.focus();
        return 'Preencha todos os campos';

      case !!customExpressionElements.invalid.length:
        customExpressionElements.invalid[0].focus();
        return Calc.calculate(
          (customExpressionElements.invalid[0] as any).value,
        ) as string;

      case !!customExpressionElements.infinity.length:
        customExpressionElements.infinity[0].focus();
        return 'Expressão customizada não pode conter divisão por 0.';

      case !!customExpressionElements.lessThanOne.length:
        customExpressionElements.lessThanOne[0].focus();
        return 'Expressão customizada tem resultado menor que 1.';

      default:
        return null;
    }
  }

  function setCameInLastMatch() {
    localStorage.setItem(
      'cameInLastMatchAsMilliseconds',
      String(new Date().getTime()),
    );
  }

  function setTotalMatches() {
    localStorage.setItem(
      'totalMatches',
      String(Number(localStorage.getItem('totalMatches') || 0) + 1),
    );
  }

  function setLastCustomExpression(expression: string) {
    localStorage.setItem('lastCustomExpression', expression);
  }

  function handleSubmit(event: FormEvent) {
    const errorMessage = verifyPreferences();

    if (errorMessage === null) {
      const lastCustomExpression =
        preferences.customExpressions[preferences.customExpressions.length - 1];

      toast.info(
        'Infelizmente os cards não estão prontos, por que não volta mais tarde?',
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
        <div onSubmit={handleSubmit}>
          <fieldset>
            <legend>Regras de jogo</legend>
            <Select
              name="total-pairs"
              label="Número de pares"
              options={[
                { value: '3', label: '3 pares' },
                { value: '4', label: '4 pares' },
                { value: '5', label: '5 pares' },
                { value: '6', label: '6 pares' },
                { value: '7', label: '7 pares' },
                { value: '8', label: '8 pares' },
              ]}
              value={preferences.totalPairs}
              onChange={({ target }) => {
                setPreferences({
                  ...preferences,
                  totalPairs: target.value,
                  customExpressions: customExpressionsByTotalPairs(
                    Number(target.value),
                  ),
                });
              }}
            />
            <Select
              name="flip-time"
              label="Tempo de visualização"
              options={[
                { value: '-1', label: 'Sem tempo' },
                { value: '4', label: '4 segundos' },
                { value: '5', label: '5 segundos' },
                { value: '6', label: '6 segundos' },
                { value: '7', label: '7 segundos' },
                { value: '8', label: '8 segundos' },
                { value: '9', label: '9 segundos' },
                { value: '10', label: '10 segundos' },
              ]}
              value={preferences.flipTime}
              onChange={({ target }) => {
                setPreferences({ ...preferences, flipTime: target.value });
              }}
            />
            <Select
              name="difficulty"
              label="Dificuldade"
              options={[
                { value: 'fácil', label: 'Burro' },
                { value: 'médio', label: 'Estudante' },
                { value: 'difícil', label: 'Inteligente' },
                { value: 'impossível', label: 'Super Dotado' },
              ]}
              value={preferences.difficulty}
              onChange={({ target }) => {
                setPreferences({
                  ...preferences,
                  difficulty: target.value as TDifficulty,
                });
              }}
            />
            <Input
              shouldBreakLineBetweenLabelAndInput
              name="max-result"
              type="number"
              min="1"
              max="99"
              label="Valor máximo de resultado"
              value={preferences.maxResult}
              onFocus={() => {
                if (preferences.maxResult === '') {
                  toast.info(
                    'O resultado das expressões customizadas não são afetadas por este resultado!',
                  );
                }
              }}
              onChange={({ target }) => {
                if (Number(target.value) > 99 || Number(target.value) < 1) {
                  toast.warn('Use números maiores que 0 e menores que 100!');
                } else {
                  setPreferences({ ...preferences, maxResult: target.value });
                }
              }}
            />
            <CheckBox
              name="highlight-revealed-cards"
              label="Destacar cards revelados"
              value={preferences.highlightRevealedCards === true ? 1 : 0}
              onChange={() => {
                setPreferences({
                  ...preferences,
                  highlightRevealedCards: !preferences.highlightRevealedCards,
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
                  shouldBreakLineBetweenLabelAndInput
                  name="custom-expression"
                  label={`Expressão ${Number(index) + 1}`}
                  value={expression}
                  onChange={({ target }) => {
                    addNewCustomExpressionValue(
                      index,
                      convertToMathExpression(target.value),
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
            <button type="submit" onClick={handleSubmit}>
              Iniciar Partida
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default StartMatch;
